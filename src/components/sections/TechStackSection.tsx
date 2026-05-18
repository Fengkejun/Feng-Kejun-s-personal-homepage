import { InfiniteScroll } from "@/components/ui/infinite-scroll";
import { GradientText } from "@/components/ui/gradient-text";
import { techStack } from "@/data/profile";

import {
  FaVuejs,
  FaReact,
  FaMobileScreen,
  FaDesktop,
} from "react-icons/fa6";
import {
  SiFlutter,
  SiHarmonyos,
} from "react-icons/si";
import {
  IconChartPie,
  IconPlugConnected,
} from "@tabler/icons-react";

const iconMap: Record<string, React.ReactNode> = {
  "Vue3 + TypeScript + Pinia": <FaVuejs className="text-green-500" />,
  "React + Hooks + Zustand": <FaReact className="text-cyan-400" />,
  "uni-app 跨平台": <FaMobileScreen className="text-blue-400" />,
  "Tauri + Vue3": <FaDesktop className="text-orange-400" />,
  "Flutter + Dart": <SiFlutter className="text-sky-400" />,
  "HarmonyOS ArkTS/ArkUI": <SiHarmonyos className="text-red-500" />,
  "ECharts + DataV + Spline": <IconChartPie className="h-6 w-6 text-yellow-500" />,
  "WebSocket + Socket.io": <IconPlugConnected className="h-6 w-6 text-white" />,
};

const scrollItems = techStack.map((item) => ({
  text: item.quote,
  icon: iconMap[item.quote],
}));

const scrollItems2 = [...techStack].reverse().map((item) => ({
  text: item.title,
  icon: iconMap[item.quote],
}));

export default function TechStackSection() {
  return (
    <section id="tech" className="py-20">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <GradientText colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]} animationSpeed={6}>
            技术栈
          </GradientText>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto text-sm md:text-base">
          熟练掌握多种现代技术，持续学习前沿技术
        </p>
      </div>

      <InfiniteScroll items={scrollItems} direction="right" speed={45} />
      <InfiniteScroll items={scrollItems2} direction="left" speed={55} />
    </section>
  );
}
