import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import speakeasy from "speakeasy";

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
    // Login with Supabase Auth
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      setError(error.message || "Login failed.");
      setLoading(false);
      return;
    }
    // Fetch user's 2FA secret from Supabase
    const { data: twofa, error: twofaError } = await supabase
      .from('user_2fa')
      .select('secret')
      .eq('user_id', data.user.id)
      .single();
    if (twofaError || !twofa) {
      setError("2FA setup not found. Please contact support.");
      setLoading(false);
      return;
    }
    // Verify 2FA token
    const verified = speakeasy.totp.verify({
      secret: twofa.secret,
      encoding: "base32",
      token
    });
    if (!verified) {
      setError("Invalid 2FA code.");
      setLoading(false);
      return;
    }
    setSuccess("Login successful!");
    setTimeout(() => navigate("/dashboard"), 800);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Open Sans, Arial, Helvetica, sans-serif" }}>
      <div style={{ background: "#222", border: "2px solid #03fc62", borderRadius: "16px", boxShadow: "0 2px 12px rgba(3,252,98,0.18)", padding: "2.5rem 2rem", width: "370px", color: "#fff", textAlign: "center", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "2rem", width: "100%", textAlign: "center" }}>Sign In</h2>
        <form style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.1rem" }} onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: "90%", maxWidth: "260px", padding: "0.95rem", borderRadius: "10px", border: "1.5px solid #03fc62", fontSize: "1.08rem", background: "#181818", color: "#fff", margin: "0 auto", textAlign: "center" }} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: "90%", maxWidth: "260px", padding: "0.95rem", borderRadius: "10px", border: "1.5px solid #03fc62", fontSize: "1.08rem", background: "#181818", color: "#fff", margin: "0 auto", textAlign: "center" }} />
          <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="2FA Code" style={{ width: "90%", maxWidth: "260px", padding: "0.95rem", borderRadius: "10px", border: "1.5px solid #03fc62", fontSize: "1.08rem", background: "#181818", color: "#fff", margin: "0 auto", textAlign: "center" }} />
          <button type="submit" style={{ background: "#03fc62", color: "#222", border: "none", borderRadius: "8px", padding: "0.85rem 1.2rem", fontWeight: "bold", fontSize: "1.08rem", cursor: "pointer", width: "90%", margin: "2rem auto 0 auto" }} disabled={!email || !password || !token || loading}>{loading ? "Logging in..." : "Sign In"}</button>
        </form>
        <div style={{ height: "1.5rem" }} />
        <button style={{ marginTop: "0", background: "none", color: "#03fc62", border: "1px solid #03fc62", borderRadius: "8px", padding: "0.6rem 1.2rem", fontWeight: "bold", fontSize: "1.08rem", cursor: "pointer", width: "90%", margin: "0 auto" }} onClick={() => window.location.href = "/forgot-password"}>Forgot Password?</button>
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
            fontWeight: "bold",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}
        {success && <div style={{ color: "#03fc62", marginTop: "1rem", textAlign: "center" }}>{success}</div>}
      </div>
    </div>
  );
}
