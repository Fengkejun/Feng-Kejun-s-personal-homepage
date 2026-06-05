import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { projects } from "@/data/profile";
import SectionVideoBackground from "@/components/ui/SectionVideoBackground";
import RotatingMotto from "@/components/ui/RotatingMotto";

const VIDEO_SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4";

const categories = [
  "全部",
  "桌面端",
  "小程序",
  "后台管理",
  "鸿蒙",
  "Flutter",
  "React",
];

// Reliable images with fallback gradients per category
const projectImages: Record<number, string> = {
  1: "https://picsum.photos/seed/cotton-iot/800/500",
  2: "https://picsum.photos/seed/battery-app/800/500",
  3: "https://picsum.photos/seed/dashboard-admin/800/500",
  4: "https://picsum.photos/seed/office-system/800/500",
  5: "https://picsum.photos/seed/harmony-shop/800/500",
  6: "https://picsum.photos/seed/flutter-life/800/500",
  7: "https://picsum.photos/seed/data-manage/800/500",
  8: "https://picsum.photos/seed/hospital-app/800/500",
  9: "https://picsum.photos/seed/smart-park/800/500",
  10: "https://picsum.photos/seed/react-web/800/500",
};

const categoryGradients: Record<string, string> = {
  桌面端: "from-orange-600 to-amber-700",
  小程序: "from-blue-600 to-cyan-600",
  后台管理: "from-violet-600 to-purple-700",
  鸿蒙: "from-red-600 to-rose-600",
  Flutter: "from-sky-600 to-blue-600",
  React: "from-cyan-600 to-teal-600",
};

const categoryAccent: Record<string, string> = {
  桌面端: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  小程序: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  后台管理: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  鸿蒙: "bg-red-500/20 text-red-300 border-red-500/30",
  Flutter: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  React: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgError, setImgError] = useState(false);
  const isFeatured = index === 0;
  const img = projectImages[project.id] || project.image;
  const gradient = categoryGradients[project.category] || "from-indigo-600 to-violet-600";
  const accent = categoryAccent[project.category] || "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onEnter = () => {
      gsap.to(card.querySelector(".card-img"), {
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(card, {
        y: -8,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(card.querySelector(".card-arrow"), {
        x: 4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(card.querySelector(".card-img"), {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(card.querySelector(".card-arrow"), {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-card
      className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.06] hover:border-white/15 transition-colors duration-500 ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image or gradient fallback */}
      <div className="card-img absolute inset-0 will-change-transform">
        {imgError ? (
          <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
        ) : (
          <img
            ref={imgRef}
            src={img}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      {/* Top accent bar on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-end h-full ${
          isFeatured ? "p-8 md:p-10" : "p-5 md:p-6"
        }`}
      >
        {/* Category badge */}
        <span
          className={`inline-flex self-start px-3 py-1 rounded-full text-[11px] font-medium border backdrop-blur-sm mb-3 ${accent}`}
        >
          {project.category}
        </span>

        {/* Title */}
        <h4
          className={`font-bold text-white mb-2 ${
            isFeatured ? "text-2xl md:text-3xl" : "text-base md:text-lg"
          }`}
        >
          {project.title}
        </h4>

        {/* Description */}
        <p
          className={`text-white/60 mb-4 ${
            isFeatured
              ? "text-sm md:text-base leading-relaxed max-w-xl"
              : "text-xs md:text-sm line-clamp-2"
          }`}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, isFeatured ? 6 : 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-white/50 bg-white/[0.08] rounded-md px-2 py-0.5 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="card-arrow flex items-center gap-2 text-white/50 group-hover:text-white/80 transition-colors duration-300">
          <span className="text-xs font-medium">查看详情</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredProjects =
    activeCategory === "全部"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 px-4 relative overflow-hidden">
      <SectionVideoBackground src={VIDEO_SRC} scrollZoom />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="section-heading text-3xl md:text-5xl font-bold text-center tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          项目作品
        </h2>
        <RotatingMotto
          mottos={[
            "Ship it. Iterate. Repeat.",
            "Talk is cheap, show me the code.",
            "好的产品源于好的代码。",
            "Build something people want.",
            "Done is better than perfect.",
            "代码是最好的作品集。",
          ]}
          interval={4200}
          className="mb-4"
        />
        <p className="text-white/60 text-sm text-center max-w-2xl mx-auto mb-16">
          精选项目作品，展示技术实力和创造力
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              data-pill
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-white/15 text-white border border-white/20 shadow-lg shadow-white/5"
                  : "bg-white/[0.05] text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
