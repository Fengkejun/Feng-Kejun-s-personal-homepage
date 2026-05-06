import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
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

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4">
          关于我
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-sm md:text-base">
          {profile.bio}
        </p>

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
