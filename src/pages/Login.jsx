import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, token })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Login successful!");
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Open Sans, Arial, Helvetica, sans-serif" }}>
  <div style={{ background: "#222", border: "2px solid #03fc62", borderRadius: "16px", boxShadow: "0 2px 12px rgba(3,252,98,0.18)", padding: "2.5rem 2rem", width: "370px", color: "#fff", textAlign: "center", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "2rem", width: "100%" }}>Sign In</h2>
        <div style={{ width: "92%", display: "flex", flexDirection: "column", gap: "1.1rem", margin: "0 auto" }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: "0.95rem", borderRadius: "10px", border: "1.5px solid #03fc62", fontSize: "1.08rem", background: "#181818", color: "#fff", marginLeft: "auto", marginRight: "auto" }} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding: "0.95rem", borderRadius: "10px", border: "1.5px solid #03fc62", fontSize: "1.08rem", background: "#181818", color: "#fff", marginLeft: "auto", marginRight: "auto" }} />
          <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="2FA Code" style={{ width: "100%", padding: "0.95rem", borderRadius: "10px", border: "1.5px solid #03fc62", fontSize: "1.08rem", background: "#181818", color: "#fff", marginLeft: "auto", marginRight: "auto" }} />
        </div>
  <button style={{ background: "#03fc62", color: "#222", border: "none", borderRadius: "8px", padding: "0.85rem 1.2rem", fontWeight: "bold", fontSize: "1.08rem", cursor: "pointer", width: "92%", marginTop: "2rem" }} onClick={handleLogin} disabled={!email || !password || !token || loading}>{loading ? "Logging in..." : "Sign In"}</button>
  <button style={{ marginTop: "1.1rem", background: "none", color: "#03fc62", border: "1px solid #03fc62", borderRadius: "8px", padding: "0.6rem 1.2rem", fontWeight: "bold", fontSize: "1.08rem", cursor: "pointer", width: "92%" }} onClick={() => window.location.href = "/forgot-password"}>Forgot Password?</button>
        {error && (
          <div style={{
            position: "absolute",
            top: "-2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ff4d4f",
            color: "#fff",
            padding: "0.7rem 1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            zIndex: 10,
            fontWeight: "bold"
          }}>
            {error}
          </div>
        )}
        {success && <div style={{ color: "#03fc62", marginTop: "1rem" }}>{success}</div>}
      </div>
    </div>
  );
}
