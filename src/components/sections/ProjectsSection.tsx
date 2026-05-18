import { useState } from "react";
import { StarBorder } from "@/components/ui/star-border";
import { GradientText } from "@/components/ui/gradient-text";
import { projects } from "@/data/profile";

const categories = ["全部", "桌面端", "小程序", "后台管理", "鸿蒙", "Flutter", "React"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredProjects =
    activeCategory === "全部"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <GradientText colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]} animationSpeed={6}>
            项目作品
          </GradientText>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
          精选项目作品，展示技术实力和创造力
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white border border-neutral-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <StarBorder
              key={project.id}
              color="#3b82f6"
              speed="6s"
            >
              <div className="bg-neutral-950 border border-neutral-800 group overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    查看详情
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </StarBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
