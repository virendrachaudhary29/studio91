const fs = require('fs');

const part1 = `import { useState, useEffect, useRef } from "react";

const TEAM = [
  { name: "Rahul Sharma", role: "Co-founder · CEO", avatar: "RS", color: "#00cfff", intro: "Rahul drives our vision, blending strategic planning with a passion for social impact. He ensures every line of code we ship moves the mission forward." },
  { name: "Virendra Chaudhary", role: "Co-founder · React Native Dev", avatar: "VC", color: "#ff4ecd", intro: "The core architect of our mobile experiences. Virendra crafts smooth, pixel-perfect interfaces using React Native and Expo, bringing ideas to life on screen." },
];

const APP = {
  name: "Slow", icon: "🧘\\u200d♂️", status: "Live",
  desc: "10 minutes of stillness a day keeps anxiety and depression away. Slow is a mindfulness app built for people who are too busy to meditate — simple breathing cycles, gentle timers, and zero distractions.",
  tags: ["React Native", "Expo"],
  stores: [{ label: "App Store", url: "#" }, { label: "Play Store", url: "#" }],
};

const KF = \`
@keyframes glitch{0%{clip-path:inset(40% 0 61% 0);transform:translate(-2px,0)}20%{clip-path:inset(92% 0 1% 0);transform:translate(2px,0)}40%{clip-path:inset(43% 0 30% 0);transform:translate(-1px,0)}60%{clip-path:inset(10% 0 60% 0);transform:translate(1px,0)}80%{clip-path:inset(70% 0 10% 0);transform:translate(-2px,0)}100%{clip-path:inset(40% 0 61% 0);transform:translate(2px,0)}}
@keyframes flicker{0%,100%{opacity:1}92%{opacity:1}93%{opacity:.4}94%{opacity:1}96%{opacity:.7}97%{opacity:1}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes borderPulse{0%,100%{border-color:#ff00ff33}50%{border-color:#ff00ffaa}}
@keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes neonFlicker{0%,100%{opacity:1}45%{opacity:1}46%{opacity:.5}47%{opacity:1}}
@keyframes scanMove{0%{top:-4px}100%{top:100%}}
@keyframes carDrive{0%{transform:translateX(-380px)}100%{transform:translateX(calc(100vw + 380px))}}
@keyframes carGlow{0%,100%{filter:drop-shadow(0 0 8px #ff00ff) drop-shadow(0 0 20px #ff00ff88)}50%{filter:drop-shadow(0 0 16px #00ffff) drop-shadow(0 0 40px #00ffff88)}}
@keyframes gridScroll{0%{background-position:0 0}100%{background-position:0 80px}}
\`;

const GC = \`
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:linear-gradient(160deg,#0a0010 0%,#10001a 40%,#000818 100%);color:#e0cfff;font-family:'Courier New',monospace;min-height:100vh}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:#0a0010}
::-webkit-scrollbar-thumb{background:rgba(255,0,255,.4);border-radius:3px}
a{color:#ff00ff;text-decoration:none;transition:color .2s}
a:hover{color:#00ffff}
section{padding:100px 0}
\`;

function RainCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    const cols = Math.floor(W / 18), drops = Array.from({length:cols}, () => Math.random() * -H);
    const chars = "アイウエオカキクケコ01サシスセソタチツテト∇∆⌬⊕{}[]<>/|=+-*&^%$#@!";
    let frame;
    function draw() {
      ctx.fillStyle = "rgba(8,0,16,.18)"; ctx.fillRect(0,0,W,H);
      drops.forEach((y,i) => {
        const ch = chars[Math.floor(Math.random()*chars.length)], x = i*18, bright = Math.random()>.97, p = Math.random();
        ctx.fillStyle = bright ? "#fff" : p>.85 ? "#00ffff88" : p>.6 ? "#ff00ff66" : "#ffe60044";
        ctx.font = bright ? "bold 13px Courier New" : "12px Courier New";
        ctx.fillText(ch, x, y);
        drops[i] = y > H + Math.random()*1000 ? -50 : y + 14 + Math.random()*6;
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    const onR = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", onR); };
  }, []);
  return <canvas ref={ref} style={{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:0,pointerEvents:"none",opacity:.6}} />;
}

function Wheel({cx, cy}) {
  const fo = "0 "+cx+" "+cy, to = "360 "+cx+" "+cy;
  return (
    <>
      <circle cx={cx} cy={cy} r={20} fill="#111" stroke="#c0a050" strokeWidth={2.5}/>
      <circle cx={cx} cy={cy} r={15} fill="#0a0010" stroke="#a07830" strokeWidth={1.5}/>
      <g><animateTransform attributeName="transform" type="rotate" from={fo} to={to} dur="0.6s" repeatCount="indefinite"/>
        <line x1={cx} y1={cy-14} x2={cx} y2={cy+14} stroke="#c0a050" strokeWidth={1.8}/>
        <line x1={cx-14} y1={cy} x2={cx+14} y2={cy} stroke="#c0a050" strokeWidth={1.8}/>
        <line x1={cx-10} y1={cy-10} x2={cx+10} y2={cy+10} stroke="#c0a050" strokeWidth={1.8}/>
        <line x1={cx+10} y1={cy-10} x2={cx-10} y2={cy+10} stroke="#c0a050" strokeWidth={1.8}/>
      </g>
      <circle cx={cx} cy={cy} r={5} fill="#d4aa60" stroke="#ffe060" strokeWidth={1}/>
      <circle cx={cx} cy={cy} r={2} fill="#d4aa60"/>
    </>
  );
}

function CyberpunkScene() {
  const blds = [[0,140,60,"#ff00ff"],[55,110,45,"#00ffff"],[95,125,55,"#ff00ff"],[145,95,40,"#ffe600"],[180,115,50,"#00ffff"],[225,100,60,"#ff00ff"],[280,120,45,"#00ffff"],[320,90,55,"#ff00ff"],[370,105,65,"#ffe600"],[430,115,50,"#00ffff"],[475,95,60,"#ff00ff"],[530,110,45,"#00ffff"],[570,100,55,"#ffe600"],[620,88,50,"#ff00ff"],[665,115,65,"#00ffff"],[725,98,50,"#ff00ff"],[770,110,60,"#ffe600"],[825,95,55,"#00ffff"],[875,105,65,"#ff00ff"],[935,90,50,"#ffe600"],[980,115,60,"#00ffff"],[1035,100,55,"#ff00ff"],[1085,88,65,"#ffe600"],[1145,110,50,"#00ffff"],[1190,95,60,"#ff00ff"],[1245,105,55,"#ffe600"],[1295,115,70,"#00ffff"],[1360,90,80,"#ff00ff"]];
  return (
    <div aria-hidden="true" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:1,pointerEvents:"none",overflow:"hidden",height:260}}>
      <svg viewBox="0 0 1440 260" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",display:"block",position:"absolute",bottom:0}}>
        <defs>
          <linearGradient id="bldCp" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#1a0030"/><stop offset="100%" stopColor="#0a0010"/></linearGradient>
          <linearGradient id="roadG" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#1a0030"/><stop offset="100%" stopColor="#0d0020"/></linearGradient>
          <filter id="cpGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="sGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {blds.map(([x,y,w,c],i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={260-y} fill="url(#bldCp)"/>
            <rect x={x} y={y} width={w} height={2} fill={c} opacity=".9" filter="url(#cpGlow)"/>
            <rect x={x} y={y} width={2} height={260-y} fill={c} opacity=".3"/>
            <rect x={x+w-2} y={y} width={2} height={260-y} fill={c} opacity=".3"/>
            {[0,1,2].map(j => <rect key={j} x={x+6} y={y+20+j*28} width={w > 12 ? w-12 : 1} height={10} fill={c} opacity=".12" rx="1"/>)}
          </g>
        ))}
        <polygon points="500,200 940,200 1440,260 0,260" fill="url(#roadG)"/>
        <line x1="720" y1="200" x2="720" y2="260" stroke="#ffe600" strokeWidth="3" opacity=".8" filter="url(#cpGlow)" strokeDasharray="18 14"/>
        <line x1="500" y1="200" x2="0" y2="260" stroke="#ff00ff" strokeWidth="2" opacity=".7" filter="url(#cpGlow)"/>
        <line x1="940" y1="200" x2="1440" y2="260" stroke="#ff00ff" strokeWidth="2" opacity=".7" filter="url(#cpGlow)"/>
        <rect x="0" y="198" width="1440" height="4" fill="#ff00ff" opacity=".6" filter="url(#sGlow)"/>
        <rect x="0" y="255" width="1440" height="5" fill="#00ffff" opacity=".5" filter="url(#cpGlow)"/>
      </svg>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:62,background:"repeating-linear-gradient(90deg,rgba(255,0,255,.12) 0px,transparent 1px,transparent 40px,rgba(255,0,255,.12) 40px)",WebkitMaskImage:"linear-gradient(to top,black 0%,transparent 100%)",maskImage:"linear-gradient(to top,black 0%,transparent 100%)",animation:"gridScroll 1.2s linear infinite"}}/>
      <div style={{position:"absolute",bottom:18,left:0,animation:"carDrive 9s linear infinite"}}>
        <svg width="340" height="100" viewBox="0 0 340 100" style={{animation:"carGlow 2s ease-in-out infinite",overflow:"visible"}}>
          <defs>
            <linearGradient id="bodyG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8b1a4a"/><stop offset="40%" stopColor="#a0204f"/><stop offset="70%" stopColor="#3a6080"/><stop offset="100%" stopColor="#1a3050"/></linearGradient>
            <linearGradient id="roofG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2a4a6a"/><stop offset="100%" stopColor="#0d1a28"/></linearGradient>
            <filter id="nb"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="sg2"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <polygon points="318,42 400,20 400,70" fill="#ffe060" opacity=".1"/>
          <path d="M18,58 L18,45 Q20,40 28,38 L295,38 Q308,38 318,45 L322,58 Z" fill="url(#bodyG)"/>
          <path d="M25,42 L300,42" stroke="rgba(255,200,200,.25)" strokeWidth="1.5" fill="none"/>
          <rect x="30" y="58" width="270" height="6" rx="2" fill="#2a0818"/>
          <rect x="30" y="58" width="270" height="1.5" fill="#ff00ff" opacity=".7" filter="url(#sg2)"/>
          <path d="M75,38 Q88,15 108,10 L210,10 Q225,10 240,16 Q258,24 270,38 Z" fill="url(#roofG)" stroke="#3a6080" strokeWidth="1"/>
          <path d="M108,10 L116,38 L170,38 L170,10 Z" fill="rgba(100,200,255,.12)" stroke="#00cfff" strokeWidth=".8"/>
          <path d="M185,10 L240,16 L258,38 L185,38 Z" fill="rgba(60,140,200,.1)" stroke="#3a7090" strokeWidth=".8"/>
          {[0,1,2,3].map(i => <rect key={i} x={260+i*8} y={30} width={4} height={10} rx={1} fill="#0a0018" stroke="#5a3060" strokeWidth=".6"/>)}
          <path d="M108,10 L210,10" stroke="#c0a050" strokeWidth="2" fill="none"/>
          <rect x="145" y="46" width="20" height="3" rx="1.5" fill="#c0a050" opacity=".8"/>
          <rect x="210" y="46" width="20" height="3" rx="1.5" fill="#c0a050" opacity=".8"/>
          <path d="M295,38 L322,58 L322,65 L290,65 L282,58 L295,38 Z" fill="#1a0a18"/>
          <rect x="296" y="45" width="24" height="16" rx="2" fill="#0a0010" stroke="#c0a050" strokeWidth="1.2"/>
          {[0,1,2,3,4].map(i => <line key={i} x1="296" y1={47+i*3} x2="320" y2={47+i*3} stroke="#c0a050" strokeWidth=".6" opacity=".8"/>)}
          <rect x="309" y="40" width="14" height="7" rx="2" fill="#ffe060" opacity=".95" filter="url(#nb)"/>
          <path d="M18,38 L18,65 L28,65 L36,58 L28,38 Z" fill="#180810"/>
          <rect x="18" y="43" width="14" height="5" rx="1" fill="#ff1020" opacity=".9" filter="url(#sg2)"/>
          <ellipse cx="24" cy="64" rx="4" ry="2.5" fill="#0a0010" stroke="#c0a050" strokeWidth="1"/>
          <ellipse cx="32" cy="64" rx="4" ry="2.5" fill="#0a0010" stroke="#c0a050" strokeWidth="1"/>
          <path d="M30,64 L295,64" stroke="#ff00ff" strokeWidth="2.5" opacity=".85" filter="url(#nb)"/>
          <Wheel cx={62} cy={68}/>
          <Wheel cx={105} cy={68}/>
          <Wheel cx={265} cy={68}/>
          <path d="M38,58 Q62,36 86,58" fill="none" stroke="#8b1a4a" strokeWidth="2"/>
          <path d="M80,58 Q105,36 130,58" fill="none" stroke="#8b1a4a" strokeWidth="2"/>
          <path d="M240,58 Q265,36 290,58" fill="none" stroke="#3a6080" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
}

function Scanline() {
  return (
    <div aria-hidden="true" style={{position:"fixed",inset:0,zIndex:2,pointerEvents:"none",background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,0,255,.012) 3px,rgba(255,0,255,.012) 4px)"}}>
      <div style={{position:"absolute",left:0,right:0,height:4,background:"linear-gradient(transparent,rgba(255,0,255,.06),transparent)",animation:"scanMove 5s linear infinite"}}/>
    </div>
  );
}
`;

fs.writeFileSync('src/App.jsx', part1);
console.log('Part1 written, bytes:', part1.length);
