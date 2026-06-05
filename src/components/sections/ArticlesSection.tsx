import { useState } from "react";
import { Link } from "react-router-dom";
import { articles, articleCategories, hotTags } from "@/data/profile";
import { GlareHover } from "@/components/ui/glare-hover";
import { AnimatedList } from "@/components/ui/animated-list";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";
import { IconTag, IconCategory } from "@tabler/icons-react";

export default function ArticlesSection() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredArticles =
    activeCategory === "全部"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section id="articles" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-slate-100 font-bold text-3xl md:text-5xl text-center mb-4">
          技术文章
        </h2>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-16 text-sm">
          分享技术见解、开发经验和行业思考
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            <AnimatedList
              className="space-y-4"
              staggerDelay={100}
            >
              {filteredArticles.map((article) => (
                <GlareHover
                  key={article.id}
                  background="#0a0a0a"
                  borderColor="rgba(255, 255, 255, 0.06)"
                  glareColor="rgba(255, 255, 255, 0.04)"
                  borderRadius="12px"
                  className="p-5 cursor-pointer"
                >
                  <Link to={`/article/${article.id}`} className="block">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400">
                        {article.type === "article" ? (
                          <FaFileAlt className="w-3 h-3" />
                        ) : (
                          <FaPlayCircle className="w-3 h-3" />
                        )}
                        {article.type === "article" ? "文章" : "视频"}
                      </span>
                      <span className="text-xs text-slate-600">
                        {article.date}
                      </span>
                      <span className="text-xs text-slate-600">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base text-slate-200 font-semibold mb-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-slate-400 mb-3 line-clamp-1">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {article.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-slate-500 bg-white/[0.04] rounded-full px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </GlareHover>
              ))}
            </AnimatedList>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 space-y-6 flex-shrink-0">
            {/* Categories */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <IconCategory className="w-4 h-4 text-slate-500" />
                文章分类
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory("全部")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === "全部"
                      ? "bg-white/[0.06] text-slate-200"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  全部文章
                  <span className="float-right text-slate-600">
                    {articles.length}
                  </span>
                </button>
                {articleCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.name
                        ? "bg-white/[0.06] text-slate-200"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {cat.name}
                    <span className="float-right text-slate-600">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hot Tags */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <IconTag className="w-4 h-4 text-slate-500" />
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {hotTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-white/[0.04] rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
