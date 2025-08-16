import React, { useState } from "react";
import QRCode from "qrcode.react";
import speakeasy from "speakeasy";

export default function Setup2FA({ email, onComplete }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const qrUri = `otpauth://totp/ArcadeonSolutions:${email}?secret=${secret}&issuer=ArcadeonSolutions`;

  const handleVerify = e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Verify token using speakeasy
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token
    });
    if (verified) {
      setSuccess("2FA setup complete!");
      if (onComplete) onComplete();
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", color: "#fff", padding: "2rem" }}>
      <h2 style={{ color: "#03fc62", marginBottom: "1.2rem" }}>Connect Your Account to a 2FA Mobile App</h2>
      <p>Scan the QR code below with your authenticator app (Google Authenticator, Authy, etc.), then enter the 6-digit code to verify.</p>
      <div style={{ margin: "2rem auto" }}>
        <QRCode value={qrUri} size={180} bgColor="#181818" fgColor="#03fc62" />
      </div>
      <form onSubmit={handleVerify} style={{ marginTop: "2rem" }}>
        <input
          type="text"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Enter 2FA Code"
          style={{ padding: "0.8rem", borderRadius: 8, border: "1px solid #03fc62", fontSize: "1.1rem", width: 180, marginBottom: 12, background: "#222", color: "#fff" }}
        />
        <br />
        <button type="submit" style={{ background: "#03fc62", color: "#222", border: "none", borderRadius: 8, padding: "0.8rem 1.5rem", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer" }}>
          Verify & Complete Setup
        </button>
      </form>
      {error && <div style={{ color: "#ff4d4f", marginTop: 16 }}>{error}</div>}
      {success && <div style={{ color: "#03fc62", marginTop: 16 }}>{success}</div>}
    </div>
  );
}
