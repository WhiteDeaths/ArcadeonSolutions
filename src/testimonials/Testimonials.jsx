import React, { useRef, useEffect } from "react";

const genericAvatar = "https://ui-avatars.com/api/?background=222&color=03fc62&name=User";

const testimonials = [
  {
    name: "Morgan Linton",
    avatar: genericAvatar,
    handle: "@morganlinton",
    text: "If you're coding with AI, and haven't discovered @firecrawl_dev yet, prepare to have your mind blown 🤯",
    link: "https://x.com/morganlinton/status/1839454165703204955"
  },
  {
    name: "Chris DeWeese",
    avatar: genericAvatar,
    handle: "@ChrisDevApps",
    text: "Started using @firecrawl_dev for a project, I wish I used this sooner.",
    link: "https://x.com/ChrisDevApps/status/1853587120406876601"
  },
  {
    name: "Bardia Pourvakil",
    avatar: genericAvatar,
    handle: "@thepericulum",
    text: "The Firecrawl team ships. I wanted types for their node SDK, and less than an hour later, I got them.",
    link: "https://twitter.com/thepericulum/status/1781397799487078874"
  },
  {
    name: "Tom Reppelin",
    avatar: genericAvatar,
    handle: "@TomReppelin",
    text: "I found gold today. Thank you @firecrawl_dev",
    link: "https://x.com/TomReppelin/status/1844382491014201613"
  },
  {
    name: "latentsauce 🧘🏽",
    avatar: genericAvatar,
    handle: "@latentsauce",
    text: "Firecrawl simplifies data preparation significantly, exactly what I was hoping for. Thank you Firecrawl ❤️❤️❤️",
    link: "https://twitter.com/latentsauce/status/1781738253927735331"
  }
];

export default function Testimonials() {
  const marqueeRef = useRef(null);

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
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      maxWidth: "1100px",
      margin: "2rem auto"
    }}>
      <h2 style={{ color: "#03fc62", textAlign: "center", marginBottom: "2rem", fontWeight: "bold" }}>
        Wall of Love
      </h2>
      <div
        ref={marqueeRef}
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
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
              borderRadius: "12px",
              padding: "1.2rem",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "transform 0.15s",
              minWidth: "270px",
              maxWidth: "320px"
            }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={t.avatar}
              alt={t.name}
              style={{ width: 48, height: 48, borderRadius: "50%", marginBottom: "0.8rem", border: "2px solid #03fc62" }}
            />
            <div style={{ fontWeight: "bold", color: "#03fc62", marginBottom: "0.3rem" }}>{t.name}</div>
            <div style={{ fontSize: "0.95rem", color: "#aaa", marginBottom: "0.7rem" }}>{t.handle}</div>
            <p style={{ fontSize: "0.95rem", textAlign: "left", wordBreak: "break-word", lineHeight: "1.5", margin: 0 }}>
              {t.text}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
