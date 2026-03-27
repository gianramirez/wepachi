"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const MESSAGES = {
  feed: ["¡Wepa! ¡Pastelillo time!", "¡Mmm, qué rico!", "¡Estoy lleno, bendito!", "¡Gracias, boricua!"],
  play: ["¡Salseo! ¡Dale!", "¡Azúca! ¡Wepa!", "¡Mira cómo bailo!", "¡La rumba está buena!"],
  coffee: ["¡Dame café, por favor!", "¡Cafecito = vida!", "¡Ahh, qué rico el café!", "¡Despierta, coquí!"],
  hungry: ["Tengo hambre...", "¿Y el pastelillo?", "Dame comida, please..."],
  tired: ["Necesito cafecito...", "Estoy sin energía...", "Zzz... dame café..."],
  bored: ["Estoy aburrido...", "¿Bailamos o qué?", "Ponme salsa, plis..."],
};
const randomMsg = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ─── Pixel Art Components ───
const CoquiBlob = ({ expression, isAnimating, animationType }) => {
  const bodyColor = "#5a8a5a";
  const bellyColor = "#7ab87a";
  const eyeColor = "#1a1a1a";
  let cls = "";
  if (isAnimating) {
    if (animationType === "dance") cls = "animate-dance";
    else if (animationType === "eat") cls = "animate-bounce";
    else if (animationType === "coffee") cls = "animate-jolt";
  }

  const renderEyes = () => {
    switch (expression) {
      case "hungry":
        return (<>
          <rect x="14" y="11" width="3" height="2" fill={eyeColor} />
          <rect x="13" y="10" width="1" height="1" fill={eyeColor} />
          <rect x="23" y="11" width="3" height="2" fill={eyeColor} />
          <rect x="26" y="10" width="1" height="1" fill={eyeColor} />
          <rect x="17" y="18" width="1" height="1" fill={eyeColor} />
          <rect x="18" y="17" width="4" height="1" fill={eyeColor} />
          <rect x="22" y="18" width="1" height="1" fill={eyeColor} />
        </>);
      case "bored":
        return (<>
          <rect x="16" y="10" width="2" height="3" fill={eyeColor} />
          <rect x="25" y="10" width="2" height="3" fill={eyeColor} />
          <rect x="17" y="17" width="6" height="1" fill={eyeColor} />
        </>);
      case "dancing":
        return (<>
          <rect x="13" y="11" width="4" height="1" fill={eyeColor} />
          <rect x="13" y="10" width="1" height="1" fill={eyeColor} />
          <rect x="16" y="10" width="1" height="1" fill={eyeColor} />
          <rect x="23" y="11" width="4" height="1" fill={eyeColor} />
          <rect x="23" y="10" width="1" height="1" fill={eyeColor} />
          <rect x="26" y="10" width="1" height="1" fill={eyeColor} />
          <rect x="16" y="17" width="8" height="1" fill={eyeColor} />
          <rect x="15" y="16" width="1" height="1" fill={eyeColor} />
          <rect x="24" y="16" width="1" height="1" fill={eyeColor} />
          <rect x="17" y="18" width="6" height="1" fill="#c44" />
        </>);
      default:
        return (<>
          <rect x="13" y="10" width="3" height="3" fill={eyeColor} />
          <rect x="14" y="9" width="1" height="1" fill="#fff" />
          <rect x="24" y="10" width="3" height="3" fill={eyeColor} />
          <rect x="25" y="9" width="1" height="1" fill="#fff" />
          <rect x="17" y="17" width="6" height="1" fill={eyeColor} />
          <rect x="16" y="16" width="1" height="1" fill={eyeColor} />
          <rect x="23" y="16" width="1" height="1" fill={eyeColor} />
        </>);
    }
  };

  return (
    <div className={cls} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg viewBox="0 0 40 32" width="160" height="128" style={{ imageRendering: "pixelated" }}>
        <rect x="10" y="6" width="20" height="18" fill={bodyColor} />
        <rect x="8" y="8" width="2" height="14" fill={bodyColor} />
        <rect x="30" y="8" width="2" height="14" fill={bodyColor} />
        <rect x="12" y="4" width="16" height="2" fill={bodyColor} />
        <rect x="12" y="24" width="16" height="2" fill={bodyColor} />
        <rect x="14" y="13" width="12" height="8" fill={bellyColor} />
        <rect x="16" y="12" width="8" height="1" fill={bellyColor} />
        <rect x="16" y="21" width="8" height="1" fill={bellyColor} />
        <rect x="11" y="25" width="4" height="2" fill={bodyColor} />
        <rect x="25" y="25" width="4" height="2" fill={bodyColor} />
        <rect x="10" y="27" width="2" height="1" fill={bodyColor} />
        <rect x="13" y="27" width="2" height="1" fill={bodyColor} />
        <rect x="25" y="27" width="2" height="1" fill={bodyColor} />
        <rect x="28" y="27" width="2" height="1" fill={bodyColor} />
        <rect x="14" y="3" width="3" height="2" fill={bodyColor} />
        <rect x="23" y="3" width="3" height="2" fill={bodyColor} />
        {renderEyes()}
        {(expression === "happy" || expression === "dancing") && (<>
          <rect x="10" y="14" width="2" height="1" fill="#d4887a" opacity="0.6" />
          <rect x="28" y="14" width="2" height="1" fill="#d4887a" opacity="0.6" />
        </>)}
      </svg>
    </div>
  );
};

const StatBar = ({ label, value, color, icon }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Silkscreen', monospace", fontSize: 8, color: "#2a3a2a" }}>
    <span style={{ width: 14, textAlign: "center", fontSize: 10 }}>{icon}</span>
    <span style={{ width: 44, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
    <div style={{ flex: 1, height: 6, background: "#c8d0a8", border: "1px solid #5a6a4a", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, transition: "width 0.5s ease" }} />
    </div>
    <span style={{ width: 22, textAlign: "right", fontSize: 7 }}>{value}%</span>
  </div>
);

// ─── Main App ───
export default function Wepachi() {
  const [hunger, setHunger] = useState(80);
  const [energy, setEnergy] = useState(70);
  const [happiness, setHappiness] = useState(60);
  const [statusMsg, setStatusMsg] = useState("¡Co-quí! ¡Co-quí!");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState(null);
  const [showFood, setShowFood] = useState(false);
  const [showCoffee, setShowCoffee] = useState(false);
  const [buttonFlash, setButtonFlash] = useState(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { role: "wepachi", text: "¡Wepa! Dimelo, mano. I'm your coquí. Talk to me! 🐸" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const getExpression = () => {
    if (isAnimating && animationType === "dance") return "dancing";
    if (hunger < 30) return "hungry";
    if (happiness < 30) return "bored";
    if (energy < 30) return "hungry";
    return "happy";
  };

  // Stat decay
  useEffect(() => {
    const iv = setInterval(() => {
      setHunger(h => { const n = Math.max(0, h - 2); if (n < 20 && h >= 20) setStatusMsg(randomMsg(MESSAGES.hungry)); return n; });
      setEnergy(e => { const n = Math.max(0, e - 1); if (n < 20 && e >= 20) setStatusMsg(randomMsg(MESSAGES.tired)); return n; });
      setHappiness(hp => { const n = Math.max(0, hp - 1); if (n < 20 && hp >= 20) setStatusMsg(randomMsg(MESSAGES.bored)); return n; });
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const triggerAnimation = useCallback((type, duration = 1200) => {
    setIsAnimating(true);
    setAnimationType(type);
    setTimeout(() => { setIsAnimating(false); setAnimationType(null); }, duration);
  }, []);

  const flashButton = (btn) => { setButtonFlash(btn); setTimeout(() => setButtonFlash(null), 300); };

  const handleFeed = () => {
    setHunger(h => Math.min(100, h + 25));
    setHappiness(hp => Math.min(100, hp + 5));
    setStatusMsg(randomMsg(MESSAGES.feed));
    setShowFood(true);
    triggerAnimation("eat");
    flashButton("feed");
    setTimeout(() => setShowFood(false), 1000);
  };
  const handlePlay = () => {
    setHappiness(hp => Math.min(100, hp + 30));
    setEnergy(e => Math.max(0, e - 10));
    setStatusMsg(randomMsg(MESSAGES.play));
    triggerAnimation("dance", 2000);
    flashButton("play");
  };
  const handleCoffee = () => {
    setEnergy(e => Math.min(100, e + 30));
    setHappiness(hp => Math.min(100, hp + 5));
    setStatusMsg(randomMsg(MESSAGES.coffee));
    setShowCoffee(true);
    triggerAnimation("coffee");
    flashButton("coffee");
    setTimeout(() => setShowCoffee(false), 1000);
  };

  // ─── Chat with Backend API ───
  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsLoading(true);

    // Build history: map to Anthropic format, keep last 10 msgs,
    // and ensure the array starts with a "user" role (API requirement).
    const rawHistory = [...chatMessages, userMsg].map(m => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));
    const firstUserIdx = rawHistory.findIndex(m => m.role === "user");
    const history = rawHistory.slice(firstUserIdx >= 0 ? firstUserIdx : 0).slice(-10);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          stats: { hunger, energy, happiness },
        }),
      });

      const data = await response.json();

      // Handle both success (data.content) and server-side error (data.error)
      const reply =
        data.content?.[0]?.text ||
        data.error ||
        "¡Ay bendito! I glitched. Intenta otra vez, mano.";

      setChatMessages(prev => [...prev, { role: "wepachi", text: reply }]);
      triggerAnimation("eat", 600);
      setStatusMsg(reply.length > 40 ? reply.slice(0, 40) + "..." : reply);

    } catch (err) {
      // Network-level failure (no internet, Vercel down, etc.)
      console.error("sendMessage error:", err);
      setChatMessages(prev => [
        ...prev,
        { role: "wepachi", text: "¡Ay fo! Lost the signal. Check your connection, boricua. 🐸" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const expression = getExpression();
  const isAlive = hunger > 0 || energy > 0 || happiness > 0;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      fontFamily: "'Silkscreen', monospace",
      padding: 12, gap: 14,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
        @keyframes dance{0%,100%{transform:translateX(0) rotate(0)}15%{transform:translateX(-8px) rotate(-8deg)}30%{transform:translateX(8px) rotate(8deg)}45%{transform:translateX(-6px) rotate(-6deg) scaleY(.92)}60%{transform:translateX(6px) rotate(6deg) scaleY(1.08)}75%{transform:translateX(-4px) rotate(-4deg)}90%{transform:translateX(4px) rotate(4deg)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}25%{transform:translateY(-12px) scaleX(.95)}50%{transform:translateY(0) scaleX(1.05) scaleY(.9)}75%{transform:translateY(-6px)}}
        @keyframes jolt{0%,100%{transform:translateY(0) scale(1)}10%{transform:translateY(-3px) scale(1.05)}30%{transform:translateY(-6px) scale(1.08)}50%{transform:translateY(0) scale(1.02)}70%{transform:scale(1.04)}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
        @keyframes blink-cursor{0%,50%{opacity:1}51%,100%{opacity:0}}
        @keyframes float-note{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(-20px) rotate(15deg)}}
        @keyframes pulse-dot{0%,100%{opacity:.3}50%{opacity:1}}
        .animate-dance{animation:dance .6s ease-in-out infinite}
        .animate-bounce{animation:bounce .5s ease-in-out 2}
        .animate-jolt{animation:jolt .8s ease-in-out}
        .btn-physical{border:none;cursor:pointer;font-family:'Silkscreen',monospace;font-size:9px;letter-spacing:1px;text-transform:uppercase;padding:8px 10px;border-radius:50%;width:56px;height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;transition:all .1s ease;box-shadow:0 4px 0 rgba(0,0,0,.3),0 6px 12px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.3);position:relative;top:0}
        .btn-physical:active,.btn-flash{top:3px;box-shadow:0 1px 0 rgba(0,0,0,.3),0 2px 4px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.2)}
        .btn-flash{filter:brightness(1.3)}
        .chat-scroll::-webkit-scrollbar{width:4px}
        .chat-scroll::-webkit-scrollbar-track{background:rgba(0,0,0,.1)}
        .chat-scroll::-webkit-scrollbar-thumb{background:rgba(255,107,157,.3);border-radius:2px}
      `}</style>

      {/* ═══ TOY SHELL ═══ */}
      <div style={{
        width: 320,
        background: "linear-gradient(160deg, #ff6b9d 0%, #ff8a5c 25%, #ffc75f 50%, #45c4a0 75%, #1ec8c8 100%)",
        borderRadius: 36, padding: 5,
        boxShadow: "0 20px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.3)",
      }}>
        <div style={{
          background: "linear-gradient(160deg, #e8527a 0%, #e8734f 25%, #dba84d 50%, #3aaa88 75%, #18a8a8 100%)",
          borderRadius: 32, padding: 14,
        }}>
          {/* Brand */}
          <div style={{ textAlign: "center", color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: 4, textShadow: "0 2px 4px rgba(0,0,0,.3)", marginBottom: 4 }}>WEPACHI</div>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,.7)", fontSize: 7, letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>Virtual Coquí • Boricua Edition</div>

          {/* LCD Screen */}
          <div style={{
            background: "#9aaa7c", borderRadius: 8, border: "3px solid #5a6a4a",
            padding: 10, position: "relative", overflow: "hidden",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,.3), inset 0 0 20px rgba(0,0,0,.1)",
          }}>
            {/* Scanline overlays */}
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 4px)", pointerEvents: "none", zIndex: 2 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(255,255,255,.05),transparent)", animation: "scanline 4s linear infinite", pointerEvents: "none", zIndex: 2 }} />

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 6, position: "relative", zIndex: 1 }}>
              <StatBar label="Hambre" value={hunger} color={hunger < 30 ? "#8a4a4a" : "#5a7a4a"} icon="🍽" />
              <StatBar label="Energía" value={energy} color={energy < 30 ? "#8a6a3a" : "#4a6a7a"} icon="⚡" />
              <StatBar label="Feliz" value={happiness} color={happiness < 30 ? "#7a5a6a" : "#6a5a8a"} icon="♪" />
            </div>

            {/* Character */}
            <div style={{ height: 130, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
              {isAlive ? (<>
                {showFood && <svg viewBox="0 0 16 12" width="28" height="20" style={{ imageRendering: "pixelated", position: "absolute", right: 24, top: 16 }}><rect x="2" y="3" width="12" height="6" fill="#daa520" /><rect x="4" y="2" width="8" height="1" fill="#daa520" /><rect x="4" y="9" width="8" height="1" fill="#daa520" /><rect x="5" y="4" width="6" height="4" fill="#c4761a" /></svg>}
                {showCoffee && <svg viewBox="0 0 14 16" width="24" height="28" style={{ imageRendering: "pixelated", position: "absolute", left: 24, top: 12 }}><rect x="3" y="5" width="8" height="9" fill="#f5f0e6" /><rect x="4" y="14" width="6" height="1" fill="#d4c9b0" /><rect x="2" y="15" width="10" height="1" fill="#8b7355" /><rect x="4" y="6" width="6" height="3" fill="#3e2318" /><rect x="5" y="2" width="1" height="2" fill="#a0a0a0" opacity=".5" /><rect x="8" y="1" width="1" height="3" fill="#a0a0a0" opacity=".5" /></svg>}
                <CoquiBlob expression={expression} isAnimating={isAnimating} animationType={animationType} />
                {isAnimating && animationType === "dance" && (<>
                  <span style={{ position: "absolute", top: 10, left: 30, fontSize: 14, animation: "float-note 1s ease-out infinite", color: "#3a5a3a" }}>♪</span>
                  <span style={{ position: "absolute", top: 20, right: 30, fontSize: 10, animation: "float-note 1.5s ease-out infinite .3s", color: "#3a5a3a" }}>♫</span>
                </>)}
              </>) : (
                <div style={{ textAlign: "center", color: "#3a5a3a", fontSize: 9 }}>
                  <div style={{ fontSize: 36, marginBottom: 6 }}>💀</div>
                  ¡Ay bendito! Wepachi se fue...<br /><span style={{ fontSize: 7 }}>(Refresh to revive)</span>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div style={{
              background: "#7a8a6c", borderRadius: 3, padding: "4px 8px", fontSize: 8,
              color: "#2a3a2a", textAlign: "center", minHeight: 18, display: "flex",
              alignItems: "center", justifyContent: "center", zIndex: 1, position: "relative",
              border: "1px solid #5a6a4a",
            }}>
              <span>{statusMsg}</span>
              <span style={{ animation: "blink-cursor 1s infinite", marginLeft: 2 }}>▮</span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: 12, paddingBottom: 2 }}>
            <button className={`btn-physical ${buttonFlash === "feed" ? "btn-flash" : ""}`} onClick={handleFeed} style={{ background: "linear-gradient(180deg,#ff7eb3,#e85a90)", color: "#fff" }}>
              <span style={{ fontSize: 16 }}>🫓</span><span>Feed</span>
            </button>
            <button className={`btn-physical ${buttonFlash === "play" ? "btn-flash" : ""}`} onClick={handlePlay} style={{ background: "linear-gradient(180deg,#7afcff,#45c4c8)", color: "#1a4a4a" }}>
              <span style={{ fontSize: 16 }}>💃</span><span>Play</span>
            </button>
            <button className={`btn-physical ${buttonFlash === "coffee" ? "btn-flash" : ""}`} onClick={handleCoffee} style={{ background: "linear-gradient(180deg,#ffd970,#dba84d)", color: "#5a4020" }}>
              <span style={{ fontSize: 16 }}>☕</span><span>Café</span>
            </button>
          </div>

          {/* Speaker grille */}
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 6, opacity: .4 }}>
            {[...Array(8)].map((_, i) => <div key={i} style={{ width: 2, height: 6, background: "#fff", borderRadius: 1 }} />)}
          </div>
        </div>
      </div>

      {/* ═══ CHAT PANEL ═══ */}
      <div style={{
        width: 320,
        background: "linear-gradient(160deg, rgba(232,82,122,.08) 0%, rgba(24,168,168,.08) 100%)",
        border: "2px solid rgba(255,107,157,.3)",
        borderRadius: 20,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        backdropFilter: "blur(12px)",
      }}>
        {/* Chat header */}
        <div style={{
          padding: "8px 14px",
          background: "rgba(255,107,157,.12)",
          borderBottom: "1px solid rgba(255,107,157,.15)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: isLoading ? "#ffc75f" : "#45c4a0",
            boxShadow: `0 0 6px ${isLoading ? "#ffc75f" : "#45c4a0"}`,
            transition: "all .3s ease",
          }} />
          <span style={{ fontFamily: "'Silkscreen', monospace", fontSize: 10, color: "#ff8a5c", letterSpacing: 2, textTransform: "uppercase" }}>
            Talk to Wepachi
          </span>
        </div>

        {/* Messages */}
        <div className="chat-scroll" style={{
          height: 180, overflowY: "auto", padding: "8px 10px",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          {chatMessages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "82%", padding: "6px 10px",
              borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              background: msg.role === "user"
                ? "linear-gradient(135deg, #ff6b9d, #ff8a5c)"
                : "rgba(69,196,160,.15)",
              border: msg.role === "user" ? "none" : "1px solid rgba(69,196,160,.25)",
              color: msg.role === "user" ? "#fff" : "#c8e8d8",
              fontSize: 11, fontFamily: "'Silkscreen', monospace",
              lineHeight: 1.5, wordBreak: "break-word",
            }}>
              {msg.role === "wepachi" && <span style={{ fontSize: 8, opacity: .5, display: "block", marginBottom: 2 }}>🐸 Wepachi</span>}
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div style={{
              alignSelf: "flex-start", padding: "8px 16px",
              borderRadius: "12px 12px 12px 2px",
              background: "rgba(69,196,160,.15)",
              border: "1px solid rgba(69,196,160,.25)",
              color: "#c8e8d8", fontSize: 16,
              display: "flex", gap: 3,
            }}>
              <span style={{ animation: "pulse-dot 1s infinite" }}>.</span>
              <span style={{ animation: "pulse-dot 1s infinite .2s" }}>.</span>
              <span style={{ animation: "pulse-dot 1s infinite .4s" }}>.</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          padding: "8px 10px",
          borderTop: "1px solid rgba(255,107,157,.1)",
          display: "flex", gap: 6, alignItems: "center",
        }}>
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Dimelo, boricua..."
            disabled={isLoading}
            style={{
              flex: 1, background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,107,157,.2)",
              borderRadius: 12, padding: "8px 12px",
              color: "#e8d8e8", fontSize: 11,
              fontFamily: "'Silkscreen', monospace",
              outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(255,107,157,.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,107,157,.2)"}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !chatInput.trim()}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              border: "none",
              cursor: isLoading ? "wait" : chatInput.trim() ? "pointer" : "default",
              background: chatInput.trim() ? "linear-gradient(135deg, #ff6b9d, #ff8a5c)" : "rgba(255,255,255,.08)",
              color: "#fff", fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s ease",
              opacity: chatInput.trim() ? 1 : .3,
              boxShadow: chatInput.trim() ? "0 2px 8px rgba(255,107,157,.4)" : "none",
            }}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
