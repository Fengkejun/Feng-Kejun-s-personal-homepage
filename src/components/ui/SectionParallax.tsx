import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";

/* ── Shared liquid-glass mini-card wrapper ── */
function GlassBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`liquid-glass rounded-xl p-3 ${className}`}>
      {children}
    </div>
  );
}

/* ── Floating code symbol ── */
function CodeSymbol({
  children,
  x,
  y,
}: {
  children: ReactNode;
  x: string;
  y: string;
}) {
  return (
    <span
      className="absolute text-[11px] font-mono select-none opacity-30"
      style={{ left: x, top: y }}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════
   Variant: About — skill bars + profile stats
   ══════════════════════════════════════════════ */
function AboutLayer2() {
  const skills = [
    { name: "Vue3", pct: 90 },
    { name: "React", pct: 80 },
    { name: "TypeScript", pct: 85 },
  ];
  return (
    <>
      <div className="absolute top-[10%] left-[6%]">
        <GlassBlock className="w-[180px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">SKILLS</div>
          <div className="space-y-1.5">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-[9px] text-muted-foreground/60 mb-0.5">
                  <span>{s.name}</span><span>{s.pct}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-indigo-400/40" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassBlock>
      </div>
      <div className="absolute top-[15%] right-[8%]">
        <GlassBlock className="w-[150px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">EXP</div>
          <div className="text-2xl font-light text-foreground/60">1+</div>
          <div className="text-[10px] text-muted-foreground/50">年前端经验</div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[12%] right-[5%]">
        <GlassBlock className="w-[160px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">CERTS</div>
          <div className="space-y-1 text-[10px] text-muted-foreground/60">
            <div>✓ HarmonyOS 高级认证</div>
            <div>✓ 程序设计员三级</div>
          </div>
        </GlassBlock>
      </div>
    </>
  );
}

function AboutLayer3() {
  return (
    <>
      <div className="absolute top-[25%] right-[3%]">
        <GlassBlock className="w-[200px] font-mono text-[10px] leading-relaxed">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">PROFILE</div>
          <div><span className="text-violet-400/50">const</span> <span className="text-foreground/50">dev</span> = {"{"}</div>
          <div className="pl-2"><span className="text-foreground/40">name</span>: <span className="text-emerald-400/50">"冯克军"</span>,</div>
          <div className="pl-2"><span className="text-foreground/40">city</span>: <span className="text-emerald-400/50">"合肥"</span></div>
          <div>{"}"}</div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[20%] left-[4%]">
        <GlassBlock className="w-[170px] font-mono text-[10px] leading-relaxed">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">STACK</div>
          <div className="text-indigo-400/50">Vue3 · React · TS</div>
          <div className="text-indigo-400/40">Tauri · Flutter · HM</div>
          <div className="text-indigo-400/30">ECharts · WebSocket</div>
        </GlassBlock>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   Variant: TechStack — floating tech icons
   ══════════════════════════════════════════════ */
function TechLayer2() {
  const techs = [
    { icon: "V", label: "Vue3", color: "text-emerald-400/50" },
    { icon: "R", label: "React", color: "text-cyan-400/50" },
    { icon: "TS", label: "TypeScript", color: "text-blue-400/50" },
    { icon: "N", label: "Node", color: "text-lime-400/50" },
  ];
  return (
    <>
      <div className="absolute top-[8%] left-[5%]">
        <GlassBlock className="w-[160px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">DEPENDENCIES</div>
          <div className="space-y-1">
            {techs.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-[10px]">
                <span className={`font-bold ${t.color}`}>{t.icon}</span>
                <span className="text-muted-foreground/50">{t.label}</span>
              </div>
            ))}
          </div>
        </GlassBlock>
      </div>
      <div className="absolute top-[12%] right-[6%]">
        <GlassBlock className="w-[180px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">BUNDLE</div>
          <div className="flex items-end gap-1 h-10">
            {[40, 65, 50, 80, 55, 70, 45].map((h, i) => (
              <div key={i} className="w-3 rounded-t bg-indigo-400/30" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="text-[9px] text-muted-foreground/40 mt-1">748 KB gzipped</div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[10%] right-[4%]">
        <GlassBlock className="w-[140px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-1 tracking-wider">BUILD</div>
          <div className="text-lg font-light text-foreground/50">Vite 8</div>
          <div className="text-[10px] text-muted-foreground/40">687ms build</div>
        </GlassBlock>
      </div>
    </>
  );
}

function TechLayer3() {
  return (
    <>
      <div className="absolute top-[30%] left-[3%]">
        <GlassBlock className="w-[200px] font-mono text-[10px] leading-relaxed">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">PACKAGE.JSON</div>
          <div>{"{"}</div>
          <div className="pl-2">"<span className="text-emerald-400/50">vue</span>": "<span className="text-amber-400/50">^3.5</span>",</div>
          <div className="pl-2">"<span className="text-emerald-400/50">react</span>": "<span className="text-amber-400/50">^19.2</span>",</div>
          <div className="pl-2">"<span className="text-emerald-400/50">gsap</span>": "<span className="text-amber-400/50">^3.15</span>"</div>
          <div>{"}"}</div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[25%] left-[6%]">
        <GlassBlock className="w-[150px] font-mono text-[10px]">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">NPM</div>
          <div><span className="text-emerald-400/60">❯</span> <span className="text-foreground/50">pnpm add gsap</span></div>
          <div className="text-muted-foreground/30">+ gsap 3.15.0</div>
        </GlassBlock>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   Variant: Projects — project preview cards
   ══════════════════════════════════════════════ */
function ProjectsLayer2() {
  return (
    <>
      <div className="absolute top-[10%] left-[4%]">
        <GlassBlock className="w-[190px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">PROJECTS</div>
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded bg-white/[0.04] border border-white/[0.06]" />
            ))}
          </div>
        </GlassBlock>
      </div>
      <div className="absolute top-[8%] right-[5%]">
        <GlassBlock className="w-[160px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">CATEGORIES</div>
          <div className="flex flex-wrap gap-1">
            {["桌面端", "小程序", "后台", "鸿蒙", "Flutter", "React"].map((c) => (
              <span key={c} className="text-[9px] text-muted-foreground/50 bg-white/[0.04] rounded px-1.5 py-0.5">{c}</span>
            ))}
          </div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[15%] right-[6%]">
        <GlassBlock className="w-[150px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-1 tracking-wider">STATS</div>
          <div className="text-2xl font-light text-foreground/60">10+</div>
          <div className="text-[10px] text-muted-foreground/50">个项目作品</div>
        </GlassBlock>
      </div>
    </>
  );
}

function ProjectsLayer3() {
  return (
    <>
      <div className="absolute top-[25%] right-[3%]">
        <GlassBlock className="w-[210px] font-mono text-[10px] leading-relaxed">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">CARD COMPONENT</div>
          <div><span className="text-violet-400/50">{"<"}</span><span className="text-amber-400/50">ProjectCard</span></div>
          <div className="pl-2"><span className="text-foreground/40">title</span>=<span className="text-emerald-400/50">"测水仪"</span></div>
          <div className="pl-2"><span className="text-foreground/40">tags</span>={"{"}["Vue3","Tauri"]{"}"}</div>
          <div><span className="text-violet-400/50">{"/>"}</span></div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[22%] left-[3%]">
        <GlassBlock className="w-[170px] font-mono text-[10px]">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">TECH MAP</div>
          <div className="text-indigo-400/40">Vue3 + Tauri + Rust</div>
          <div className="text-indigo-400/35">UniApp + 微信小程序</div>
          <div className="text-indigo-400/30">React + 官网开发</div>
        </GlassBlock>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   Variant: Notes — bookmarks & article cards
   ══════════════════════════════════════════════ */
function NotesLayer2() {
  return (
    <>
      <div className="absolute top-[8%] left-[5%]">
        <GlassBlock className="w-[170px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">NOTEBOOKS</div>
          <div className="space-y-1">
            {["📘 JavaScript", "⚡ ES6+", "💚 Vue3", "⚛️ React"].map((b) => (
              <div key={b} className="text-[10px] text-muted-foreground/60">{b}</div>
            ))}
          </div>
        </GlassBlock>
      </div>
      <div className="absolute top-[14%] right-[6%]">
        <GlassBlock className="w-[160px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">BOOKMARKS</div>
          <div className="space-y-1 text-[10px] text-muted-foreground/50">
            <div>🌐 MDN · Can I Use</div>
            <div>🛠️ Element Plus</div>
            <div>🔧 CodePen · Figma</div>
            <div>💻 Cursor · VS Code</div>
          </div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[12%] right-[4%]">
        <GlassBlock className="w-[140px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-1 tracking-wider">TOTAL</div>
          <div className="text-2xl font-light text-foreground/60">11</div>
          <div className="text-[10px] text-muted-foreground/50">个笔记主题</div>
        </GlassBlock>
      </div>
    </>
  );
}

function NotesLayer3() {
  return (
    <>
      <div className="absolute top-[28%] left-[3%]">
        <GlassBlock className="w-[200px] font-mono text-[10px] leading-relaxed">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">ARTICLE</div>
          <div><span className="text-violet-400/50">#</span> <span className="text-foreground/50">WebSocket 实时通信方案</span></div>
          <div className="text-muted-foreground/30 mt-0.5">心跳检测 · 断线重连 · 降级轮询</div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[20%] left-[5%]">
        <GlassBlock className="w-[180px] font-mono text-[10px] leading-relaxed">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">收藏</div>
          <div className="text-indigo-400/40">Tauri · ECharts · Pinia</div>
          <div className="text-indigo-400/35">Vant · VueUse · Zod</div>
        </GlassBlock>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   Variant: Contact — communication nodes
   ══════════════════════════════════════════════ */
function ContactLayer2() {
  return (
    <>
      <div className="absolute top-[10%] left-[6%]">
        <GlassBlock className="w-[150px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">NETWORK</div>
          <div className="space-y-1.5">
            {["Email", "GitHub", "LinkedIn"].map((n) => (
              <div key={n} className="flex items-center gap-2 text-[10px]">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
                <span className="text-muted-foreground/50">{n}</span>
              </div>
            ))}
          </div>
        </GlassBlock>
      </div>
      <div className="absolute top-[15%] right-[5%]">
        <GlassBlock className="w-[140px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-1 tracking-wider">LOCATION</div>
          <div className="text-sm text-foreground/50">安徽·合肥</div>
          <div className="text-[10px] text-muted-foreground/40">31.82°N 117.25°E</div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[15%] right-[8%]">
        <GlassBlock className="w-[160px]">
          <div className="text-[9px] text-muted-foreground font-mono mb-2 tracking-wider">STATUS</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400/60 animate-pulse" />
            <span className="text-[10px] text-muted-foreground/60">可接受新机会</span>
          </div>
        </GlassBlock>
      </div>
    </>
  );
}

function ContactLayer3() {
  return (
    <>
      <div className="absolute top-[25%] right-[3%]">
        <GlassBlock className="w-[190px] font-mono text-[10px] leading-relaxed">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">MAILTO</div>
          <div><span className="text-violet-400/50">mailto:</span></div>
          <div className="text-emerald-400/50">17682189224@163.com</div>
        </GlassBlock>
      </div>
      <div className="absolute bottom-[25%] left-[4%]">
        <GlassBlock className="w-[170px] font-mono text-[10px]">
          <div className="text-[9px] text-muted-foreground mb-1 tracking-wider">CONNECT</div>
          <div className="text-foreground/40">GitHub → /Fengkejun</div>
          <div className="text-foreground/35">LinkedIn → /in/fengkejun</div>
        </GlassBlock>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   Variant configs
   ══════════════════════════════════════════════ */

export type SectionVariant = "about" | "tech" | "projects" | "notes" | "contact";

const LAYER1_SYMBOLS: Record<SectionVariant, { text: string; x: string; y: string }[]> = {
  about: [
    { text: "dev", x: "10%", y: "20%" },
    { text: "{}", x: "80%", y: "15%" },
    { text: "=>", x: "70%", y: "70%" },
    { text: "[]", x: "15%", y: "75%" },
    { text: "if", x: "50%", y: "10%" },
    { text: "fn", x: "85%", y: "45%" },
  ],
  tech: [
    { text: "npm", x: "8%", y: "22%" },
    { text: "git", x: "75%", y: "18%" },
    { text: "yarn", x: "82%", y: "65%" },
    { text: "pnpm", x: "12%", y: "72%" },
    { text: "bun", x: "55%", y: "8%" },
    { text: "vite", x: "90%", y: "40%" },
  ],
  projects: [
    { text: "src/", x: "10%", y: "15%" },
    { text: ".vue", x: "78%", y: "20%" },
    { text: ".tsx", x: "85%", y: "55%" },
    { text: "dist/", x: "15%", y: "68%" },
    { text: "api", x: "60%", y: "12%" },
    { text: "db", x: "45%", y: "80%" },
  ],
  notes: [
    { text: ".md", x: "12%", y: "18%" },
    { text: "#", x: "80%", y: "22%" },
    { text: "---", x: "72%", y: "68%" },
    { text: "[]", x: "18%", y: "78%" },
    { text: ">", x: "55%", y: "10%" },
    { text: "::", x: "88%", y: "48%" },
  ],
  contact: [
    { text: "@", x: "10%", y: "20%" },
    { text: "→", x: "80%", y: "25%" },
    { text: "tel:", x: "75%", y: "60%" },
    { text: "ws://", x: "12%", y: "70%" },
    { text: "<>", x: "50%", y: "8%" },
    { text: "loc", x: "88%", y: "42%" },
  ],
};

/* ══════════════════════════════════════════════
   Main component
   ══════════════════════════════════════════════ */

interface SectionParallaxProps {
  variant: SectionVariant;
}

export default function SectionParallax({ variant }: SectionParallaxProps) {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  // ── Mouse-follow parallax ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          x: cx * 6,
          y: cy * 4,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          x: cx * 16,
          y: cy * 12,
          duration: 1.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          x: cx * 28,
          y: cy * 20,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── Entrance ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(layer1Ref.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.out" });
      gsap.fromTo(layer2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.3 });
      gsap.fromTo(layer3Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.6 });
    });
    return () => ctx.revert();
  }, []);

  const symbols = LAYER1_SYMBOLS[variant];

  const Layer2Content =
    variant === "about" ? <AboutLayer2 /> :
    variant === "tech" ? <TechLayer2 /> :
    variant === "projects" ? <ProjectsLayer2 /> :
    variant === "notes" ? <NotesLayer2 /> :
    <ContactLayer2 />;

  const Layer3Content =
    variant === "about" ? <AboutLayer3 /> :
    variant === "tech" ? <TechLayer3 /> :
    variant === "projects" ? <ProjectsLayer3 /> :
    variant === "notes" ? <NotesLayer3 /> :
    <ContactLayer3 />;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Layer 1: grid + floating symbols (deepest) */}
      <div ref={layer1Ref} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id={`grid-${variant}`} width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99,102,241,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${variant})`} />
        </svg>
        {symbols.map((s, i) => (
          <CodeSymbol key={i} x={s.x} y={s.y}>{s.text}</CodeSymbol>
        ))}
      </div>

      {/* Layer 2: logic blocks (middle) */}
      <div ref={layer2Ref} className="absolute inset-0">
        {Layer2Content}
      </div>

      {/* Layer 3: code snippets (top) */}
      <div ref={layer3Ref} className="absolute inset-0">
        {Layer3Content}
      </div>
    </div>
  );
}
