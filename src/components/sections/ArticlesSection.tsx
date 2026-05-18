import { articles } from "@/data/profile";
import { GlareHover } from "@/components/ui/glare-hover";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedList } from "@/components/ui/animated-list";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";

export default function ArticlesSection() {
  return (
    <section id="articles" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <GradientText colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#3b82f6"]} animationSpeed={6}>
            最新动态
          </GradientText>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-sm md:text-base">
          分享技术见解、开发经验和行业思考
        </p>

        <AnimatedList
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={120}
        >
          {articles.map((article) => (
            <GlareHover
              key={article.id}
              background="#0a0a0a"
              borderColor="rgba(59, 130, 246, 0.15)"
              glareColor="rgba(255, 255, 255, 0.06)"
              borderRadius="12px"
              className="p-6 cursor-pointer"
            >
              <a href="#" className="block">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${
                      article.type === "article"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-purple-500/10 text-purple-400"
                    }`}
                  >
                    {article.type === "article" ? (
                      <FaFileAlt className="w-3 h-3" />
                    ) : (
                      <FaPlayCircle className="w-3 h-3" />
                    )}
                    {article.type === "article" ? "文章" : "视频"}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </a>
            </GlareHover>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}
