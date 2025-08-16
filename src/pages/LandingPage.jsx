import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#333333",
      position: "relative",
      fontFamily: "sans-serif"
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
      {/* Top right boxes */}
      <div style={{
        position: "absolute",
        top: 24,
        right: 24,
        display: "flex",
        gap: "12px"
      }}>
        <button
          style={{
            background: "#222",
            color: "#03fc62",
            border: "1px solid #03fc62",
            borderRadius: "8px",
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer"
          }}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          style={{
            background: "#222",
            color: "#03fc62",
            border: "1px solid #03fc62",
            borderRadius: "8px",
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer"
          }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
      {/* Main content placeholder */}
      <div style={{
        color: "#fff",
        textAlign: "center",
        marginTop: "20vh"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Welcome to Arcadeon Solutions</h1>
        <p style={{ fontSize: "1.2rem", color: "#03fc62" }}>Modern solutions for your business needs.</p>
      </div>
    </div>
  );
}
