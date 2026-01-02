const API_BASE = "https://gmc-insurance-system.onrender.com";

export async function login(emp_id, dob) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emp_id: String(emp_id),
      dob: String(dob)
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json(); // backend may return token or empty
}
