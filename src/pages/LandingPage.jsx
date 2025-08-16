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
      fontFamily: "Open Sans, Arial, Helvetica, sans-serif",
      overflowX: "hidden",
      width: "100%"
    }}>
      {/* Sticky Top Bar */}
      <div style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        background: "#222",
        borderBottom: "2px solid #03fc62",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0.7rem 2rem"
      }}>
        <img src="/arcadeon-logo-text.svg" alt="Arcadeon Logo" style={{ height: "40px", marginRight: "2.5rem" }} />
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: "1.1rem", flexWrap: "nowrap" }}>
          <button
            style={{
              background: "none",
              color: "#03fc62",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
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
              cursor: "pointer",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              transition: "background 0.15s"
            }}
            onClick={() => scrollTo(quoteRef)}
          >
            Get A Quote
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
      </div>
      {/* Accents */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        background: "#03fc62"
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
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
          <a href="mailto:james.upson@arcadeon.co.uk" style={{ color: "#03fc62", fontWeight: "bold", textDecoration: "none" }}>james.upson@arcadeon.co.uk</a> | <span style={{ color: "#03fc62", fontWeight: "bold" }}>+1 (555) 123-4567</span>
        </p>
      </div>
      <div style={{ maxWidth: "100%" }}>
        <Testimonials />
      </div>

      {/* Bottom Bar */}
      <footer style={{
        width: "100%",
        background: "#222",
        borderTop: "2px solid #03fc62",
        color: "#fff",
        padding: "2.5rem 0 1.2rem 0",
        marginTop: "3rem",
        fontSize: "1rem",
        boxShadow: "0 -2px 16px rgba(3,252,98,0.08)",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem"
        }}>
          <div>
            <h3 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "0.7rem" }}>Arcadeon</h3>
            <div style={{ maxWidth: "320px", lineHeight: "1.5" }}>
              Leading provider of software development and IT consulting services, delivering innovative solutions to enterprises, startups, and individual clients worldwide.
            </div>
          </div>
          <div>
            <h4 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "0.5rem" }}>Services</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Software Development</li>
              <li>IT Consulting</li>
              <li>Enterprise Solutions</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "0.5rem" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: "#03fc62", fontWeight: "bold", marginBottom: "0.5rem" }}>Contact</h4>
            <div style={{ lineHeight: "1.5" }}>
              <a href="mailto:james.upson@arcadeon.co.uk" style={{ color: "#03fc62", textDecoration: "none", fontWeight: "bold" }}>james.upson@arcadeon.co.uk</a><br />
              <span style={{ color: "#03fc62", fontWeight: "bold" }}>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
        <div style={{
          maxWidth: "1200px",
          margin: "2rem auto 0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.95rem",
          color: "#aaa"
        }}>
          <span>© 2024 Arcadeon. All rights reserved.</span>
          <span>
            Made with <a href="https://app.emergent.sh/?utm_source=emergent-badge" style={{ color: "#03fc62", textDecoration: "none" }}>Emergent</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
