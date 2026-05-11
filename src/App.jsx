import { useState, useEffect, useRef } from "react";

const TEAM = [
  {
    name: "Rahul Sharma",
    role: "Developer",
    avatar: "RS",
    color: "#00cfff",
    intro: "Rahul drives our vision, blending strategic planning with a passion for social impact. He ensures every line of code we ship moves the mission forward."
  },
  {
    name: "Virendra Chaudhary",
    role: "Developer",
    avatar: "VC",
    color: "#ff4ecd",
    intro: "The core architect of our mobile experiences. Virendra crafts smooth, pixel-perfect interfaces using React Native and Expo, bringing ideas to life on screen."
  },
];

const APP = {
  name: "Slow",
  desc: "10 minutes of stillness a day keeps anxiety and depression away. Slow is a mindfulness app built for people who are too busy to meditate — simple breathing cycles, gentle timers, and zero distractions.",
  tags: ["React Native", "Expo"],
  status: "Live",
  icon: "◈",
  stores: [
    { label: "App Store", url: "#" },
    { label: "Play Store", url: "#" },
  ],
};

const keyframes = `
@keyframes glitch {
  0%   { clip-path: inset(40% 0 61% 0); transform: translate(-2px,0); }
  20%  { clip-path: inset(92% 0 1% 0);  transform: translate(2px,0); }
  40%  { clip-path: inset(43% 0 30% 0); transform: translate(-1px,0); }
  60%  { clip-path: inset(10% 0 60% 0); transform: translate(1px,0); }
  80%  { clip-path: inset(70% 0 10% 0); transform: translate(-2px,0); }
  100% { clip-path: inset(40% 0 61% 0); transform: translate(2px,0); }
}
@keyframes flicker {
  0%,100%{opacity:1}92%{opacity:1}93%{opacity:0.4}94%{opacity:1}96%{opacity:0.7}97%{opacity:1}
}
@keyframes blink {
  0%,100%{opacity:1}50%{opacity:0}
}
@keyframes fadeUp {
  from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}
}
@keyframes borderPulse {
  0%,100%{border-color:#ff00ff33}50%{border-color:#ff00ffaa}
}
@keyframes modalIn {
  from{opacity:0;transform:scale(0.94) translateY(16px)}
  to{opacity:1;transform:scale(1) translateY(0)}
}
@keyframes neonFlicker {
  0%,100%{opacity:1}45%{opacity:1}46%{opacity:0.5}47%{opacity:1}
}
@keyframes scanMove {
  0%{top:-4px}100%{top:100%}
}
@keyframes carDrive {
  0%{transform:translateX(-380px)}
  100%{transform:translateX(calc(100vw + 380px))}
}
@keyframes carGlow {
  0%,100%{filter:drop-shadow(0 0 8px #ff00ff) drop-shadow(0 0 20px #ff00ff88);}
  50%{filter:drop-shadow(0 0 16px #00ffff) drop-shadow(0 0 40px #00ffff88);}
}
@keyframes gridScroll {
  0%{background-position:0 0}
  100%{background-position:0 80px}
}
`;

const globalCss = `
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:linear-gradient(160deg,#0a0010 0%,#10001a 40%,#000818 100%);color:#e0cfff;font-family:'Courier New',monospace;min-height:100vh}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:#0a0010}
  ::-webkit-scrollbar-thumb{background:rgba(255,0,255,0.4);border-radius:3px}
  ::-webkit-scrollbar-thumb:hover{background:rgba(255,0,255,0.7)}
  a{color:#ff00ff;text-decoration:none;transition:color 0.2s}
  a:hover{color:#00ffff}
  section{padding:100px 0}
`;

function RainCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const cols = Math.floor(W / 18);
    const drops = Array.from({ length: cols }, () => Math.random() * -H);
    const chars = "アイウエオカキクケコ01サシスセソタチツテトナニヌネノ∇∆⌬⊕{}[]<>/\\\\|=+-*&^%$#@!";
    let frame;
    function draw() {
      ctx.fillStyle = "rgba(8,0,16,0.18)";
      ctx.fillRect(0, 0, W, H);
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18;
        const bright = Math.random() > 0.97;
        const pick = Math.random();
        ctx.fillStyle = bright ? "#ffffff" : (pick > 0.85 ? "#00ffff88" : pick > 0.6 ? "#ff00ff66" : "#ffe60044");
        ctx.font = bright ? "bold 13px Courier New" : "12px Courier New";
        ctx.fillText(ch, x, y);
        drops[i] = y > H + Math.random() * 1000 ? -50 : y + 14 + Math.random() * 6;
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", onResize); };
  }, []);
  return (
    <canvas ref={ref} style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      zIndex: 0, pointerEvents: "none", opacity: 0.6,
    }} />
  );
}

function CyberpunkScene() {
  return (
    <div aria-hidden="true" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden", height: 260,
    }}>
      <svg viewBox="0 0 1440 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", position: "absolute", bottom: 0 }}>
        <defs>
          <linearGradient id="bldCp" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a0030" />
            <stop offset="100%" stopColor="#0a0010" />
          </linearGradient>
          <linearGradient id="roadGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a0030" />
            <stop offset="100%" stopColor="#0d0020" />
          </linearGradient>
          <filter id="cpGlow"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="strongGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {/* Cyberpunk buildings */}
        {[[0, 140, 60, 120, "#ff00ff"], [55, 110, 45, 150, "#00ffff"], [95, 125, 55, 135, "#ff00ff"], [145, 95, 40, 165, "#ffe600"], [180, 115, 50, 145, "#00ffff"], [225, 100, 60, 160, "#ff00ff"], [280, 120, 45, 140, "#00ffff"], [320, 90, 55, 170, "#ff00ff"], [370, 105, 65, 155, "#ffe600"], [430, 115, 50, 145, "#00ffff"], [475, 95, 60, 165, "#ff00ff"], [530, 110, 45, 150, "#00ffff"], [570, 100, 55, 160, "#ffe600"], [620, 88, 50, 172, "#ff00ff"], [665, 115, 65, 145, "#00ffff"], [725, 98, 50, 162, "#ff00ff"], [770, 110, 60, 150, "#ffe600"], [825, 95, 55, 165, "#00ffff"], [875, 105, 65, 155, "#ff00ff"], [935, 90, 50, 170, "#ffe600"], [980, 115, 60, 145, "#00ffff"], [1035, 100, 55, 160, "#ff00ff"], [1085, 88, 65, 172, "#ffe600"], [1145, 110, 50, 150, "#00ffff"], [1190, 95, 60, 165, "#ff00ff"], [1245, 105, 55, 155, "#ffe600"], [1295, 115, 70, 145, "#00ffff"], [1360, 90, 80, 170, "#ff00ff"]].map(([x, y, w, h, c], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={260 - y} fill="url(#bldCp)" />
            <rect x={x} y={y} width={w} height={2} fill={c} opacity="0.9" filter="url(#cpGlow)" />
            <rect x={x} y={y} width={2} height={260 - y} fill={c} opacity="0.3" />
            <rect x={x + w - 2} y={y} width={2} height={260 - y} fill={c} opacity="0.3" />
            {[0, 1, 2].map(j => (<rect key={j} x={x + 6} y={y + 20 + j * 28} width={w - 12} height={10} fill={c} opacity="0.15" rx="1" />))}
          </g>
        ))}
        {/* Road surface */}
        <polygon points="500,200 940,200 1440,260 0,260" fill="url(#roadGrad)" />
        {/* Road center lines — perspective */}
        <line x1="720" y1="200" x2="720" y2="260" stroke="#ffe600" strokeWidth="3" opacity="0.8" filter="url(#cpGlow)" strokeDasharray="18 14" />
        {/* Road edge lines */}
        <line x1="500" y1="200" x2="0" y2="260" stroke="#ff00ff" strokeWidth="2" opacity="0.7" filter="url(#cpGlow)" />
        <line x1="940" y1="200" x2="1440" y2="260" stroke="#ff00ff" strokeWidth="2" opacity="0.7" filter="url(#cpGlow)" />
        {/* Horizon glow */}
        <rect x="0" y="198" width="1440" height="4" fill="#ff00ff" opacity="0.6" filter="url(#strongGlow)" />
        {/* Ground glow */}
        <rect x="0" y="255" width="1440" height="5" fill="#00ffff" opacity="0.5" filter="url(#cpGlow)" />
      </svg>

      {/* 3D Grid floor overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 62,
        background: "repeating-linear-gradient(90deg,rgba(255,0,255,0.12) 0px,transparent 1px,transparent 40px,rgba(255,0,255,0.12) 40px)",
        maskImage: "linear-gradient(to top,black 0%,transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top,black 0%,transparent 100%)",
        animation: "gridScroll 1.2s linear infinite",
      }} />

      {/* Animated cyberpunk car - Herrera Outlaw inspired */}
      <div style={{
        position: "absolute", bottom: 18, left: 0,
        animation: "carDrive 9s linear infinite",
      }}>
        <svg width="340" height="100" viewBox="0 0 340 100" style={{ animation: "carGlow 2s ease-in-out infinite", overflow: "visible" }}>
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b1a4a" />
              <stop offset="40%" stopColor="#a0204f" />
              <stop offset="70%" stopColor="#3a6080" />
              <stop offset="100%" stopColor="#1a3050" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a4a6a" />
              <stop offset="100%" stopColor="#0d1a28" />
            </linearGradient>
            <radialGradient id="wheelRim" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4aa60" />
              <stop offset="60%" stopColor="#a07830" />
              <stop offset="100%" stopColor="#604010" />
            </radialGradient>
            <radialGradient id="headlightGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffe060" />
            </radialGradient>
            <filter id="neonBloom"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="softGlow"><feGaussianBlur stdDeviation="1.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Headlight cone beam */}
          <polygon points="318,42 400,20 400,70" fill="url(#headlightGrad)" opacity="0.12" />

          {/* === CAR BODY === */}
          {/* Main lower body - long and wide */}
          <path d="M18,58 L18,45 Q20,40 28,38 L295,38 Q308,38 318,45 L322,58 Z" fill="url(#bodyGrad)" />

          {/* Body highlight line */}
          <path d="M25,42 L300,42" stroke="rgba(255,200,200,0.25)" strokeWidth="1.5" fill="none" />

          {/* Side skirt / rocker panel */}
          <rect x="30" y="58" width="270" height="6" rx="2" fill="#2a0818" />
          <rect x="30" y="58" width="270" height="1.5" fill="#ff00ff" opacity="0.7" filter="url(#softGlow)" />

          {/* === FASTBACK ROOFLINE === */}
          {/* Roofline - swooping fastback shape */}
          <path d="M75,38 Q88,15 108,10 L210,10 Q225,10 240,16 Q258,24 270,38 Z" fill="url(#roofGrad)" stroke="#3a6080" strokeWidth="1" />

          {/* Windshield - angled */}
          <path d="M108,10 L116,38 L170,38 L170,10 Z" fill="rgba(100,200,255,0.12)" stroke="#00cfff" strokeWidth="0.8" />

          {/* Rear window / fastback glass */}
          <path d="M185,10 L240,16 L258,38 L185,38 Z" fill="rgba(60,140,200,0.1)" stroke="#3a7090" strokeWidth="0.8" />

          {/* Hood vents - 4 vertical slats */}
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={260 + i * 8} y={30} width={4} height={10} rx={1} fill="#0a0018" stroke="#5a3060" strokeWidth="0.6" />
          ))}

          {/* Roof trim chrome strip */}
          <path d="M108,10 L210,10" stroke="#c0a050" strokeWidth="2" fill="none" />

          {/* Door panel lines */}
          <path d="M135,38 L130,58" stroke="rgba(120,60,80,0.6)" strokeWidth="1" fill="none" />
          <path d="M200,38 L195,58" stroke="rgba(120,60,80,0.6)" strokeWidth="1" fill="none" />

          {/* Door handle lines */}
          <rect x="145" y="46" width="20" height="3" rx="1.5" fill="#c0a050" opacity="0.8" />
          <rect x="210" y="46" width="20" height="3" rx="1.5" fill="#c0a050" opacity="0.8" />

          {/* === FRONT SECTION === */}
          {/* Front bumper / fascia */}
          <path d="M295,38 L322,58 L322,65 L290,65 L282,58 L295,38 Z" fill="#1a0a18" />

          {/* Chrome grille - front */}
          <rect x="296" y="45" width="24" height="16" rx="2" fill="#0a0010" stroke="#c0a050" strokeWidth="1.2" />
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1="296" y1={47 + i * 3} x2="320" y2={47 + i * 3} stroke="#c0a050" strokeWidth="0.6" opacity="0.8" />
          ))}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={i} x1={298 + i * 4} y1="45" x2={298 + i * 4} y2="61" stroke="#c0a050" strokeWidth="0.5" opacity="0.5" />
          ))}

          {/* Headlights */}
          <rect x="309" y="40" width="14" height="7" rx="2" fill="url(#headlightGrad)" opacity="0.95" filter="url(#neonBloom)" />
          <rect x="309" y="40" width="14" height="7" rx="2" fill="#ffe060" opacity="0.3" />

          {/* === REAR SECTION === */}
          {/* Rear bumper */}
          <path d="M18,38 L18,65 L28,65 L36,58 L28,38 Z" fill="#180810" />

          {/* Tail lights - horizontal bar */}
          <rect x="18" y="43" width="14" height="5" rx="1" fill="#ff1020" opacity="0.9" filter="url(#softGlow)" />
          <rect x="18" y="50" width="14" height="3" rx="1" fill="#ff4040" opacity="0.5" />

          {/* Exhaust tips */}
          <ellipse cx="24" cy="64" rx="4" ry="2.5" fill="#0a0010" stroke="#c0a050" strokeWidth="1" />
          <ellipse cx="32" cy="64" rx="4" ry="2.5" fill="#0a0010" stroke="#c0a050" strokeWidth="1" />

          {/* Neon underglow */}
          <path d="M30,64 L295,64" stroke="#ff00ff" strokeWidth="2.5" opacity="0.85" filter="url(#neonBloom)" />

          {/* === TRIPLE WHEELS - spinning with animateTransform === */}
          {/* Wheel 1 - rear most */}
          <circle cx="62" cy="68" r="20" fill="#111" stroke="#c0a050" strokeWidth="2.5" />
          <circle cx="62" cy="68" r="15" fill="#0a0010" stroke="#a07830" strokeWidth="1.5" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 62 68" to="360 62 68" dur="0.6s" repeatCount="indefinite" />
            <line x1="62" y1="54" x2="62" y2="82" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="48" y1="68" x2="76" y2="68" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="52" y1="58" x2="72" y2="78" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="72" y1="58" x2="52" y2="78" stroke="#c0a050" strokeWidth="1.8" />
          </g>
          <circle cx="62" cy="68" r="5" fill="url(#wheelRim)" stroke="#ffe060" strokeWidth="1" />
          <circle cx="62" cy="68" r="2" fill="#d4aa60" />

          {/* Wheel 2 - mid rear axle */}
          <circle cx="105" cy="68" r="20" fill="#111" stroke="#c0a050" strokeWidth="2.5" />
          <circle cx="105" cy="68" r="15" fill="#0a0010" stroke="#a07830" strokeWidth="1.5" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 105 68" to="360 105 68" dur="0.6s" repeatCount="indefinite" />
            <line x1="105" y1="54" x2="105" y2="82" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="91" y1="68" x2="119" y2="68" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="95" y1="58" x2="115" y2="78" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="115" y1="58" x2="95" y2="78" stroke="#c0a050" strokeWidth="1.8" />
          </g>
          <circle cx="105" cy="68" r="5" fill="url(#wheelRim)" stroke="#ffe060" strokeWidth="1" />
          <circle cx="105" cy="68" r="2" fill="#d4aa60" />

          {/* Wheel 3 - front */}
          <circle cx="265" cy="68" r="20" fill="#111" stroke="#c0a050" strokeWidth="2.5" />
          <circle cx="265" cy="68" r="15" fill="#0a0010" stroke="#a07830" strokeWidth="1.5" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 265 68" to="360 265 68" dur="0.6s" repeatCount="indefinite" />
            <line x1="265" y1="54" x2="265" y2="82" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="251" y1="68" x2="279" y2="68" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="255" y1="58" x2="275" y2="78" stroke="#c0a050" strokeWidth="1.8" />
            <line x1="275" y1="58" x2="255" y2="78" stroke="#c0a050" strokeWidth="1.8" />
          </g>
          <circle cx="265" cy="68" r="5" fill="url(#wheelRim)" stroke="#ffe060" strokeWidth="1" />
          <circle cx="265" cy="68" r="2" fill="#d4aa60" />

          {/* Wheel arches */}
          <path d="M38,58 Q62,36 86,58" fill="none" stroke="#8b1a4a" strokeWidth="2" />
          <path d="M80,58 Q105,36 130,58" fill="none" stroke="#8b1a4a" strokeWidth="2" />
          <path d="M240,58 Q265,36 290,58" fill="none" stroke="#3a6080" strokeWidth="2" />

          {/* Chrome trim on arches */}
          <path d="M40,57 Q62,37 84,57" fill="none" stroke="#c0a050" strokeWidth="0.8" opacity="0.6" />
          <path d="M82,57 Q105,37 128,57" fill="none" stroke="#c0a050" strokeWidth="0.8" opacity="0.6" />
          <path d="M242,57 Q265,37 288,57" fill="none" stroke="#c0a050" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}

function Scanline() {
  return (
    <div aria-hidden="true" style={{
      position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
      background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,0,255,0.012) 3px,rgba(255,0,255,0.012) 4px)",
    }}>
      <div style={{
        position: "absolute", left: 0, right: 0, height: 4,
        background: "linear-gradient(transparent,rgba(255,0,255,0.06),transparent)",
        animation: "scanMove 5s linear infinite",
      }} />
    </div>
  );
}

function MissionModal({ onClose }) {
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const corners = [{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(2,5,15,0.95)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", backdropFilter: "blur(12px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#040a18",
        border: "1px solid rgba(255,0,255,0.5)",
        borderRadius: 6, maxWidth: 680, width: "100%",
        padding: "44px 48px", position: "relative",
        animation: "modalIn 0.3s ease both",
        boxShadow: "0 0 80px rgba(255,0,255,0.15),0 0 160px rgba(0,255,255,0.1)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        {corners.map((s, i) => (
          <div key={i} aria-hidden="true" style={{
            position: "absolute", ...s, width: 20, height: 20,
            borderTop: i < 2 ? "2px solid rgba(255,0,255,0.6)" : "none",
            borderBottom: i >= 2 ? "2px solid rgba(255,0,255,0.6)" : "none",
            borderLeft: i % 2 === 0 ? "2px solid rgba(255,0,255,0.6)" : "none",
            borderRight: i % 2 === 1 ? "2px solid rgba(255,0,255,0.6)" : "none",
          }} />
        ))}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 20,
          background: "none", border: "none", color: "#7050a0",
          fontSize: 24, cursor: "pointer", fontFamily: "'Courier New',monospace", transition: "color 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.color = "#ff00ff"}
          onMouseLeave={e => e.currentTarget.style.color = "#7050a0"}>✕</button>

        <p style={{ fontSize: 10, letterSpacing: 5, color: "#00ffff", textTransform: "uppercase", marginBottom: 10 }}>// our.mission</p>
        <h2 style={{ fontSize: 30, color: "#ff00ff", fontFamily: "'Courier New',monospace", marginBottom: 6, lineHeight: 1.25, animation: "neonFlicker 4s infinite" }}>
          Code for change.<br /><span style={{ color: "#00ffff" }}>Apps for the future.</span>
        </h2>
        <div style={{ width: 40, height: 2, background: "#ff00ff", margin: "20px 0" }} />

        <p style={{ fontSize: 14, color: "#e0b0ff", lineHeight: 2, marginBottom: 16 }}>
          At Studio91, we believe technology should do more than make money — it should <strong style={{ color: "#ff00ff" }}>mean something.</strong> That's why we've committed a portion of every rupee earned through our apps toward one cause: <strong style={{ color: "#00ffff" }}>education for underprivileged children across India.</strong>
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginTop: 24, marginBottom: 24 }}>
          {[
            { icon: "[01]", label: "Education First", desc: "School kits, books & stationery for every child we reach" },
            { icon: "[02]", label: "Digital Access", desc: "Laptops & tablets bridging the digital divide" },
            { icon: "[03]", label: "Code Workshops", desc: "Teaching kids to build the next Studio91" },
          ].map((p, i) => (
            <div key={i} style={{ background: "rgba(255,0,255,0.05)", padding: "16px", border: "1px solid rgba(255,0,255,0.2)", borderRadius: 4 }}>
              <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{p.icon}</span>
              <p style={{ fontSize: 13, color: "#ff00ff", fontWeight: 700, marginBottom: 4 }}>{p.label}</p>
              <p style={{ fontSize: 12, color: "#7050a0", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: "#7050a0", letterSpacing: 1, fontStyle: "italic", borderTop: "1px solid rgba(255,0,255,0.1)", paddingTop: 20 }}>
          "The best code we'll ever write isn't in our repos — it's in the futures these kids build for themselves."
          <span style={{ display: "block", color: "rgba(255,0,255,0.6)", marginTop: 8 }}>— Studio91 Founders</span>
        </p>
      </div>
    </div>
  );
}

function NavBar({ active, onMission }) {
  const links = ["home", "about", "apps", "team", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(8,0,14,0.88)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,0,255,0.15)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5vw", height: 64,
      boxShadow: "0 4px 40px rgba(0,0,0,0.6)"
    }}>
      {/* Logo wordmark — D is horizontally mirrored for a refined mark */}
      <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: 3, fontFamily: "'Courier New',monospace", display: "flex", alignItems: "center", gap: 0 }}>
        <span style={{ color: "#ff00ff", textShadow: "0 0 12px rgba(255,0,255,0.6)" }}>STU</span>
        <span style={{ color: "#ff00ff", display: "inline-block", transform: "scaleX(-1)", textShadow: "0 0 12px rgba(255,0,255,0.6)" }}>D</span>
        <span style={{ color: "#ff00ff", textShadow: "0 0 12px rgba(255,0,255,0.6)" }}>IO</span>
        <span style={{ color: "#00ffff", textShadow: "0 0 12px rgba(0,255,255,0.6)", marginLeft: 4 }}>91</span>
        <span style={{ display: "inline-block", width: 9, height: 17, background: "#ff00ff", marginLeft: 6, animation: "blink 1s step-end infinite", verticalAlign: "middle", boxShadow: "0 0 10px #ff00ff" }} />
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {links.map(l => (
          <a key={l} href={`#${l}`} style={{
            fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600,
            color: active === l ? "#ff00ff" : "#7050a0",
            borderBottom: active === l ? "2px solid #ff00ff" : "2px solid transparent",
            paddingBottom: 4, transition: "color 0.2s, text-shadow 0.2s",
            textShadow: active === l ? "0 0 8px rgba(255,0,255,0.5)" : "none"
          }}
            onMouseEnter={e => { if (active !== l) e.currentTarget.style.color = "#00ffff"; }}
            onMouseLeave={e => { if (active !== l) e.currentTarget.style.color = "#7050a0"; }}
          >{l}</a>
        ))}
        <button onClick={onMission} style={{
          padding: "8px 20px",
          background: "rgba(255,0,255,0.08)",
          border: "1px solid rgba(255,0,255,0.5)",
          color: "#ff00ff", fontFamily: "'Courier New',monospace",
          fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700,
          cursor: "pointer", borderRadius: 4,
          transition: "all 0.3s", animation: "neonFlicker 5s infinite",
          boxShadow: "0 0 15px rgba(255,0,255,0.2)"
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#ff00ff"; e.currentTarget.style.color = "#08000e"; e.currentTarget.style.boxShadow = "0 0 25px rgba(255,0,255,0.6)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,0,255,0.08)"; e.currentTarget.style.color = "#ff00ff"; e.currentTarget.style.boxShadow = "0 0 15px rgba(255,0,255,0.2)"; }}>
          ◈ Mission
        </button>
      </div>
    </nav>
  );
}

function GlitchText({ text, children, size = 56, color = "#00ff9f" }) {
  const content = children || text;
  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 1 }}>
      <span style={{ fontSize: size, fontWeight: 900, color, letterSpacing: -1, fontFamily: "'Courier New',monospace", animation: "flicker 6s infinite", textShadow: `0 0 20px ${color}` }}>{content}</span>
      <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, fontSize: size, fontWeight: 900, color: "#ff4ecd", letterSpacing: -1, fontFamily: "'Courier New',monospace", animation: "glitch 2.5s infinite linear", opacity: 0.7, textShadow: "0 0 10px #ff4ecd", whiteSpace: "nowrap" }}>{content}</span>
      <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, fontSize: size, fontWeight: 900, color: "#00cfff", letterSpacing: -1, fontFamily: "'Courier New',monospace", animation: "glitch 3.2s infinite linear reverse", opacity: 0.6, textShadow: "0 0 10px #00cfff", whiteSpace: "nowrap" }}>{content}</span>
    </div>
  );
}

function Card({ children, style = {}, pulse = false }) {
  return (
    <div style={{
      background: "rgba(4,10,24,0.85)",
      border: "1px solid rgba(255,0,255,0.2)",
      borderRadius: 6, padding: "32px 28px",
      animation: pulse ? "borderPulse 3s ease-in-out infinite" : "none",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      ...style,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,0,255,0.6)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(255,0,255,0.15)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,0,255,0.2)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)"; e.currentTarget.style.transform = "translateY(0)"; }}>
      {children}
    </div>
  );
}

function Tag({ label, color = "#00ff9f" }) {
  return <span style={{ fontSize: 11, letterSpacing: 1.5, padding: "4px 12px", border: `1px solid ${color}55`, color, borderRadius: 20, textTransform: "uppercase", fontFamily: "'Courier New',monospace", background: `rgba(255,0,255,0.05)` }}>{label}</span>;
}

function StatusBadge({ status }) {
  const map = { Live: "#00ffff", Beta: "#00cfff", "In Dev": "#ff4ecd" };
  const c = map[status] || "#888";
  return <span style={{ fontSize: 11, letterSpacing: 2, color: c, display: "flex", alignItems: "center", gap: 6, fontWeight: 700, background: `${c}15`, padding: "4px 12px", borderRadius: 20, border: `1px solid ${c}44` }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block", boxShadow: `0 0 8px ${c}` }} />{status}</span>;
}

function SectionLabel({ label }) {
  return (
    <div style={{ marginBottom: 60 }}>
      <p style={{ fontSize: 13, letterSpacing: 6, color: "rgba(255,0,255,0.6)", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>// {label}</p>
      <div style={{ height: 1, background: "linear-gradient(90deg, rgba(255,0,255,0.4), transparent)", width: "100%", maxWidth: 400 }} />
    </div>
  );
}

function TerminalInput({ label, type = "text", rows, ...props }) {
  const baseStyle = {
    width: "100%", background: "rgba(4,10,24,0.6)", border: "1px solid rgba(255,0,255,0.3)",
    color: "#e0b0ff", padding: "14px 16px", fontFamily: "'Courier New',monospace", fontSize: 14,
    borderRadius: 4, outline: "none", transition: "all 0.3s",
  };
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: "block", fontSize: 12, color: "#ff00ff", marginBottom: 8, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>&gt; {label}</label>
      {rows ? (
        <textarea rows={rows} style={{ ...baseStyle, resize: "vertical" }} onFocus={e => e.currentTarget.style.borderColor = "#00ffff"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,0,255,0.3)"} {...props} />
      ) : (
        <input type={type} style={baseStyle} onFocus={e => e.currentTarget.style.borderColor = "#00ffff"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,0,255,0.3)"} {...props} />
      )}
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formMsg, setFormMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormMsg("// Error: Please fill all required fields.");
      return;
    }

    setFormMsg("// Sending message...");

    try {
      const response = await fetch("https://formsubmit.co/ajax/calmreader34@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Contact Request from ${name}`
        })
      });

      if (response.ok) {
        setFormMsg("// Success: Message dispatched. We'll be in touch soon.");
        setName(""); setEmail(""); setMessage("");
      } else {
        setFormMsg("// Error: Could not send message. Please try again.");
      }
    } catch (error) {
      setFormMsg("// Error: Network error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TerminalInput label="Your Name" value={name} onChange={e => setName(e.target.value)} required />
      <TerminalInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <TerminalInput label="Message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required />

      <button type="submit" style={{ width: "100%", padding: "16px 0", background: "rgba(255,0,255,0.05)", border: "1px solid #ff00ff", color: "#ff00ff", fontFamily: "'Courier New',monospace", fontSize: 14, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer", borderRadius: 4, transition: "all 0.3s", fontWeight: 700, boxShadow: "0 0 20px rgba(255,0,255,0.1)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#ff00ff"; e.currentTarget.style.color = "#020a05"; e.currentTarget.style.boxShadow = "0 0 30px rgba(255,0,255,0.4)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,0,255,0.05)"; e.currentTarget.style.color = "#ff00ff"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,0,255,0.1)"; }}>
        {formMsg && formMsg.includes("Success") ? ">_ Message Sent" : ">_ Send Message"}
      </button>
      {formMsg && <p style={{ fontSize: 13, color: formMsg.includes("Error") ? "#ff00ff" : "#00ffff", marginTop: 16, letterSpacing: 1, fontWeight: 600 }}>{formMsg}</p>}
    </form>
  );
}

export default function Studio91() {
  const [active, setActive] = useState("home");
  const [typed, setTyped] = useState("");
  const [missionOpen, setMissionOpen] = useState(false);
  const full = "One studio. One app. One mission.";

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { setTyped(full.slice(0, i)); i++; if (i > full.length) clearInterval(iv); }, 42);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "apps", "team", "contact"];
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); }, { threshold: 0.35 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const W = { maxWidth: 1140, margin: "0 auto", padding: "0 5vw", position: "relative", zIndex: 10 };

  return (
    <>
      <style>{keyframes}{globalCss}</style>
      <RainCanvas />
      <CyberpunkScene />
      <Scanline />
      {missionOpen && <MissionModal onClose={() => setMissionOpen(false)} />}
      <NavBar active={active} onMission={() => setMissionOpen(true)} />

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", position: "relative",
        background: "radial-gradient(ellipse 70% 60% at 30% 90%,rgba(255,0,255,0.12) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 20%,rgba(0,255,255,0.08) 0%,transparent 50%),radial-gradient(ellipse 50% 50% at 50% 50%,rgba(255,230,0,0.04) 0%,transparent 60%)",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,0,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,255,0.06) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%,black,transparent)",
        }} />
        {[{ top: 92, left: "5vw" }, { top: 92, right: "5vw" }].map((s, i) => (
          <div key={i} aria-hidden="true" style={{ position: "absolute", ...s, width: 100, height: 100, borderTop: "2px solid rgba(255,0,255,0.4)", borderLeft: i === 0 ? "2px solid rgba(255,0,255,0.4)" : "none", borderRight: i === 1 ? "2px solid rgba(255,0,255,0.4)" : "none" }} />
        ))}
        <div style={{ ...W, animation: "fadeUp 1s ease both" }}>
          <p style={{ fontSize: 13, letterSpacing: 8, color: "#00ffff", marginBottom: 24, textTransform: "uppercase", fontWeight: 700, textShadow: "0 0 12px rgba(0,255,255,0.6)" }}>&gt;_ Initialising Studio91.exe ...</p>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <GlitchText size={84} color="#ff00ff">
              STU<span style={{ display: "inline-block", transform: "scaleX(-1)" }}>D</span>IO
            </GlitchText>
            <GlitchText text="91" size={84} color="#00ffff" />
          </div>
          <div style={{ marginTop: 32, fontSize: 26, color: "#e0b0ff", fontFamily: "'Courier New',monospace", minHeight: 40, fontWeight: 600, textShadow: "0 0 12px rgba(224,176,255,0.4)" }}>
            {typed}<span style={{ animation: "blink 0.8s step-end infinite", opacity: typed.length < full.length ? 1 : 0 }}>|</span>
          </div>
          <p style={{ marginTop: 20, fontSize: 16, color: "#b090c0", maxWidth: 600, lineHeight: 2, fontWeight: 500 }}>
            A lean indie studio crafting polished mobile experiences with <strong style={{ color: "#ff00ff" }}>React Native</strong> &amp; <strong style={{ color: "#00ffff" }}>Expo</strong> — from Jodhpur to the world. Every app we ship funds education for kids who deserve a shot at the future.
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
            <a href="#apps" style={{ padding: "14px 32px", background: "#ff00ff", color: "#0a0010", fontFamily: "'Courier New',monospace", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontWeight: 900, borderRadius: 4, transition: "all 0.3s", boxShadow: "0 0 24px rgba(255,0,255,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(255,0,255,0.8)"; e.currentTarget.style.background = "#ff40ff"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(255,0,255,0.5)"; e.currentTarget.style.background = "#ff00ff"; }}>View Apps</a>
            <button onClick={() => setMissionOpen(true)} style={{ padding: "14px 32px", background: "rgba(255,230,0,0.05)", border: "2px solid rgba(255,230,0,0.7)", color: "#ffe600", fontFamily: "'Courier New',monospace", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, cursor: "pointer", borderRadius: 4, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,230,0,0.15)"; e.currentTarget.style.borderColor = "#ffe600"; e.currentTarget.style.boxShadow = "0 0 24px rgba(255,230,0,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,230,0,0.05)"; e.currentTarget.style.borderColor = "rgba(255,230,0,0.7)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>◈ Our Mission</button>
            <a href="#contact" style={{ padding: "14px 32px", border: "2px solid rgba(0,255,255,0.5)", color: "#00ffff", background: "rgba(0,255,255,0.05)", fontFamily: "'Courier New',monospace", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, borderRadius: 4, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffff"; e.currentTarget.style.background = "rgba(0,255,255,0.12)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,255,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.5)"; e.currentTarget.style.background = "rgba(0,255,255,0.05)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>Get In Touch</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "rgba(10,0,16,0.98)", position: "relative", zIndex: 10 }}>
        <div style={W}>
          <SectionLabel label="About the Studio" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: 40, color: "#ff00ff", fontFamily: "'Courier New',monospace", marginBottom: 24, lineHeight: 1.2, textShadow: "0 0 20px rgba(255,0,255,0.5)" }}>Built by builders,<br /><span style={{ color: "#00ffff" }}>not boardrooms.</span></h2>
              <p style={{ fontSize: 16, color: "#c0a0e0", lineHeight: 2, marginBottom: 20 }}>Studio91 is a two-person indie studio from Jodhpur. We don't have investors, a growth team, or a ping-pong table. We have laptops, strong chai, and a genuine desire to build things that matter.</p>
              <p style={{ fontSize: 16, color: "#7050a0", lineHeight: 2, marginBottom: 28 }}>Right now we're heads-down on our first app — Slow. When the profits come, a real chunk goes toward education for underprivileged kids. That's the whole plan. Simple, honest, ours.</p>
              <div style={{ borderLeft: "3px solid #ff00ff", paddingLeft: 20, marginTop: 8 }}>
                <p style={{ fontSize: 14, color: "#e0b0ff", fontStyle: "italic", lineHeight: 1.9 }}>
                  "We're not trying to be the next unicorn. We're trying to build one great product and use it to do some good."
                </p>
                <p style={{ fontSize: 12, color: "#7050a0", marginTop: 8, letterSpacing: 1 }}>— Rahul & Virendra, Studio91</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "//", label: "Shipped", desc: "Our first app, Slow, is live on the App Store and Play Store.", c: "#ff00ff" },
                { icon: "◇", label: "Bootstrapped", desc: "No funding. No investors. Just two people building something real.", c: "#00ffff" },
                { icon: "◈", label: "Purpose-driven", desc: "Profits from every app go toward educating underprivileged children.", c: "#ffe600" },
                { icon: "⬡", label: "Indie at heart", desc: "Small team, low overhead, high craft. We ship what we believe in.", c: "#ff00ff" },
              ].map(({ icon, label, desc, c }) => (
                <Card key={label} style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "20px 24px" }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 14, color: c, fontWeight: 800, marginBottom: 4, letterSpacing: 1 }}>{label}</p>
                    <p style={{ fontSize: 13, color: "#7050a0", lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPS */}
      <section id="apps" style={{ position: "relative", zIndex: 10 }}>
        <div style={W}>
          <SectionLabel label="Our First App" />
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <Card pulse style={{ padding: "48px 40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <span style={{ fontSize: 56 }}>{APP.icon}</span>
                <StatusBadge status={APP.status} />
              </div>
              <h3 style={{ fontSize: 36, color: "#ff00ff", fontFamily: "'Courier New',monospace", marginBottom: 16, textShadow: "0 0 15px rgba(255,0,255,0.4)" }}>{APP.name}</h3>
              <p style={{ fontSize: 16, color: "#c0a0e0", lineHeight: 1.9, marginBottom: 28 }}>{APP.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>{APP.tags.map(t => <Tag key={t} label={t} color="#ff00ff" />)}</div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {APP.stores.map(s => (
                  <a key={s.label} href={s.url} style={{ padding: "12px 28px", background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.5)", color: "#ff00ff", fontFamily: "'Courier New',monospace", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, borderRadius: 4, transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#ff00ff"; e.currentTarget.style.color = "#0a0010"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,0,255,0.08)"; e.currentTarget.style.color = "#ff00ff"; }}>
                    ↗ {s.label}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ background: "rgba(2,5,15,0.98)", position: "relative", zIndex: 10 }}>
        <div style={W}>
          <SectionLabel label="The Team" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
            {TEAM.map(m => (
              <Card key={m.name} style={{ textAlign: "center", padding: "40px 32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, background: m.color, opacity: 0.08, filter: "blur(40px)", borderRadius: "50%" }} />
                <div style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 24px", border: `2px solid ${m.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, color: m.color, background: `${m.color}15`, boxShadow: `0 0 30px ${m.color}44` }}>{m.avatar}</div>
                <p style={{ fontSize: 22, color: "#ffffff", fontWeight: 900, marginBottom: 8 }}>{m.name}</p>
                <p style={{ fontSize: 13, letterSpacing: 2, color: m.color, textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>{m.role}</p>
                <div style={{ width: 40, height: 2, background: `${m.color}55`, margin: "0 auto 20px" }} />
                <p style={{ fontSize: 14, color: "#a1b5a8", lineHeight: 1.8, fontWeight: 500 }}>{m.intro}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "rgba(2,5,15,0.98)", position: "relative", zIndex: 10 }}>
        <div style={{ ...W, maxWidth: 760 }}>
          <SectionLabel label="Contact" />
          <h2 style={{ fontSize: 38, color: "#ff00ff", fontFamily: "'Courier New',monospace", marginBottom: 16, textShadow: "0 0 20px rgba(255,0,255,0.4)" }}>Say hello.</h2>
          <p style={{ fontSize: 16, color: "#7050a0", lineHeight: 1.8, marginBottom: 40 }}>We're two people in a studio — no ticketing system, no support team. Just a real inbox. Whether it's feedback on Slow, a collab idea, or just a note of support — we read everything and reply personally.</p>
          <Card style={{ padding: "40px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
            <ContactForm />
          </Card>
          <div style={{ display: "flex", gap: 40, marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(0,255,159,0.15)" }}>
            {[{ label: "Email", val: "hello@studio91.dev" }, { label: "GitHub", val: "github.com/studio91" }, { label: "Twitter", val: "@studio91dev" }].map(({ label, val }) => (
              <div key={label}>
                <p style={{ fontSize: 11, letterSpacing: 4, color: "rgba(0,255,159,0.4)", textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>{label}</p>
                <p style={{ fontSize: 15, color: "#a1f2c2", fontWeight: 600 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,0,255,0.2)", padding: "32px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10, background: "rgba(8,0,14,0.99)", boxShadow: "0 -4px 30px rgba(255,0,255,0.08)" }}>
        <span style={{ fontSize: 12, color: "#ff00ff", letterSpacing: 3, fontWeight: 700, textShadow: "0 0 8px rgba(255,0,255,0.4)" }}>STUDIO<span style={{ color: "#00ffff" }}>91</span> © 2025</span>
        <span style={{ fontSize: 12, color: "#7050a0", letterSpacing: 2, fontWeight: 600 }}>Code with purpose · Apps for change</span>
      </footer>
    </>
  );
}
