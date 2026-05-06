import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { techStack } from "@/data/profile";

export default function TechStackSection() {
  return (
    <section id="tech" className="py-20">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4">
          技术栈
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto text-sm md:text-base">
          熟练掌握多种现代技术，持续学习前沿技术
        </p>
      </div>

      <InfiniteMovingCards
        items={techStack}
        direction="right"
        speed="slow"
      />
      <InfiniteMovingCards
        items={[...techStack].reverse()}
        direction="left"
        speed="slow"
      />
    </section>
  );
}
