import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../testimonials/Testimonials";
import SpecialistServices from "../features/SpecialistServices";

export default function LandingPage() {
  const navigate = useNavigate();
  const servicesRef = useRef(null);
  const whyRef = useRef(null);
  const quoteRef = useRef(null);

  const scrollTo = ref => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#181818",
      position: "relative",
      fontFamily: "sans-serif",
      overflowX: "hidden"
    }}>
      {/* Sticky Top Bar */}
      <div style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100vw",
        background: "#222",
        borderBottom: "2px solid #03fc62",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.7rem 0"
      }}>
        <button
          style={{
            background: "none",
            color: "#03fc62",
            border: "none",
            fontWeight: "bold",
            fontSize: "1.1rem",
            margin: "0 1.5rem",
            cursor: "pointer",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            transition: "background 0.15s"
          }}
          onClick={() => scrollTo(servicesRef)}
        >
          Services
        </button>
        <button
          style={{
            background: "none",
            color: "#03fc62",
            border: "none",
            fontWeight: "bold",
            fontSize: "1.1rem",
            margin: "0 1.5rem",
            cursor: "pointer",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            transition: "background 0.15s"
          }}
          onClick={() => scrollTo(whyRef)}
        >
          Why Choose Us
        </button>
        <button
          style={{
            background: "none",
            color: "#03fc62",
            border: "none",
            fontWeight: "bold",
            fontSize: "1.1rem",
            margin: "0 1.5rem",
            cursor: "pointer",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            transition: "background 0.15s"
          }}
          onClick={() => scrollTo(quoteRef)}
        >
          Get A Quote
        </button>
      </div>
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
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </div>
      {/* Main content placeholder */}
      <div style={{
        color: "#fff",
        textAlign: "center",
        marginTop: "18vh",
        marginBottom: "2vh"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Welcome to Arcadeon Solutions</h1>
        <p style={{ fontSize: "1.2rem", color: "#fff" }}>Modern solutions for your business needs.</p>
      </div>
      {/* Specialist Services Section */}
      <div ref={servicesRef}>
        <SpecialistServices />
      </div>
      {/* Why Choose Us Section */}
      <div ref={whyRef} style={{ padding: "3rem 0", background: "#181818", color: "#fff", textAlign: "center" }}>
        <h2 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "1.5rem", fontSize: "2rem" }}>Why Choose Us</h2>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}>
          Our commitment to excellence sets us apart in the competitive IT landscape.<br />
          Deep expertise across modern technologies and industry best practices, ensuring optimal solutions for every project.<br />
          Years of experience delivering successful projects for enterprises, startups, and individual clients globally.<br />
          Rapid project initiation and agile delivery methodology ensuring your solutions are delivered faster than ever.
        </p>
      </div>
      {/* Get A Quote Section */}
      <div ref={quoteRef} style={{ padding: "3rem 0", background: "#181818", color: "#fff", textAlign: "center" }}>
        <h2 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "1.5rem", fontSize: "2rem" }}>Get A Quote</h2>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}>
          Ready to transform your IT infrastructure? Get in touch with our specialists to discuss your project requirements and discover how Arcadeon can accelerate your success.<br />
          <a href="mailto:hello@arcadeon.com" style={{ color: "#03fc62", fontWeight: "bold", textDecoration: "none" }}>hello@arcadeon.com</a> | <span style={{ color: "#03fc62", fontWeight: "bold" }}>+1 (555) 123-4567</span>
        </p>
      </div>
      <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
        <Testimonials />
      </div>
    </div>
  );
}
