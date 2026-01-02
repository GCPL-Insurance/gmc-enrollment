import { useState } from "react";
import { login } from "../api/auth";

export default function Login() {
  const [empId, setEmpId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // 🔴 REQUIRED

    setError("");

    try {
      await login(String(empId), String(dob));
      alert("Login success");
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
      />

      <input
        type="text"
        placeholder="DOB (DDMMYYYY)"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
