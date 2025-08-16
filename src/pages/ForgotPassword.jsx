import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify2FA = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("2FA verified! You may now reset your password.");
      } else {
        setError(data.error || "Invalid 2FA code.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Open Sans, Arial, Helvetica, sans-serif" }}>
      <div style={{ background: "#222", border: "2px solid #03fc62", borderRadius: "16px", boxShadow: "0 2px 12px rgba(3,252,98,0.18)", padding: "2.5rem 2rem", width: "370px", color: "#fff", textAlign: "center" }}>
        <h2 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "1.5rem" }}>Forgot Password</h2>
        <p style={{ marginBottom: "1.2rem" }}>Enter your email and the code from your authenticator app.</p>
  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1.5px solid #03fc62", marginBottom: "1.5rem", fontSize: "1.08rem" }} />
  <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="2FA Code" style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1.5px solid #03fc62", marginBottom: "1.5rem", fontSize: "1.08rem" }} />
        <button style={{ background: "#03fc62", color: "#222", border: "none", borderRadius: "8px", padding: "0.7rem 1.2rem", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", width: "100%" }} onClick={handleVerify2FA} disabled={!email || !token || loading}>{loading ? "Verifying..." : "Verify 2FA & Reset Password"}</button>
        {error && <div style={{ color: "#ff4d4f", marginTop: "1rem" }}>{error}</div>}
        {success && <div style={{ color: "#03fc62", marginTop: "1rem" }}>{success}</div>}
      </div>
    </div>
  );
