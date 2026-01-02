import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const [empId, setEmpId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(String(empId), String(dob));

      /**
       * BACKEND CONTRACT
       * ----------------
       * First-time login:
       * { requirePasswordChange: true }
       *
       * Normal login:
       * { token: "...", role: "employee" }
       */

      if (response?.requirePasswordChange) {
        navigate("/force-password-change");
        return;
      }

      if (response?.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard"); // create later
        return;
      }

      setError("Invalid login response");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Employee Login</h2>

      <input
        type="text"
        placeholder="Employee ID"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="DOB (DDMMYYYY)"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        First time here?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Enroll / Signup
        </span>
      </p>
    </form>
  );
}
