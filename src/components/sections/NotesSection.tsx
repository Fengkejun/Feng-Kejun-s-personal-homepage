import { useState } from "react";
import { Link } from "react-router-dom";
import { noteBooks } from "@/data/profile";
import { IconBook2, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export default function NotesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="notes" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-slate-100 font-bold text-3xl md:text-4xl text-center mb-4 tracking-tight">
          学习笔记
        </h2>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-16 text-sm">
          积跬步以至千里，致敬每个爱学习的你
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {noteBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => toggle(book.id)}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 cursor-pointer hover:border-white/[0.1] hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{book.icon}</span>
                  <div>
                    <h3 className="text-slate-200 font-semibold text-sm">
                      {book.title}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {book.category} · {book.articleCount} 篇
                    </span>
                  </div>
                </div>
                <button className="text-slate-600 mt-1">
                  {expandedId === book.id ? (
                    <IconChevronUp className="w-4 h-4" />
                  ) : (
                    <IconChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                {book.description}
              </p>

              {expandedId === book.id && (
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <ul className="space-y-2">
                    {book.articles.map((article) => (
                      <li key={article.id}>
                        {article.link !== "#" ? (
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors group"
                          >
                            <IconBook2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                            <span className="truncate">{article.title}</span>
                          </a>
                        ) : (
                          <Link
                            to={`/note/${book.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors group"
                          >
                            <IconBook2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                            <span className="truncate">{article.title}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-xs text-slate-600">
                    共 {book.articleCount} 篇笔记
                  </div>
                </div>
              )}

              {expandedId !== book.id && (
                <div className="flex flex-wrap gap-1.5">
                  {book.articles.slice(0, 3).map((article) => (
                    <span
                      key={article.id}
                      className="text-xs bg-white/[0.04] text-slate-500 rounded-md px-2 py-0.5"
                    >
                      {article.title.length > 12
                        ? article.title.slice(0, 12) + "..."
                        : article.title}
                    </span>
                  ))}
                  {book.articles.length > 3 && (
                    <span className="text-xs text-slate-600">
                      +{book.articles.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
