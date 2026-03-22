const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// GET /api/people — list all
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

// GET /api/people/:id — get one
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM people WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "PERSON_NOT_FOUND" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

// POST /api/people — create
router.post("/", async (req, res) => {
  try {
    const { full_name, email } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL" });
    }

    const result = await pool.query(
      "INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *",
      [full_name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "EMAIL_ALREADY_EXISTS" });
    }
    console.error(err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

// PUT /api/people/:id — update
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "INVALID_EMAIL" });
    }

    const existing = await pool.query("SELECT * FROM people WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "PERSON_NOT_FOUND" });
    }

    const result = await pool.query(
      "UPDATE people SET full_name = $1, email = $2 WHERE id = $3 RETURNING *",
      [full_name, email, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "EMAIL_ALREADY_EXISTS" });
    }
    console.error(err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

// DELETE /api/people/:id — delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM people WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "PERSON_NOT_FOUND" });
    }

    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
});

module.exports = router;
