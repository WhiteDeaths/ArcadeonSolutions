import React from "react";

export default function Register() {
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
            <h2 style={{ color: "#fff", marginTop: 30, marginBottom: -20 }}>Create an Account</h2>
            <form style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                style={{
                  padding: "14px 12px",
                  marginTop: 30,
                  border: "none",
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid #03fc62",
                  color: "#fff",
                  fontSize: 15
                }}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                style={{
                  padding: "14px 12px",
                  marginTop: 24,
                  border: "none",
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid #03fc62",
                  color: "#fff",
                  fontSize: 15
                }}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                style={{
                  padding: "14px 12px",
                  marginTop: 24,
                  border: "none",
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid #03fc62",
                  color: "#fff",
                  fontSize: 15
                }}
              />
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
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
