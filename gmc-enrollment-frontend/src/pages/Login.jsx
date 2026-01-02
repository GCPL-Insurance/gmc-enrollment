import { useState } from "react";
import { apiFetch } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [empId, setEmpId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          emp_id: empId,
          dob
        })
      });

      localStorage.setItem("token", res.token);

      if (res.forcePasswordChange) {
        navigate("/force-password-change");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <>
      <h1>Employee Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="Emp ID" onChange={e => setEmpId(e.target.value)} />
        <input placeholder="DOB (DDMMYYYY)" onChange={e => setDob(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}