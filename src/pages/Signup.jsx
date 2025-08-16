import React from "react";

export default function Signup() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#333333",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#222",
        border: "2px solid #03fc62",
        color: "#03fc62",
        padding: "2rem 3rem",
        borderRadius: "12px",
        minWidth: "300px",
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: "bold"
      }}>
        Create an Account
      </div>
    </div>
  );
}
