import React, { useState } from "react";
import Setup2FA from "./Setup2FA";
import { supabase } from "../supabaseClient";
import speakeasy from "speakeasy";
import { supabase } from "../supabaseClient";

const supabaseUrl = 'https://stkfhbalhkhkftqdbnqd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a2ZoYmFsaGtoa2Z0cWRibnFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTMxNTMyOCwiZXhwIjoyMDcwODkxMzI4fQ.I7xfHXrEOwVyyPtVxDi11-ln-s8hRop2ICzjVCzkUHY'; // Get this from Supabase dashboard > Project Settings > API

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");

  // Helper validation functions
  const validateUsername = (name) => {
    if (!name.trim()) return "Username is required.";
    if (/[^a-zA-Z\s]/.test(name)) return "Username must not contain digits or special characters.";
    if (name.length < 2) return "Username must be at least 2 characters.";
    if (name.length > 32) return "Username must be less than 32 characters.";
    return "";
  };
  const validateEmail = (mail) => {
    if (!mail.trim()) return "Email is required.";
    if (!/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9\.-]+)\.([a-zA-Z]{2,})$/.test(mail)) return "Invalid email format.";
    // Simulate uniqueness check
    if (mail.toLowerCase() === "test@example.com") return "Email already exists.";
    return "";
  };
  const validatePassword = (pw) => {
    if (!pw) return "Password is required.";
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (pw.length > 32) return "Password must be less than 32 characters.";
    if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter.";
    if (!/[0-9]/.test(pw)) return "Password must contain a digit.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw)) return "Password must contain a special character.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    // Trim inputs
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    // Validate fields
    const usernameError = validateUsername(trimmedUsername);
    const emailError = validateEmail(trimmedEmail);
    const passwordError = validatePassword(trimmedPassword);
    const newErrors = {};
    if (usernameError) newErrors.username = usernameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Register user with Supabase Auth
      supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
        options: {
          data: { username: trimmedUsername }
        }
      }).then(async ({ data, error }) => {
        if (error) {
          setErrors({ email: error.message });
        } else {
          // Generate TOTP secret
          const totpSecret = speakeasy.generateSecret({ length: 20 });
          setSecret(totpSecret.base32);
          setUserId(data.user.id);
          // Store secret in Supabase table user_2fa
          await supabase.from('user_2fa').insert([{ user_id: data.user.id, secret: totpSecret.base32 }]);
          setShow2FA(true);
        }
      });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#181818",
      position: "relative",
      fontFamily: "Poppins, sans-serif",
      overflow: "hidden"
    }}>
      {/* Accents */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "4px",
        background: "#03fc62"
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100vw",
        height: "2px",
        background: "#03fc62"
      }} />
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          width: 340,
          minHeight: 420,
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.08)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          borderRadius: 16,
          border: "1px solid #03fc62",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 2rem"
        }}>
          <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 16,
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            zIndex: -1
          }} />
          <div style={{ width: "100%", textAlign: "center" }}>
            {!show2FA ? (
              <>
                <h2 style={{ color: "#fff", marginTop: 30, marginBottom: -20 }}>Create an Account</h2>
                <form style={{ display: "flex", flexDirection: "column", marginTop: 30 }} onSubmit={handleSubmit} noValidate>
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{
                      padding: "14px 12px",
                      marginTop: 30,
                      border: "none",
                      borderRadius: 10,
                      background: "transparent",
                      border: errors.username ? "2px solid #ff4d4f" : "1px solid #03fc62",
                      color: "#fff",
                      fontSize: 15
                    }}
                    aria-invalid={!!errors.username}
                    aria-describedby="username-error"
                  />
                  {errors.username && <div id="username-error" style={{ color: "#ff4d4f", fontSize: 13, marginTop: 4, textAlign: "left" }}>{errors.username}</div>}
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      padding: "14px 12px",
                      marginTop: 24,
                      border: "none",
                      borderRadius: 10,
                      background: "transparent",
                      border: errors.email ? "2px solid #ff4d4f" : "1px solid #03fc62",
                      color: "#fff",
                      fontSize: 15
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  {errors.email && <div id="email-error" style={{ color: "#ff4d4f", fontSize: 13, marginTop: 4, textAlign: "left" }}>{errors.email}</div>}
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                      padding: "14px 12px",
                      marginTop: 24,
                      border: "none",
                      borderRadius: 10,
                      background: "transparent",
                      border: errors.password ? "2px solid #ff4d4f" : "1px solid #03fc62",
                      color: "#fff",
                      fontSize: 15
                    }}
                    aria-invalid={!!errors.password}
                    aria-describedby="password-error"
                    autoComplete="new-password"
                  />
                  {errors.password && <div id="password-error" style={{ color: "#ff4d4f", fontSize: 13, marginTop: 4, textAlign: "left" }}>{errors.password}</div>}
                  <button
                    type="submit"
                    style={{
                      background: "#03fc62",
                      color: "#181818",
                      padding: "12px 0",
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                      marginTop: 22,
                      fontWeight: "bold",
                      fontSize: 16
                    }}
                    disabled={Object.keys(errors).length > 0}
                  >
                    Register
                  </button>
                  {success && <div style={{ color: "#03fc62", fontSize: 14, marginTop: 18 }}>{success}</div>}
                </form>
              </>
            ) : (
              <Setup2FA email={email} secret={secret} userId={userId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
