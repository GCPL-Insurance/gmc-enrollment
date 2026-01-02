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
    const text = await res.text();
    throw new Error(text || "Login failed");
  }

  return res.json();
}
