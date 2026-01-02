import { useState } from "react";
import { login } from "../api/auth";

export default function Login() {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(empId, password);

      if (res.forcePasswordChange) {
        window.location.href = "/force-password-change";
      } else {
        alert("Login successful");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Employee ID"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        First time here? <a href="/signup">Enroll / Signup</a>
      </p>
    </form>
  );
}
