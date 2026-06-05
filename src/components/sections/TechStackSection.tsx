import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingMotto from "@/components/ui/RotatingMotto";

import {
  FaVuejs,
  FaReact,
  FaMobileScreen,
  FaDesktop,
} from "react-icons/fa6";
import { SiFlutter, SiHarmonyos } from "react-icons/si";
import { IconChartPie, IconPlugConnected } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
interface TechItem {
  text: string;
  sub: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  borderColor: string;
}

const techItems: TechItem[] = [
  {
    text: "Vue3 + TypeScript + Pinia",
    sub: "Composition API、Vite、Element-Plus",
    icon: <FaVuejs className="text-green-400" />,
    category: "前端框架",
    color: "text-green-400",
    borderColor: "border-green-500/20 hover:border-green-400/40",
  },
  {
    text: "React + Hooks + Zustand",
    sub: "Shadcn/Ant Design、React Router",
    icon: <FaReact className="text-cyan-400" />,
    category: "前端框架",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/20 hover:border-cyan-400/40",
  },
  {
    text: "uni-app 跨平台",
    sub: "微信/支付宝/抖音多端适配",
    icon: <FaMobileScreen className="text-blue-400" />,
    category: "跨平台",
    color: "text-blue-400",
    borderColor: "border-blue-500/20 hover:border-blue-400/40",
  },
  {
    text: "Tauri + Vue3",
    sub: "轻量级跨平台桌面应用",
    icon: <FaDesktop className="text-orange-400" />,
    category: "桌面端",
    color: "text-orange-400",
    borderColor: "border-orange-500/20 hover:border-orange-400/40",
  },
  {
    text: "Flutter + Dart",
    sub: "iOS/Android/HarmonyOS 多端",
    icon: <SiFlutter className="text-sky-400" />,
    category: "跨平台",
    color: "text-sky-400",
    borderColor: "border-sky-500/20 hover:border-sky-400/40",
  },
  {
    text: "HarmonyOS ArkTS/ArkUI",
    sub: "ComponentV2、一多适配",
    icon: <SiHarmonyos className="text-red-400" />,
    category: "鸿蒙",
    color: "text-red-400",
    borderColor: "border-red-500/20 hover:border-red-400/40",
  },
  {
    text: "ECharts + DataV + Spline",
    sub: "V-Scale-Screen 自适应方案",
    icon: <IconChartPie className="h-5 w-5 text-yellow-400" />,
    category: "可视化",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/20 hover:border-yellow-400/40",
  },
  {
    text: "WebSocket + Socket.io",
    sub: "心跳检测、断线重连、降级轮询",
    icon: <IconPlugConnected className="h-5 w-5 text-violet-400" />,
    category: "实时通信",
    color: "text-violet-400",
    borderColor: "border-violet-500/20 hover:border-violet-400/40",
  },
];

/* ── Single scrolling row ── */
function ScrollRow({
  items,
  direction,
  speed,
}: {
  items: TechItem[];
  direction: "left" | "right";
  speed: number;
}) {
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]"
      style={{
        "--animation-duration": `${speed}s`,
        "--animation-direction":
          direction === "left" ? "forwards" : "reverse",
      } as React.CSSProperties}
    >
      <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-3 animate-scroll hover:[animation-play-state:paused]">
        {tripled.map((item, idx) => (
          <li
            key={idx}
            className={`group relative shrink-0 rounded-2xl border bg-white/[0.02] hover:bg-white/[0.05] px-5 py-4 flex items-center gap-4 transition-all duration-300 cursor-default ${item.borderColor}`}
          >
            {/* Icon */}
            <span className="text-2xl flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {item.icon}
            </span>

            {/* Text */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white/90 whitespace-nowrap group-hover:text-white transition-colors">
                {item.text}
              </span>
              <span className="text-[11px] text-white/50 whitespace-nowrap group-hover:text-white/70 transition-colors">
                {item.sub}
              </span>
            </div>

            {/* Category tag */}
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}
            >
              {item.category}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Category stats ── */
const categories = [
  { name: "前端框架", count: 2, color: "bg-green-400" },
  { name: "跨平台", count: 3, color: "bg-cyan-400" },
  { name: "桌面端", count: 1, color: "bg-orange-400" },
  { name: "鸿蒙", count: 1, color: "bg-red-400" },
  { name: "可视化", count: 1, color: "bg-yellow-400" },
  { name: "实时通信", count: 1, color: "bg-violet-400" },
];

/* ── Main section ── */
export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Stats stagger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
            },
          }
        );
      }

      // Rows slide in
      if (rowsRef.current) {
        gsap.fromTo(
          rowsRef.current.children,
          { opacity: 0, x: (i) => (i % 2 === 0 ? -60 : 60) },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split items into 3 rows with different orders for variety
  const row1 = techItems.slice(0, 4);
  const row2 = [...techItems].reverse().slice(0, 4);
  const row3 = [...techItems.slice(2), ...techItems.slice(0, 2)];

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="py-28 relative"
    >
      <div className="relative z-10">
        {/* ── Heading ── */}
        <div ref={headingRef} className="max-w-7xl mx-auto px-4 mb-10">
          <h2
            className="section-heading text-3xl md:text-4xl font-bold text-center tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            技术栈
          </h2>
          <RotatingMotto
            mottos={[
              "The right tool for the right job.",
              "工欲善其事，必先利其器。",
              "Learn once, write anywhere.",
              "技术是第一生产力。",
              "Good tools make good craftsmen.",
              "Stay curious, keep building.",
            ]}
            interval={4500}
            className="mb-3"
          />
          <p className="text-white/60 text-center max-w-2xl mx-auto text-sm">
            熟练掌握多种现代技术，持续学习前沿技术
          </p>
        </div>

        {/* ── Category stats ── */}
        <div
          ref={statsRef}
          className="max-w-3xl mx-auto px-4 flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="liquid-glass rounded-xl px-4 py-2.5 flex items-center gap-2.5 hover:scale-[1.04] transition-transform duration-200 cursor-default"
            >
              <div className={`w-2 h-2 rounded-full ${cat.color} opacity-70`} />
              <span className="text-sm text-slate-300">{cat.name}</span>
              <span className="text-xs text-muted-foreground/50 font-mono">
                {cat.count}
              </span>
            </div>
          ))}
        </div>

        {/* ── Scrolling rows ── */}
        <div ref={rowsRef} className="space-y-2">
          <ScrollRow items={row1} direction="right" speed={40} />
          <ScrollRow items={row2} direction="left" speed={50} />
          <ScrollRow items={row3} direction="right" speed={60} />
        </div>
      </div>
    </section>
  );
}
