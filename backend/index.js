require("dotenv").config();
const express = require("express");
const cors = require("cors");
const peopleRoutes = require("./routes/people");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/people", peopleRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
