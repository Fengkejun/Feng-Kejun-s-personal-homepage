import { useRef, useEffect } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   Layer 1 — Digital Grid + Floating Particles
   (deepest, slowest movement)
   ───────────────────────────────────────────── */
function DigitalGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40">
      {/* Grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(99,102,241,0.07)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating code particles */}
      {[
        { text: "const", x: "12%", y: "18%", delay: 0 },
        { text: "fn()", x: "75%", y: "25%", delay: 1.2 },
        { text: "{ }", x: "88%", y: "60%", delay: 0.6 },
        { text: "=>", x: "25%", y: "72%", delay: 2 },
        { text: "[]", x: "60%", y: "15%", delay: 1.5 },
        { text: "&&", x: "40%", y: "82%", delay: 0.8 },
        { text: "0x", x: "8%", y: "50%", delay: 1.8 },
        { text: "#", x: "92%", y: "35%", delay: 2.5 },
        { text: "</>", x: "55%", y: "55%", delay: 0.3 },
        { text: "::", x: "30%", y: "40%", delay: 1.0 },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute text-[11px] font-mono text-indigo-400/30 select-none"
          style={{ left: p.x, top: p.y }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Layer 2 — Liquid Glass Logic Blocks
   (middle layer, medium parallax)
   ───────────────────────────────────────────── */

function GitCommitGraph() {
  const rows = [
    { dots: [1, 0, 1, 0, 0], hash: "a3f2c1d" },
    { dots: [0, 1, 0, 1, 0], hash: "e7b4a9f" },
    { dots: [1, 1, 0, 0, 1], hash: "c8d1e3b" },
    { dots: [0, 0, 1, 0, 0], hash: "f9a2d7c" },
    { dots: [1, 0, 0, 1, 1], hash: "b5e8f1a" },
  ];

  return (
    <div className="liquid-glass rounded-xl p-4 w-[220px]">
      <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        GIT LOG
      </div>
      <div className="space-y-2">
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {row.dots.map((active, di) => (
                <div
                  key={di}
                  className={`w-2 h-2 rounded-full ${
                    active
                      ? "bg-indigo-400/60"
                      : "bg-white/[0.06]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono text-muted-foreground/60">
              {row.hash}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className="liquid-glass rounded-xl p-4 w-[200px]">
      <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        WORKFLOW
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {["输入", "处理", "验证", "输出"].map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <div className="liquid-glass rounded-md px-4 py-1.5 text-[11px] text-foreground/70 w-full text-center">
              {step}
            </div>
            {i < 3 && (
              <div className="w-px h-3 bg-indigo-400/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BooleanLogic() {
  return (
    <div className="liquid-glass rounded-xl p-4 w-[180px]">
      <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        LOGIC
      </div>
      <div className="space-y-2 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400/70">true</span>
          <span className="text-muted-foreground/40">&&</span>
          <span className="text-rose-400/70">false</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-rose-400/70">false</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400/70">true</span>
          <span className="text-muted-foreground/40">||</span>
          <span className="text-rose-400/70">false</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-emerald-400/70">true</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground/40">!</span>
          <span className="text-emerald-400/70">true</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-rose-400/70">false</span>
        </div>
      </div>
    </div>
  );
}

function DataFlow() {
  return (
    <div className="liquid-glass rounded-xl p-4 w-[190px]">
      <div className="text-[10px] text-muted-foreground font-mono mb-3 tracking-wider">
        DATA PIPE
      </div>
      <div className="flex items-center gap-2">
        {["API", "ETL", "DB"].map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <div className="liquid-glass rounded-md px-3 py-1.5 text-[10px] text-foreground/60 font-mono">
              {node}
            </div>
            {i < 2 && (
              <svg
                width="16"
                height="8"
                viewBox="0 0 16 8"
                className="text-indigo-400/30"
              >
                <path
                  d="M0 4h12M10 1l3 3-3 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Layer 3 — Terminal & Code Snippets
   (top layer, fastest parallax)
   ───────────────────────────────────────────── */

function TerminalWindow() {
  return (
    <div className="liquid-glass rounded-xl overflow-hidden w-[260px]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]">
        <div className="w-2 h-2 rounded-full bg-rose-400/50" />
        <div className="w-2 h-2 rounded-full bg-amber-400/50" />
        <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
        <span className="text-[9px] text-muted-foreground/40 ml-2 font-mono">
          zsh
        </span>
      </div>
      {/* Content */}
      <div className="p-3 font-mono text-[11px] leading-relaxed space-y-1">
        <div>
          <span className="text-emerald-400/70">❯</span>{" "}
          <span className="text-foreground/60">npm run build</span>
        </div>
        <div className="text-muted-foreground/40">
          ✓ built in 819ms
        </div>
        <div>
          <span className="text-emerald-400/70">❯</span>{" "}
          <span className="text-foreground/60">git push origin main</span>
        </div>
        <div className="text-muted-foreground/40">
          Enumerating objects: 12, done.
        </div>
        <div className="text-indigo-400/50">
          → https://github.com/Fengkejun
        </div>
      </div>
    </div>
  );
}

function CodeSnippet() {
  return (
    <div className="liquid-glass rounded-xl p-4 w-[240px] font-mono text-[11px] leading-relaxed">
      <div className="text-[10px] text-muted-foreground font-mono mb-2 tracking-wider">
        VUE3 SFC
      </div>
      <div className="space-y-0.5">
        <div>
          <span className="text-violet-400/60">{"<script"}</span>
          <span className="text-amber-400/60"> setup</span>
          <span className="text-violet-400/60">{">"}</span>
        </div>
        <div className="pl-3">
          <span className="text-violet-400/50">import</span>{" "}
          <span className="text-foreground/50">{"{ ref }"}</span>{" "}
          <span className="text-violet-400/50">from</span>{" "}
          <span className="text-emerald-400/50">"vue"</span>
        </div>
        <div className="pl-3">
          <span className="text-violet-400/50">const</span>{" "}
          <span className="text-foreground/50">count</span>{" "}
          <span className="text-muted-foreground/30">=</span>{" "}
          <span className="text-amber-400/50">ref</span>
          <span className="text-muted-foreground/30">(</span>
          <span className="text-emerald-400/50">0</span>
          <span className="text-muted-foreground/30">)</span>
        </div>
        <div>
          <span className="text-violet-400/60">{"</script>"}</span>
        </div>
      </div>
    </div>
  );
}

function TypeDefinition() {
  return (
    <div className="liquid-glass rounded-xl p-4 w-[200px] font-mono text-[11px] leading-relaxed">
      <div className="text-[10px] text-muted-foreground font-mono mb-2 tracking-wider">
        TYPESCRIPT
      </div>
      <div className="space-y-0.5">
        <div>
          <span className="text-violet-400/50">interface</span>{" "}
          <span className="text-amber-400/50">User</span>{" "}
          {"{"}
        </div>
        <div className="pl-3">
          <span className="text-foreground/50">name</span>
          <span className="text-muted-foreground/30">:</span>{" "}
          <span className="text-emerald-400/50">string</span>
        </div>
        <div className="pl-3">
          <span className="text-foreground/50">role</span>
          <span className="text-muted-foreground/30">:</span>{" "}
          <span className="text-emerald-400/50">string</span>
        </div>
        <div className="pl-3">
          <span className="text-foreground/50">skills</span>
          <span className="text-muted-foreground/30">:</span>{" "}
          <span className="text-emerald-400/50">string[]</span>
        </div>
        <div>{"}"}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main ParallaxBackground Component
   ───────────────────────────────────────────── */

export default function ParallaxBackground() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Mouse-follow parallax ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      // Layer 1 — deepest, smallest movement
      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          x: cx * 8,
          y: cy * 6,
          duration: 1.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Layer 2 — middle, medium movement
      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          x: cx * 20,
          y: cy * 15,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Layer 3 — top, largest movement
      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          x: cx * 35,
          y: cy * 25,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── Scroll-triggered parallax ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);

      // Layer 1 drifts slowly upward
      if (layer1Ref.current) {
        gsap.set(layer1Ref.current, {
          yPercent: -progress * 5,
        });
      }

      // Layer 2 floats up slightly more
      if (layer2Ref.current) {
        gsap.set(layer2Ref.current, {
          yPercent: -progress * 12,
        });
      }

      // Layer 3 scrolls up fastest
      if (layer3Ref.current) {
        gsap.set(layer3Ref.current, {
          yPercent: -progress * 22,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Entrance animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Layer 1 fades in slowly
      gsap.fromTo(
        layer1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Layer 2 slides up with delay
      gsap.fromTo(
        layer2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.4 }
      );

      // Layer 3 slides up last
      gsap.fromTo(
        layer3Ref.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.8 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* ── Layer 1: Digital Grid (deepest) ── */}
      <div ref={layer1Ref} className="absolute inset-0">
        <DigitalGrid />
      </div>

      {/* ── Layer 2: Liquid Glass Logic Blocks (middle) ── */}
      <div ref={layer2Ref} className="absolute inset-0">
        {/* Top-left */}
        <div className="absolute top-[12%] left-[5%]">
          <GitCommitGraph />
        </div>
        {/* Top-right */}
        <div className="absolute top-[18%] right-[8%]">
          <FlowDiagram />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-[22%] left-[10%]">
          <DataFlow />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-[28%] right-[5%]">
          <BooleanLogic />
        </div>
      </div>

      {/* ── Layer 3: Terminal & Code (top, fastest) ── */}
      <div ref={layer3Ref} className="absolute inset-0">
        {/* Left */}
        <div className="absolute top-[30%] left-[2%]">
          <TerminalWindow />
        </div>
        {/* Right */}
        <div className="absolute top-[8%] right-[3%]">
          <CodeSnippet />
        </div>
        {/* Center-right */}
        <div className="absolute bottom-[10%] right-[12%]">
          <TypeDefinition />
        </div>
      </div>
    </div>
  );
}
