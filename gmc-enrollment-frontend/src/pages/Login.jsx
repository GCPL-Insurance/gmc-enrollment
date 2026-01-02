import { login } from "../api/auth";

function Login() {
  const [empId, setEmpId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // 🚨 REQUIRED

    try {
      setError("");
      await login(empId, dob);
      alert("Login success");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
        placeholder="Employee ID"
      />
      <input
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        placeholder="DDMMYYYY"
      />
      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
