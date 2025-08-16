import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/setup-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.qr && data.secret) {
        setQr(data.qr);
        setSecret(data.secret);
        setStep(2);
      } else {
        setError("Failed to set up 2FA.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Open Sans, Arial, Helvetica, sans-serif" }}>
      <div style={{ background: "#222", border: "2px solid #03fc62", borderRadius: "16px", boxShadow: "0 2px 12px rgba(3,252,98,0.18)", padding: "2.5rem 2rem", width: "340px", color: "#fff", textAlign: "center" }}>
        {step === 1 ? (
          <>
            <h2 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "1.5rem" }}>Sign Up</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid #03fc62", marginBottom: "1.2rem", fontSize: "1rem" }} />
            <button style={{ background: "#03fc62", color: "#222", border: "none", borderRadius: "8px", padding: "0.7rem 1.2rem", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", width: "100%" }} onClick={handleSignup} disabled={!email}>Sign Up & Set Up 2FA</button>
            {error && <div style={{ color: "#ff4d4f", marginTop: "1rem" }}>{error}</div>}
          </>
        ) : (
          <>
            <h2 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "1.5rem" }}>Set Up 2FA</h2>
            <p>Scan this QR code with your authenticator app:</p>
            <img src={qr} alt="2FA QR" style={{ margin: "1rem auto", width: "180px", height: "180px" }} />
            <p style={{ fontSize: "0.95rem", marginTop: "1rem" }}>Or enter this secret manually: <span style={{ color: "#03fc62" }}>{secret}</span></p>
            <p style={{ marginTop: "1.5rem", color: "#03fc62" }}>2FA setup complete! You can now use your authenticator app for login and password reset.</p>
          </>
        )}
      </div>
    </div>
  );
}
