import { useState } from "react";
import { createPerson } from "../services/api";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await createPerson({ full_name: fullName.trim(), email: email.trim() });
      setMessage("Person registered successfully!");
      setFullName("");
      setEmail("");
    } catch (err) {
      if (err.error === "EMAIL_ALREADY_EXISTS") {
        setError("This email is already registered.");
      } else if (err.error === "INVALID_EMAIL") {
        setError("Backend rejected the email format.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className="card">
      <h2 className="page-title">Register a Person</h2>

      {message && <div className="msg msg-success">{message}</div>}
      {error && <div className="msg msg-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
