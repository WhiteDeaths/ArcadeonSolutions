import React from "react";

export default function Auth() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#333333",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins, sans-serif"
    }}>
      <div style={{
        width: 300,
        height: 370,
        position: "relative",
        zIndex: 1,
        background: "rgba(255,255,255,0.08)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: 10,
        border: "1px solid #fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: 10,
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          zIndex: -1
        }} />
        <div style={{ width: "100%", textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginTop: 30, marginBottom: -20 }}>Sign In / Create Account</h2>
          <form style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              style={{
                padding: 10,
                marginTop: 25,
                border: "none",
                borderRadius: 10,
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                fontSize: 13
              }}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              style={{
                padding: 10,
                marginTop: 25,
                border: "none",
                borderRadius: 10,
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                fontSize: 13
              }}
            />
            <div style={{ display: "flex", alignItems: "center", marginTop: 15, fontSize: 12, color: "white" }}>
              <input type="checkbox" id="remember" name="remember" style={{ marginRight: 5, marginTop: 0 }} />
              <label htmlFor="remember">Remember me</label>
              <a href="#" style={{ textDecoration: "none", color: "white", marginLeft: "auto" }}>Forgot Password?</a>
            </div>
            <button
              type="submit"
              style={{
                background: "#fff",
                color: "black",
                padding: 10,
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                marginTop: 15,
                fontWeight: "bold"
              }}
            >
              Login
            </button>
            <p style={{ fontSize: 12, color: "#fff", marginTop: 15 }}>
              Don't have an account? <a href="#" style={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}>Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
