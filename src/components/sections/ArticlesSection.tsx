import { articles } from "@/data/profile";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";

export default function ArticlesSection() {
  return (
    <section id="articles" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4">
          最新动态
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-sm md:text-base">
          分享技术见解、开发经验和行业思考
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.id}
              href="#"
              className="group relative block rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all duration-300 hover:border-neutral-600 hover:shadow-lg hover:shadow-blue-500/5"
            >
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

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
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
          ))}
        </div>
      </div>
    </section>
  );
}
