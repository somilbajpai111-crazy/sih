// File: App.jsx
// Single-file React prototype for "Digital Psychological Intervention System"
// - Includes components: Navbar, Hero, Features, ResourceGrid, PeerForumPreview, AdminPreview, Footer
// - Includes a lightweight `api` object that stands in for src/services/api.js (use fetch to connect to Flask later)
// - Styling is injected at runtime so this single file can be copied into a CRA / Vite project as src/App.jsx
// - To split into files: move components into src/components/* and the `api` object into src/services/api.js

import React, { useEffect, useState } from "react";

// --- Mock API service (replace with real Flask endpoints later: e.g. fetch('/api/resources')) ---
export const api = {
  async getResources(query = "") {
    // placeholder: return mock resources, later call Flask: return fetch(`/api/resources?q=${query}`).then(r=>r.json())
    const all = [
      { id: 1, title: "Anxiety Management", type: "article", lang: "en" },
      { id: 2, title: "Sleep Guide", type: "audio", lang: "hi" },
      { id: 3, title: "Meditation Audio", type: "audio", lang: "en" },
      { id: 4, title: "Coping with Exam Stress", type: "video", lang: "mr" },
      { id: 5, title: "Mindfulness Practices", type: "article", lang: "en" },
    ];
    return new Promise((res) =>
      setTimeout(
        () =>
          res(
            all.filter((r) =>
              r.title.toLowerCase().includes(query.toLowerCase())
            )
          ),
        350
      )
    );
  },
  async bookAppointment(payload) {
    // later: POST to Flask endpoint
    console.log("bookAppointment payload", payload);
    return new Promise((res) => setTimeout(() => res({ success: true }), 600));
  },
};

// --- Inject fonts & CSS so this file is standalone ---
const injectStyles = () => {
  if (document.getElementById("dpi-styles")) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap";
  document.head.appendChild(link);

  const style = document.createElement("style");
  style.id = "dpi-styles";
  style.innerHTML = `
    :root{
      --bg:#071233; /* dark navy */
      --card:#0f2748;
      --muted:#bcd0ff;
      --accent:#20c997; /* teal/green */
      --glass: rgba(255,255,255,0.04);
    }
    *{box-sizing:border-box}
    body{font-family:'Poppins',sans-serif;background:var(--bg);color:#eaf2ff;margin:0}
    .container{max-width:1200px;margin:0 auto;padding:36px}

    /* Navbar */
    .navbar{position:sticky;top:0;z-index:40;background:linear-gradient(180deg, rgba(7,18,51,0.85), rgba(7,18,51,0.6));backdrop-filter:blur(6px);border-bottom:1px solid rgba(255,255,255,0.03)}
    .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 20px}
    .logo{display:flex;align-items:center;gap:12px;font-weight:700;font-size:18px}
    .logo .mark{width:34px;height:34px;background:var(--accent);border-radius:6px}
    .nav-links{display:flex;gap:18px;align-items:center}
    .nav-links .dropdown{position:relative}
    .nav-links button{background:none;border:none;color:inherit;padding:8px 10px;font-weight:600;cursor:pointer}
    .dropdown-menu{position:absolute;top:40px;left:0;background:var(--card);padding:10px;border-radius:8px;min-width:160px;box-shadow:0 8px 28px rgba(2,6,23,0.6);display:none}
    .dropdown:hover .dropdown-menu{display:block}
    .cta{background:var(--accent);color:#021226;padding:9px 14px;border-radius:8px;font-weight:700;border:none;cursor:pointer}

    /* Hero */
    .hero{display:flex;gap:36px;align-items:center;padding:60px 0}
    .hero-left{flex:1}
    .hero h1{font-size:42px;margin:0 0 12px}
    .hero p{color:var(--muted);margin:0 0 18px;max-width:620px}
    .hero .buttons{display:flex;gap:12px}
    .btn-outline{background:transparent;border:1px solid rgba(255,255,255,0.08);padding:10px 14px;border-radius:8px;color:var(--muted);cursor:pointer}
    .hero-right{width:420px;border-radius:12px;overflow:hidden;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));padding:12px}
    .hero-right img{width:100%;display:block;border-radius:8px}

    /* Features */
    .features{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:18px}
    .feature-card{background:var(--card);padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.03)}
    .feature-card h4{margin:8px 0 6px}
    .feature-card p{margin:0;color:var(--muted);font-size:14px}

    /* Resources */
    .resources{margin-top:40px}
    .search-row{display:flex;gap:12px;margin-bottom:12px}
    .search-row input, .search-row select{padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit}
    .resource-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
    .resource-card{background:var(--glass);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.03)}

    /* Forum */
    .forum{margin-top:36px}
    .thread{background:var(--card);padding:12px;border-radius:10px;margin-bottom:10px}

    /* Admin preview */
    .admin{margin-top:36px;background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);padding:18px;border-radius:12px}
    .chart-row{display:flex;gap:12px;flex-wrap:wrap}
    .chart{flex:1;min-width:220px;padding:12px;background:var(--card);border-radius:8px}

    /* Footer */
    footer{margin-top:48px;padding:36px 0;color:var(--muted);border-top:1px solid rgba(255,255,255,0.03)}
    .footer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px}

    /* Responsive */
    @media (max-width:900px){
      .hero{flex-direction:column}
      .hero-right{width:100%}
      .nav-links{display:none}
    }
  `;
  document.head.appendChild(style);
};
function Navbar() {
  const logoSrc = "/logo.png";
; // Path to your logo

  return (
    <div className="navbar">
      <div className="container nav-inner">
        {/* Logo + App Name */}
        <div className="logo" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={logoSrc}
            alt="DigiPsych Logo"
            className="logo-image"
            onError={(e) => {
              e.target.src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><rect width="100%" height="100%" fill="%2320c997"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23071233" font-size="16" font-weight="bold">DP</text></svg>';
              e.target.style.borderRadius = "6px";
            }}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>DigiPsych</span>
        </div>

        {/* Nav Links */}
        <div className="nav-links" aria-hidden>
          <div className="dropdown">
            <button>Home</button>
            <div className="dropdown-menu">
              <div style={{ padding: "6px 8px" }}>Overview</div>
              <div style={{ padding: "6px 8px" }}>Mission</div>
            </div>
          </div>
          <div className="dropdown">
            <button>Features</button>
            <div className="dropdown-menu">
              <div style={{ padding: "6px 8px" }}>AI Chat</div>
              <div style={{ padding: "6px 8px" }}>Booking</div>
            </div>
          </div>
          <div className="dropdown">
            <button>Resources</button>
          </div>
          <div className="dropdown">
            <button>Peer Support</button>
          </div>
          <div className="dropdown">
            <button>About</button>
          </div>
          <div className="dropdown">
            <button>Contact</button>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="cta">Get Help</button>
        </div>
      </div>
    </div>
  );
}


function Hero({ onStart }) {
  return (
    <section className="container hero" id="home">
      <div className="hero-left">
        <h1>Digital Mental Health Support for Students</h1>
        <p>
          AI-guided first aid, confidential counselling, peer support, and
          wellness resources — all in one place.
        </p>
        <div className="buttons">
          <button className="cta" onClick={onStart}>
            Start Now
          </button>
          <button className="btn-outline">Learn More</button>
        </div>
        <div style={{ marginTop: 18 }}>
          <small style={{ color: "var(--muted)" }}>
            Tailored for college students with regional language support and
            offline mapping to on-campus counsellors.
          </small>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/hero_placeholder.png"
          alt="students using laptop"
          onError={(e) => {
            e.target.src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><rect width="100%" height="100%" fill="%230f2748"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23bcd0ff" font-size="18">Hero Image Placeholder</text></svg>';
          }}
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, children }) {
  return (
    <div className="feature-card">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
          }}
        >
          {icon}
        </div>
        <div>
          <h4>{title}</h4>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="container">
      <h3>Core Features</h3>
      <div className="features" style={{ marginTop: 12 }}>
        <FeatureCard
          icon={<Emoji label="robot">🤖</Emoji>}
          title="AI-guided Chatbot"
        >
          Interactive first-aid chat that suggests coping strategies and refers
          to professionals when necessary.
        </FeatureCard>
        <FeatureCard
          icon={<Emoji label="calendar">📅</Emoji>}
          title="Confidential Booking System"
        >
          Secure appointment booking with campus counsellors and emergency
          helplines.
        </FeatureCard>
        <FeatureCard icon={<Emoji label="book">📚</Emoji>} title="Resource Hub">
          Multilingual videos, audios, and guides accessible offline for
          regional students.
        </FeatureCard>
        <FeatureCard
          icon={<Emoji label="people">👥</Emoji>}
          title="Peer Support Forum"
        >
          Moderated, anonymous peer-to-peer support with trained volunteers.
        </FeatureCard>
        <FeatureCard
          icon={<Emoji label="chart">📈</Emoji>}
          title="Admin Dashboard"
        >
          Anonymous analytics to help institutions plan targeted interventions.
        </FeatureCard>
      </div>
    </section>
  );
}

function Emoji({ children, label }) {
  return (
    <span role="img" aria-label={label} style={{ fontSize: 20 }}>
      {children}
    </span>
  );
}

function Resources() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchResults();
  }, []);
  const fetchResults = async () => {
    setLoading(true);
    const res = await api.getResources(q);
    setItems(res);
    setLoading(false);
  };
  return (
    <section className="container resources" id="resources">
      <h3>Resource Hub</h3>
      <div className="search-row">
        <input
          placeholder="Search resources (e.g., sleep, anxiety)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select aria-label="language">
          <option value="">All languages</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
        <button className="cta" onClick={fetchResults}>
          Search
        </button>
      </div>
      {loading ? (
        <div style={{ padding: 12, color: "var(--muted)" }}>Loading…</div>
      ) : (
        <div className="resource-grid">
          {items.map((r) => (
            <div key={r.id} className="resource-card">
              <strong>{r.title}</strong>
              <div
                style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}
              >
                {r.type} • {r.lang}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function PeerForumPreview() {
  const threads = [
    {
      id: 1,
      user: "Anonymous",
      title: "Coping with exam anxiety",
      msg: "Looking for quick breathing exercises.",
    },
    {
      id: 2,
      user: "Volunteer",
      title: "Need a listening ear",
      msg: "I can volunteer 2 hours weekly to moderate.",
    },
  ];
  return (
    <section className="container forum" id="peer">
      <h3>Peer Support Forum</h3>
      <p style={{ color: "var(--muted)" }}>
        A safe space for moderated, anonymous conversations.
      </p>
      <div style={{ marginTop: 12 }}>
        {threads.map((t) => (
          <div className="thread" key={t.id}>
            <strong>{t.title}</strong>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
              {t.msg}
            </div>
            <div style={{ marginTop: 8 }}>
              <small style={{ color: "var(--muted)" }}>
                Posted by {t.user}
              </small>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <button className="cta">Join Forum</button>
      </div>
    </section>
  );
}

function AdminPreview() {
  // Simple mock charts using SVG bars (no external lib)
  const data = [12, 25, 8, 18, 30];
  return (
    <section className="container admin" id="admin">
      <h3>Admin Dashboard (Preview)</h3>
      <p style={{ color: "var(--muted)" }}>
        Anonymous institutional analytics to identify trends and plan
        interventions.
      </p>
      <div className="chart-row" style={{ marginTop: 12 }}>
        <div className="chart">
          <strong>Weekly screenings</strong>
          <div
            style={{
              height: 90,
              display: "flex",
              alignItems: "end",
              gap: 8,
              marginTop: 12,
            }}
          >
            {data.map((v, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div
                  style={{
                    height: Math.max(6, v * 2),
                    background: "linear-gradient(180deg,var(--accent),#0bbf86)",
                    borderRadius: 6,
                  }}
                />
                <small style={{ color: "var(--muted)" }}>W{i + 1}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="chart">
          <strong>Top concerns</strong>
          <ul style={{ color: "var(--muted)", marginTop: 12 }}>
            <li>Anxiety — 42%</li>
            <li>Sleep — 26%</li>
            <li>Academic stress — 18%</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <strong>DigiPsych</strong>
            <div style={{ color: "var(--muted)", marginTop: 8 }}>
              Open-source mental health support platform for colleges.
            </div>
          </div>
          <div>
            <strong>Quick Links</strong>
            <div style={{ color: "var(--muted)", marginTop: 8 }}>
              Features
              <br />
              Resources
              <br />
              Peer Support
            </div>
          </div>
          <div>
            <strong>Contact</strong>
            <div style={{ color: "var(--muted)", marginTop: 8 }}>
              studentwelfare@college.edu
              <br />
              +91 98765 43210
            </div>
          </div>
          <div>
            <strong>Helplines</strong>
            <div style={{ color: "var(--muted)", marginTop: 8 }}>
              24/7 Helpline: 0800-XXX-XXXX
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    injectStyles();
  }, []);
  const [showBookingMsg, setShowBookingMsg] = useState(null);

  const handleStart = () => {
    document
      .getElementById("resources")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = async () => {
    const res = await api.bookAppointment({
      student: "anonymous",
      when: "ASAP",
    });
    if (res.success) setShowBookingMsg("Appointment request sent (mock).");
  };

  return (
    <div>
      <Navbar />
      <main>
        <Hero onStart={handleStart} />
        <Features />
        <Resources />
        <PeerForumPreview />
        <div className="container" style={{ marginTop: 18 }}>
          <button className="cta" onClick={handleBook}>
            Book Confidential Counselling
          </button>
          {showBookingMsg && (
            <div style={{ marginTop: 8, color: "var(--muted)" }}>
              {showBookingMsg}
            </div>
          )}
        </div>
        <AdminPreview />
      </main>
      <Footer />
    </div>
  );
}

/*
  Notes & next steps to integrate with Flask backend:
  1. Move the `api` object into src/services/api.js and replace mock implementations with fetch calls:
     - export async function getResources(q){ return fetch(`/api/resources?q=${q}`).then(r=>r.json()) }
     - export async function bookAppointment(payload){ return fetch('/api/book', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)}).then(r=>r.json()) }
  2. On Flask side create endpoints like:
     - GET /api/resources?q=...
     - POST /api/book
     - POST /api/chat (for AI-guided first aid)
  3. For real charts, add a charting library (recharts or chart.js). For prototype we used SVG.
  4. To split files: create components in src/components and import them into App.jsx. Keep CSS injection or use a dedicated CSS file.
*/
