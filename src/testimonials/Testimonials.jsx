import React, { useRef, useEffect, useState } from "react";

const genericAvatar = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

const testimonials = [
  {
    name: "Morgan Linton",
    avatar: genericAvatar,
    handle: "@morganlinton",
    text: "Arcadeon's response time was amazing. I got support within minutes!",
    link: "#"
  },
  {
    name: "Chris DeWeese",
    avatar: genericAvatar,
    handle: "@ChrisDevApps",
    text: "The AI solution tools from Arcadeon are truly next-level. Highly recommend!",
    link: "#"
  },
  {
    name: "Bardia Pourvakil",
    avatar: genericAvatar,
    handle: "@thepericulum",
    text: "Arcadeon helped automate my workflow and saved me hours every week.",
    link: "#"
  },
  {
    name: "Tom Reppelin",
    avatar: genericAvatar,
    handle: "@TomReppelin",
    text: "Super easy integration and fantastic customer service from Arcadeon.",
    link: "#"
  },
  {
    name: "latentsauce 🧘🏽",
    avatar: genericAvatar,
    handle: "@latentsauce",
    text: "Arcadeon's platform is intuitive and powerful. My team loves it!",
    link: "#"
  }
];

export default function Testimonials() {
  const marqueeRef = useRef(null);
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let scrollAmount = 0;
    let frame;
    function animate() {
      scrollAmount += 0.5; // speed
      if (marquee) {
        if (scrollAmount >= marquee.scrollWidth / 2) {
          scrollAmount = 0;
        }
        marquee.scrollLeft = scrollAmount;
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Duplicate testimonials for seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <div style={{
      background: "#222",
      borderRadius: "20px",
      padding: "2.7rem 2.2rem",
      boxShadow: "0 4px 32px rgba(0,0,0,0.22)",
      maxWidth: "1250px",
      margin: "2.5rem auto"
    }}>
      <h2 style={{ color: "#03fc62", textAlign: "center", marginBottom: "2rem", fontWeight: "bold" }}>
        Wall of Love
      </h2>
      <div
        ref={marqueeRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1.5rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "1rem"
        }}
      >
        {items.map((t, i) => (
          <a
            key={i}
            href={t.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#333",
              border: "1px solid #03fc62",
              borderTop: "3px solid #03fc62",
              borderRadius: "12px",
              padding: "1.2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              color: "#fff",
              boxShadow: hovered === i ? "0 6px 24px rgba(3,252,98,0.18)" : "0 2px 8px rgba(0,0,0,0.08)",
              transition: "transform 0.15s, box-shadow 0.15s",
              minWidth: "270px",
              width: "320px",
              textAlign: "center",
              transform: hovered === i ? "scale(1.04)" : "scale(1)"
            }}
            onMouseOver={() => setHovered(i)}
            onMouseOut={() => setHovered(-1)}
          >
            <img
              src={t.avatar}
              alt={t.name}
              style={{ width: 48, height: 48, borderRadius: "50%", marginBottom: "0.8rem", border: "2px solid #03fc62", objectFit: "cover", background: "#222" }}
            />
            <div style={{ fontWeight: "bold", color: "#03fc62", marginBottom: "0.3rem" }}>{t.name}</div>
            <div style={{ fontSize: "0.95rem", color: "#aaa", marginBottom: "0.7rem" }}>{t.handle}</div>
            <p style={{ fontSize: "1rem", textAlign: "center", wordBreak: "break-word", lineHeight: "1.5", margin: 0, whiteSpace: "normal" }}>
              {t.text}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
