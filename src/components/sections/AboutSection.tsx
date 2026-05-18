import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CountUp } from "@/components/ui/count-up";
import { SplitText } from "@/components/ui/split-text";
import { GradientText } from "@/components/ui/gradient-text";
import { aboutItems, profile } from "@/data/profile";
import {
  IconCode,
  IconHeart,
  IconUsers,
  IconBulb,
} from "@tabler/icons-react";

const icons = [
  <IconCode className="h-4 w-4 text-blue-400" />,
  <IconHeart className="h-4 w-4 text-red-400" />,
  <IconUsers className="h-4 w-4 text-green-400" />,
  <IconBulb className="h-4 w-4 text-yellow-400" />,
];

const stats = [
  { label: "年经验", value: 1, suffix: "+" },
  { label: "技术栈", value: 8, suffix: "+" },
  { label: "项目", value: 10, suffix: "+" },
  { label: "证书", value: 3, suffix: "" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <GradientText colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]} animationSpeed={6}>
            关于我
          </GradientText>
        </h2>
        <div className="max-w-2xl mx-auto mb-12 text-sm md:text-base text-center">
          <SplitText
            text={profile.bio}
            className="text-neutral-400"
            delay={15}
            threshold={0.3}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-5 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-blue-500/30 transition-colors"
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                className="text-3xl md:text-4xl font-bold text-white"
              />
              <span className="text-xs md:text-sm text-neutral-400 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <BentoGrid className="max-w-4xl mx-auto">
          {aboutItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              icon={icons[i]}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
