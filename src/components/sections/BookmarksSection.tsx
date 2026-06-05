import { useState } from "react";
import { AnimatedList } from "@/components/ui/animated-list";
import { bookmarks } from "@/data/profile";
import { IconExternalLink } from "@tabler/icons-react";

export default function BookmarksSection() {
  const [activeCategory, setActiveCategory] = useState(bookmarks[0].id);

  const active = bookmarks.find((b) => b.id === activeCategory)!;

  return (
    <section id="bookmarks" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-slate-100 font-bold text-3xl md:text-5xl text-center mb-4 tracking-tight">
          我的收藏
        </h2>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-12 text-sm">
          日常开发中收藏的优质资源和工具
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {bookmarks.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? "bg-white/[0.08] text-slate-200 border-white/[0.06]"
                  : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-slate-300"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.title}
            </button>
          ))}
        </div>

        <div>
          <p className="text-slate-500 text-sm text-center mb-8">
            {active.description}
          </p>

          <AnimatedList
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            staggerDelay={80}
          >
            {active.items.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm text-slate-200">
                    {item.title}
                  </h3>
                  {item.url === "local" ? (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 flex-shrink-0 mt-0.5">
                      本地
                    </span>
                  ) : (
                    <IconExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5" />
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.description}
                </p>
              </a>
            ))}
          </AnimatedList>
        </div>
      </div>
    </section>
  );
}
