
import React, { useEffect, useState, useRef, Suspense } from "react";
import "./i18n";
import { useTranslation } from "react-i18next";
export const api = {
  async getResources(query = "") {
    const all = [
      {
        id: 1,
        title: "10-Minute Guided Meditation",
        type: "video",
        lang: "en",
        youtubeId: "O-6f5wQXSu8",
      },
      {
        id: 2,
        title: "Understanding Depression",
        type: "video",
        lang: "en",
        youtubeId: "z-IR48Mb3W0",
      },
      {
        id: 5,
        title: "Coping with Exam Stress",
        type: "video",
        lang: "en",
        youtubeId: "-RZ86OB9hw4",
      },
      {
        id: 3,
        title: "Peaceful Forest Stream",
        type: "audio",
        lang: "en",
        youtubeId: "1v8mDF57WYs",
      },
      {
        id: 4,
        title: "Journaling for Clarity",
        type: "video",
        lang: "en",
        youtubeId: "WI-j39vOqmk",
      },
      {
        id: 6,
        title: "Spirit Of Kashmir",
        type: "video",
        lang: "en",
        youtubeId: "cXLXn-MV5HQ",
      },
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
    console.log("bookAppointment payload", payload);
    return new Promise((res) => setTimeout(() => res({ success: true }), 1200));
  },
  async getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    let reply = "I'm here to help. Could you please tell me a bit more?";

    if (lowerMsg.includes("exam") || lowerMsg.includes("stress")) {
      reply =
        "Exam stress is very common. Remember to take short breaks, stay hydrated, and practice deep breathing. Would you like me to suggest a relaxation video from our resources?";
    } else if (lowerMsg.includes("anxious") || lowerMsg.includes("anxiety")) {
      reply =
        "It sounds like you're going through a tough time. A useful technique is the 5-4-3-2-1 grounding exercise. Notice 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, and 1 you can taste. This can help bring you back to the present moment.";
    } else if (lowerMsg.includes("sad") || lowerMsg.includes("depressed")) {
      reply =
        "I'm sorry to hear you're feeling this way. It's important to talk about these feelings. Our peer support forum is a safe place, or you can book a confidential session with a counsellor. Your feelings are valid.";
    } else if (lowerMsg.includes("help") || lowerMsg.includes("counsellor")) {
      reply =
        "Seeking help is a sign of strength. You can book an anonymous appointment with a professional by clicking the 'Book Appointment' button in the navigation bar.";
    } else if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
      reply =
        "Hello! I'm your friendly support bot. How are you feeling today? Feel free to share anything that's on your mind.";
    }

    return new Promise((res) => setTimeout(() => res(reply), 1000));
  },
};

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
      --bg:#071233;
      --card:#0f2748;
      --muted:#bcd0ff;
      --accent:#20c997;
      --glass: rgba(15, 39, 72, 0.5);
    }
      html { scroll-behavior: smooth; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    *{box-sizing:border-box}
    body{font-family:'Poppins',sans-serif;background:var(--bg);color:#eaf2ff;margin:0}
    .container{max-width:1200px;margin:0 auto;padding:36px 50px;}
    .cta{background:var(--accent);color:#021226;padding:9px 16px;border-radius:8px;font-weight:700;border:none;cursor:pointer;transition:all .2s ease}
    .cta:hover{opacity:0.9; transform: translateY(-2px);}
    .cta:disabled{background:#555;cursor:not-allowed}
    .btn-outline{background:transparent;border:1px solid rgba(255,255,255,0.1);padding:10px 14px;border-radius:8px;color:var(--muted);cursor:pointer;transition:all .2s ease}
    .btn-outline:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.2)}

    .navbar{position:sticky;top:0;z-index:40;background:linear-gradient(180deg, rgba(7,18,51,0.85), rgba(7,18,51,0.6));backdrop-filter:blur(6px);border-bottom:1px solid rgba(255,255,255,0.03)}
    .nav-inner{display:flex;align-items:center;justify-content:space-between;padding: 12px 50px;}
    .logo{display:flex;align-items:center;gap:12px;font-weight:700;font-size:18px}
    .logo .mark{width:34px;height:34px;background:var(--accent);border-radius:6px}
    .nav-links{display:flex;gap:18px;align-items:center}
    .nav-links .dropdown{position:relative}
    .nav-links button{background:none;border:none;color:inherit;padding:8px 10px;font-weight:600;cursor:pointer}
    .dropdown-menu{position:absolute;top:40px;left:0;background:var(--card);padding:10px;border-radius:8px;min-width:160px;box-shadow:0 8px 28px rgba(2,6,23,0.6);display:none}
    .dropdown:hover .dropdown-menu{display:block}
    .nav-cta-group{display:flex;gap:12px;align-items:center;}

    .hero{display:flex;gap:36px;align-items:center;padding:60px 25; min-height: 80vh;}
    .hero-left{flex:1.2; animation: fadeIn 1s ease-out;}
    .hero h1{font-size:42px;margin:0 0 12px}
    .hero p{color:var(--muted);margin:0 0 18px;max-width:620px}
    .hero .buttons{display:flex;gap:12px}
    
    .hero-chat-container{flex:1;height:450px;background:var(--card);border:1px solid rgba(255,255,255,0.1);border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.4);display:flex;flex-direction:column;overflow:hidden; animation: scaleUp 0.7s ease-out;}
    .hero-chat-header{padding:12px;background:rgba(0,0,0,0.2);font-weight:bold;text-align:center}
    .hero-chat-messages{flex:1;padding:12px;overflow-y:auto;display:flex;flex-direction:column;gap:10px}
    .message{padding:8px 12px;border-radius:18px;max-width:80%;word-wrap:break-word;font-size:14px; line-height: 1.4;}
    .message.user{background:var(--accent);color:var(--bg);align-self:flex-end;border-bottom-right-radius:4px}
    .message.bot{background:var(--bg);color:var(--muted);align-self:flex-start;border-bottom-left-radius:4px}
    .message.loading{color:var(--muted);font-style:italic}
    .hero-chat-input-form{display:flex;padding:10px;border-top:1px solid rgba(255,255,255,0.1)}
    .hero-chat-input-form input{flex:1;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:inherit;margin-right:8px;font-family:inherit;font-size:14px}
    .hero-chat-input-form button{background:var(--accent);border:none;color:var(--bg);padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600}

    .features{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:18px}
    .feature-card{background:var(--card);padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.03)}
    .feature-card h4{margin:8px 0 6px}
    .feature-card p{margin:0;color:var(--muted);font-size:14px}
    
    .resources{margin-top:40px}
    .search-row{display:flex;gap:12px;margin-bottom:12px}
    .search-row input, .search-row select{padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit;font-family:inherit}
    .resource-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
    .resource-card{background:var(--glass);padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.03)}

    .resource-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .resource-card {
      background: var(--card);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .resource-card:hover {
      transform: translateY(-5px) scale(1.03);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .resource-card .card-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    .resource-card .card-content {
      padding: 16px;
      flex: 1;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      width: 100%;
    }

    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .forum{margin-top:36px}
    .thread{background:var(--card);padding:12px;border-radius:10px;margin-bottom:10px}

    .admin{margin-top:36px;background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);padding:18px;border-radius:12px}
    .chart-row{display:flex;gap:12px;flex-wrap:wrap}
    .chart{flex:1;min-width:220px;padding:12px;background:var(--card);border-radius:8px}
    
    .modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(7,18,51,0.6);backdrop-filter:blur(8px);z-index:100;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease}
    .modal-content{background:var(--glass);padding:28px;border-radius:16px;width:90%;max-width:520px;position:relative;border:1px solid rgba(255,255,255,0.1);box-shadow: 0 10px 40px rgba(0,0,0,0.5); animation: scaleUp 0.4s ease-out;}
    .modal-close-btn{position:absolute;top:15px;right:15px;background:none;border:none;color:var(--muted);font-size:28px;cursor:pointer;transition: all 0.2s ease;}
    .modal-close-btn:hover{color:white; transform: rotate(90deg);}
    .modal-content h3{margin-top:0; font-size:24px;}
    .form-group{margin-bottom:18px}
    .form-group label{display:block;margin-bottom:8px;font-size:14px;font-weight:500;color:var(--muted)}
    .form-group input, .form-group select, .form-group textarea{width:100%;padding:12px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:var(--bg);color:inherit;font-family:inherit;font-size:16px;transition: all 0.2s ease;}
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus{border-color:var(--accent);box-shadow: 0 0 0 3px rgba(32, 201, 151, 0.2);}
    .modal-success-message{text-align:center;padding:30px 20px; color: var(--accent); animation: fadeIn 0.5s ease;}
    .modal-success-message h4{font-size:22px; margin-bottom:8px;}
    .modal-success-message p{color:var(--muted); margin-top:0;}
    
    .footer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px}
    footer{margin-top:48px;padding:36px 0;color:var(--muted);border-top:1px solid rgba(255,255,255,0.03)}
.lang-switch-container {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  font-weight: 600;
  font-size: 14px;
}
.lang-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
.lang-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--card);
  border: 1px solid rgba(255,255,255,0.1);
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 26px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: var(--accent);
}
input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}
    @media (max-width:900px){
      .hero{flex-direction:column; padding-top: 30px; text-align:center;}
      .hero-left{text-align: center;}
      .hero p{margin: 0 auto 24px;}
      .hero .buttons{justify-content:center}
      .hero-chat-container{width:100%; height: 450px;}
      .nav-links{display:none}
    }
   

@keyframes fadeInSimple {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.feature-card {
  background: var(--card);
  padding: 18px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  
  animation: fadeInSimple 0.5s ease-out forwards;
  opacity: 0;

  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }

.feature-card:hover {
  transform: translateY(-6px) scale(1.04); 
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4); 
}

.feature-icon {
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.15);
}


.atmospheric-break {
  background-image: 
    linear-gradient(rgba(7, 18, 51, 0.7), rgba(7, 18, 51, 0.95)),
    url('https://images.unsplash.com/photo-1532372576292-a42306f1e311?q=80&w=2070&auto=format&fit=crop');
  
  height: 400px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.quote-container {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(2px);
  border-radius: 8px;
}

.quote-text {
  font-size: 22px;
  font-style: italic;
  color: var(--muted);
  margin: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.quote-author {
  display: block;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}
@media (max-width: 768px) {
  .container {
    padding: 24px 20px;
  }

  .nav-inner {
    padding: 12px 20px;
  }

  .hero h1 {
    font-size: 32px;
  }

  h3 {
    font-size: 24px;
  }

  .features,
  .resource-grid,
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .nav-links {
    display: none;
  }

  .nav-cta-group .btn-outline {
    display: none;
  }

  .hero {
    flex-direction: column;
    padding-top: 30px;
    text-align: center;
  }
  .hero-left {
    text-align: center;
  }
  .hero p {
    margin: 0 auto 24px;
  }
  .hero .buttons {
    justify-content: center;
  }
  .hero-chat-container {
    width: 100%;
    height: 450px;
  }
  
  .hero-left img {
      margin-left: auto;
      margin-right: auto;
      max-width: 50%;
  }
}
  `;
  document.head.appendChild(style);
};

function Navbar({ onBookAppointment }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const { t, i18n } = useTranslation();
 const handleToggleChange = (e) => {
   const newLang = e.target.checked ? "ks" : "en";
   i18n.changeLanguage(newLang);
 };
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <>
      <div className="navbar">
        <div className="container nav-inner">
          <a
            href={import.meta.env.BASE_URL}
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={logoSrc}
              alt="DigiPsych Logo"
              className="logo-image"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              DigiPsych
            </span>
          </a>

          <div className="nav-links" aria-hidden>
            <a href="#home">{t("home")}</a>
            <a href="#features">{t("features")}</a>
            <a href="#resources">{t("resources")}</a>
            <a href="#peer">{t("peerSupport")}</a>
            {/* <a href="#about">{t("About")}</a> */}
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              {t("contact")}
            </a>{" "}
          </div>

          <div className="nav-cta-group">
            <div className="lang-switch-container">
              <span>A</span>
              <label className="lang-switch">
                <input
                  type="checkbox"
                  checked={i18n.language === "ks"}
                  onChange={handleToggleChange}
                />
                <span className="slider"></span>
              </label>
              <span> ک</span>
            </div>
            <button className="btn-outline" onClick={onBookAppointment}>
              {t("bookAppointment")}
            </button>
            <button className="cta">{t("getHelp")}</button>

            <button
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>
            {t("home")}
          </a>
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>
            {t("features")}
          </a>
          <a href="#resources" onClick={() => setIsMobileMenuOpen(false)}>
            {t("resources")}
          </a>
          <a href="#peer" onClick={() => setIsMobileMenuOpen(false)}>
            {t("peerSupport")}
          </a>
          {/* <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </a> */}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            {t("contact")}
          </a>
        </div>
      )}
    </>
  );
}

function InteractiveChat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: t("aiChatWelcome"),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 0);
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);

    let res = "";

    try {
      const response = await fetch("https://sih-mental.onrender.com/chatbot", {
        method: "OPTIONS",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) throw new Error("HTTP error " + response.status);
      const data = await response.json();

      res = data.data;
    } catch (err) {
      console.error(err);
      res = "There was some error";
    }

    const botResponse = res;
    setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="hero-chat-container">
      <div className="hero-chat-header">{t("aiChatHeader")}</div>
      <div className="hero-chat-messages" ref={messageContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="message bot loading">{t("aiChatTyping")}</div>
        )}
      </div>
      <form className="hero-chat-input-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder={t("aiChatPlaceholder")}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
          aria-label="Chat input"
        />
        <button type="submit" disabled={isLoading}>
          {t("aiChatSend")}
        </button>
      </form>
    </div>
  );
}

function Hero({ onStart }) {
  const { t } = useTranslation();
  return (
    <section className="container hero" id="home">
      <div className="hero-left">
        <img
          src="https://i.postimg.cc/ZKVQSH8X/hero-placeholder.png"
          alt="Abstract representation of mental well-being"
          style={{
            maxWidth: "34%",
            height: "auto",
            borderRadius: "140px",
            marginBottom: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            marginLeft: "20%",
          }}
        />
        <h1>{t("heroTitle")}</h1>
        <p>{t("heroSubtitle")}</p>
        <div className="buttons">
          <button className="cta" onClick={onStart}>
            {t("startNow")}
          </button>
          <button className="btn-outline">{t("learnMore")}</button>
        </div>
        <div style={{ marginTop: 18 }}>
          <small style={{ color: "var(--muted)" }}>{t("heroFinePrint")}</small>
        </div>
      </div>
      <InteractiveChat />
    </section>
  );
}
function AtmosphericBreak() {
  const quote =
    "The first step towards getting somewhere is to decide you're not going to stay where you are.";
  const author = "J.P. Morgan";

  return (
    <section className="atmospheric-break">
      <div className="quote-container">
        <p className="quote-text">"{quote}"</p>
        <span className="quote-author">- {author}</span>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, children }) {
  return (
    <div className="feature-card">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          className="feature-icon"
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
  const { t } = useTranslation();
  return (
    <section className="container">
      <h3>{t("coreFeatures")}</h3>
      <div className="features" style={{ marginTop: 12 }}>
        <FeatureCard
          icon={<Emoji label="robot">🤖</Emoji>}
          title={t("featureChatbot")}
        >
          {t("featureChatbotDesc")}
        </FeatureCard>

        <FeatureCard
          icon={<Emoji label="calendar">📅</Emoji>}
          title={t("featureBooking")}
        >
          {t("featureBookingDesc")}
        </FeatureCard>

        <FeatureCard
          icon={<Emoji label="book">📚</Emoji>}
          title={t("featureHub")}
        >
          {t("featureHubDesc")}
        </FeatureCard>

        <FeatureCard
          icon={<Emoji label="people">👥</Emoji>}
          title={t("featureForum")}
        >
          {t("featureForumDesc")}
        </FeatureCard>

        <FeatureCard
          icon={<Emoji label="chart">📈</Emoji>}
          title={t("featureAdmin")}
        >
          {t("featureAdminDesc")}
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
   const { t } = useTranslation();
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
      <h3>{t("resourceHubTitle")}</h3>
      <div className="search-row">
        <input
          placeholder={t("resourceSearchPlaceholder")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select aria-label="language">
          <option value="">{t("allLanguages")}</option>
          <option value="en">{t("english")}</option>
          <option value="hi">{t("hindi")}</option>
        </select>
        <button className="cta" onClick={fetchResults}>
          {t("search")}
        </button>
      </div>
      {loading ? (
        <div style={{ padding: 12, color: "var(--muted)" }}>{t("loading")}</div>
      ) : (
        <div className="resource-grid">
          {items.map((r) => (
            <div key={r.id} className="resource-card">
              {r.youtubeId && (
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${r.youtubeId}`}
                    title={r.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {r.imageUrl && !r.youtubeId && (
                <img src={r.imageUrl} alt={r.title} className="card-image" />
              )}

              <div className="card-content">
                <strong>{r.title}</strong>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: 13,
                    marginTop: 6,
                  }}
                >
                  {r.type} • {r.lang}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function PeerForumPreview() {
  const { t } = useTranslation();
  const threads = [
    { id: 1, user: "Anonymous", title: "Coping with exam anxiety", msg: "Looking for quick breathing exercises." },
    { id: 2, user: "Volunteer", title: "Need a listening ear", msg: "I can volunteer 2 hours weekly to moderate." },
  ];
  return (
    <section className="container forum" id="peer">
      <h3>{t('peerForumTitle')}</h3>
      <p style={{ color: "var(--muted)" }}>{t('peerForumSubtitle')}</p>
      <div style={{ marginTop: 12 }}>
        {threads.map((t) => (
          <div className="thread" key={t.id}>
            <strong>{t.title}</strong>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>{t.msg}</div>
            <div style={{ marginTop: 8 }}><small style={{ color: "var(--muted)" }}>Posted by {t.user}</small></div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <a href="https://www.reddit.com/r/MentalHealthSupport/" className="cta">{t('joinCommunity')}</a>
      </div>
    </section>
  );
}

function AdminPreview() {
  const { t } = useTranslation();
  const data = [12, 25, 8, 18, 30];
  return (
    <section className="container admin" id="admin">
      <h3>{t("adminTitle")}</h3>
      <p style={{ color: "var(--muted)" }}>{t("adminSubtitle")}</p>
      <div className="chart-row" style={{ marginTop: 12 }}>
        <div className="chart">
          <strong>{t("adminChart1Title")}</strong>
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
          <strong>{t("adminChart2Title")}</strong>
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
    const { t } = useTranslation();
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-grid">
          <div>
            <strong>DigiPsych</strong>
            <div
              style={{ color: "var(--muted)", marginTop: 8, fontSize: "14px" }}
            >
              {t("footerAbout")}
            </div>
          </div>
          <div>
            <strong>{t("footerQuickLinks")}</strong>
            <div
              style={{ color: "var(--muted)", marginTop: 8, fontSize: "14px" }}
            >
              {t("resources")}
              <br />
              <a
                href="https://www.reddit.com/r/MentalHealthSupport/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {t("peerSupport")}
              </a>
              <br />
              {t("bookAppointment")}
            </div>
          </div>
          <div>
            <strong>{t("contact")}</strong>
            <div
              style={{ color: "var(--muted)", marginTop: 8, fontSize: "14px" }}
            >
              Digipsych@college.edu
              <br />
              +91 98765 43210
            </div>
          </div>
          <div>
            <strong>J&K Emergency Helplines</strong>
            <div
              style={{ color: "var(--muted)", marginTop: 8, fontSize: "14px" }}
            >
              Tele-MANAS: <strong>14416</strong>
              <br />
              (Mental Health Support)
              <br />
              Student's NGO: <strong>18001802070</strong>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AppointmentModal({ onClose }) {
  const [formData, setFormData] = useState({
    type: "Counsellor",
    date: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    try {
      const res = await api.bookAppointment({
        ...formData,
        studentId: "anonymous",
      });
      if (res.success) {
        setStatus("success");
        setTimeout(onClose, 2500);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        {status === "success" ? (
          <div className="modal-success-message">
            <Emoji label="checkmark">✅</Emoji>
            <h4>Request Sent!</h4>
            <p>We've received your request. You will be contacted shortly.</p>
          </div>
        ) : (
          <>
            <h3>Book a Confidential Session</h3>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 14,
                marginTop: -10,
                marginBottom: 20,
              }}
            >
              Your request is sent anonymously. A counsellor will reach out with
              available slots.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="type">Type of Help</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option>Counsellor</option>
                  <option>Psychiatrist</option>
                  <option>Peer Volunteer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Reason for booking (optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="e.g., Feeling stressed about exams..."
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="cta"
                disabled={isSubmitting}
                style={{ width: "100%", padding: "12px" }}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
              {status === "error" && (
                <p style={{ color: "#ff8a8a", marginTop: "10px" }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    injectStyles();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStart = () => {
    document
      .getElementById("resources")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Suspense fallback="Loading...">
      <div>
        <Navbar onBookAppointment={() => setIsModalOpen(true)} />
        <main>
          <Hero onStart={handleStart} />
          <Features />
          <Resources />
          <PeerForumPreview />
          <AdminPreview />
        </main>
        <Footer />

        {isModalOpen && (
          <AppointmentModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </Suspense>
  );
}
