import React, { useState } from "react";

const services = [
  {
    title: "Custom Software Development",
    description: "Tailored software solutions built with cutting-edge technologies to meet your unique business requirements.",
    bullets: [
      "Full-stack development",
      "Mobile applications",
      "Cloud-native solutions",
      "API integrations"
    ]
  },
  {
    title: "IT Consulting & Strategy",
    description: "Strategic technology guidance to optimize your IT infrastructure and drive digital transformation.",
    bullets: [
      "Technology roadmaps",
      "Architecture design",
      "Digital transformation",
      "Performance optimization"
    ]
  },
  {
    title: "Enterprise Solutions",
    description: "Scalable enterprise-grade systems designed for complex business operations and high-volume processing.",
    bullets: [
      "Enterprise architecture",
      "System integration",
      "Legacy modernization",
      "Scalability planning"
    ]
  }
];

export default function SpecialistServices() {
  const [hovered, setHovered] = useState(-1);
  return (
    <section style={{
      background: "#181818",
      padding: "3rem 0",
      color: "#fff"
    }}>
      <h2 style={{ textAlign: "center", color: "#fff", fontWeight: "bold", marginBottom: "2.5rem", fontSize: "2rem" }}>
        Our Specialist Services
      </h2>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "wrap"
      }}>
        {services.map((service, i) => (
          <div
            key={service.title}
            style={{
              background: "#222",
              border: "2px solid #03fc62",
              borderTop: "4px solid #03fc62",
              borderRadius: "16px",
              boxShadow: hovered === i ? "0 8px 32px rgba(3,252,98,0.18)" : "0 2px 12px rgba(0,0,0,0.12)",
              transition: "transform 0.18s, box-shadow 0.18s",
              transform: hovered === i ? "scale(1.04)" : "scale(1)",
              width: "320px",
              minHeight: "340px",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
            onMouseOver={() => setHovered(i)}
            onMouseOut={() => setHovered(-1)}
          >
            <h3 style={{ color: "#fff", fontWeight: "bold", marginBottom: "1rem", fontSize: "1.3rem" }}>{service.title}</h3>
            <p style={{ marginBottom: "1.2rem", fontSize: "1rem", color: "#fff" }}>{service.description}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#fff", fontSize: "0.98rem", textAlign: "left", width: "100%" }}>
              {service.bullets.map((b, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem", paddingLeft: "0.5rem", position: "relative", color: "#fff" }}>
                  <span style={{ color: "#03fc62", fontWeight: "bold", marginRight: "0.5rem" }}>•</span>{b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
