import { useState } from "react";
import { Link } from "react-router-dom";
import { noteBooks, bookmarks, articles } from "@/data/profile";
import RotatingMotto from "@/components/ui/RotatingMotto";
import {
  IconBook2,
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
  IconClock,
  IconTag,
  IconBrandJavascript,
  IconBolt,
  IconBrandVue,
  IconBrandReact,
  IconCode,
  IconGitBranch,
  IconDeviceMobile,
  IconRocket,
  IconWorld,
  IconTool,
  IconBookmark,
  IconServer,
  IconFlask,
} from "@tabler/icons-react";

const noteIconMap: Record<string, React.ReactNode> = {
  javascript: <IconBrandJavascript className="w-5 h-5 text-yellow-400" />,
  es6: <IconBolt className="w-5 h-5 text-amber-400" />,
  vue: <IconBrandVue className="w-5 h-5 text-green-400" />,
  react: <IconBrandReact className="w-5 h-5 text-cyan-400" />,
  typescript: <IconCode className="w-5 h-5 text-blue-400" />,
  git: <IconGitBranch className="w-5 h-5 text-orange-400" />,
  harmonyos: <IconDeviceMobile className="w-5 h-5 text-red-400" />,
  flutter: <IconFlask className="w-5 h-5 text-sky-400" />,
  practical: <IconRocket className="w-5 h-5 text-violet-400" />,
  reactnative: <IconDeviceMobile className="w-5 h-5 text-indigo-400" />,
  nodejs: <IconServer className="w-5 h-5 text-green-500" />,
};

const bookmarkIconMap: Record<string, React.ReactNode> = {
  websites: <IconWorld className="w-4 h-4 text-blue-400" />,
  libs: <IconTool className="w-4 h-4 text-violet-400" />,
  tools: <IconTool className="w-4 h-4 text-amber-400" />,
  software: <IconCode className="w-4 h-4 text-cyan-400" />,
  courses: <IconBookmark className="w-4 h-4 text-green-400" />,
};

type Tab = "notes" | "articles" | "bookmarks";

export default function NotesAndBookmarksSection() {
  const [activeTab, setActiveTab] = useState<Tab>("notes");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeBookmarkCat, setActiveBookmarkCat] = useState(bookmarks[0].id);
  const [bmPage, setBmPage] = useState(1);
  const [notePage, setNotePage] = useState(1);
  const [artPage, setArtPage] = useState(1);

  const activeBm = bookmarks.find((b) => b.id === activeBookmarkCat)!;

  const BM_PER_PAGE = 9;
  const NOTE_PER_PAGE = 9;
  const ART_PER_PAGE = 6;

  const bmTotalPages = Math.ceil(activeBm.items.length / BM_PER_PAGE);
  const bmItems = activeBm.items.slice(
    (bmPage - 1) * BM_PER_PAGE,
    bmPage * BM_PER_PAGE
  );

  const noteTotalPages = Math.ceil(noteBooks.length / NOTE_PER_PAGE);
  const noteItems = noteBooks.slice(
    (notePage - 1) * NOTE_PER_PAGE,
    notePage * NOTE_PER_PAGE
  );

  const artTotalPages = Math.ceil(articles.length / ART_PER_PAGE);
  const artItems = articles.slice(
    (artPage - 1) * ART_PER_PAGE,
    artPage * ART_PER_PAGE
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: "notes", label: "我的笔记" },
    { key: "articles", label: "文章" },
    { key: "bookmarks", label: "收藏" },
  ];

  return (
    <section id="notes" className="py-28 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="section-heading font-bold text-3xl md:text-4xl text-center tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          学习笔记 & 收藏
        </h2>
        <RotatingMotto
          mottos={[
            "积跬步以至千里。",
            "Learning never stops.",
            "今天的笔记，明天的经验。",
            "Read, learn, build, repeat.",
            "知识就是力量。",
            "Write down what you learn.",
            "笔记是最好的复习资料。",
          ]}
          interval={4800}
          className="mb-3"
        />
        <p className="text-white/60 text-center max-w-2xl mx-auto mb-10 text-sm">
          积跬步以至千里，致敬每个爱学习的你
        </p>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                data-pill
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/10"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute inset-0 rounded-xl border border-indigo-400/20" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Notes tab */}
          {activeTab === "notes" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {noteItems.map((book) => (
                <div
                  key={book.id}
                  onClick={() =>
                    setExpandedId(expandedId === book.id ? null : book.id)
                  }
                  data-card
                  className="video-card p-5 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.04]">
                        {noteIconMap[book.id] || <IconBook2 className="w-5 h-5 text-slate-400" />}
                      </span>
                      <div>
                        <h3 className="text-white font-semibold text-sm">
                          {book.title}
                        </h3>
                        <span className="text-xs text-white/50">
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

                  <p className="text-xs text-white/60 mb-3 line-clamp-2">
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
                                <IconBook2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 flex-shrink-0" />
                                <span className="truncate">
                                  {article.title}
                                </span>
                              </a>
                            ) : (
                              <Link
                                to={`/note/${book.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors group"
                              >
                                <IconBook2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 flex-shrink-0" />
                                <span className="truncate">
                                  {article.title}
                                </span>
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

              {/* Notes pagination */}
              {noteTotalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setNotePage((p) => Math.max(1, p - 1))}
                    disabled={notePage === 1}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    上一页
                  </button>
                  {Array.from({ length: noteTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setNotePage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                        notePage === i + 1
                          ? "bg-indigo-500/[0.15] text-indigo-300"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setNotePage((p) => Math.min(noteTotalPages, p + 1))}
                    disabled={notePage === noteTotalPages}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    下一页
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Articles tab */}
          {activeTab === "articles" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artItems.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="block video-card p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/[0.1] text-indigo-300 border border-indigo-500/[0.15]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-600">
                      <IconClock className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-600">
                      <IconTag className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-white font-medium text-sm mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-600 bg-white/[0.03] rounded px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
              </div>

              {/* Articles pagination */}
              {artTotalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setArtPage((p) => Math.max(1, p - 1))}
                    disabled={artPage === 1}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    上一页
                  </button>
                  {Array.from({ length: artTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setArtPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                        artPage === i + 1
                          ? "bg-indigo-500/[0.15] text-indigo-300"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setArtPage((p) => Math.min(artTotalPages, p + 1))}
                    disabled={artPage === artTotalPages}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    下一页
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bookmarks tab */}
          {activeTab === "bookmarks" && (
            <div>
              {/* Sub-category pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {bookmarks.map((cat) => (
                  <button
                    key={cat.id}
                    data-pill
                    onClick={() => { setActiveBookmarkCat(cat.id); setBmPage(1); }}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 flex items-center gap-1.5 border ${
                      activeBookmarkCat === cat.id
                        ? "bg-white/[0.08] text-slate-200 border-white/[0.1]"
                        : "text-slate-500 border-white/[0.06] hover:text-slate-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="flex items-center">
                      {bookmarkIconMap[cat.id] || <IconBookmark className="w-4 h-4 text-slate-400" />}
                    </span>
                    {cat.title}
                  </button>
                ))}
              </div>

              <p className="text-slate-500 text-sm mb-6">
                {activeBm.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {bmItems.map((item, i) => (
                  <a
                    key={(bmPage - 1) * BM_PER_PAGE + i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block video-card p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm text-white font-medium">
                        {item.title}
                      </h3>
                      {item.url === "local" ? (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 flex-shrink-0">
                          本地
                        </span>
                      ) : (
                        <IconExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                  </a>
                ))}
              </div>

              {/* Bookmarks pagination */}
              {bmTotalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setBmPage((p) => Math.max(1, p - 1))}
                    disabled={bmPage === 1}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    上一页
                  </button>
                  {Array.from({ length: bmTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setBmPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                        bmPage === i + 1
                          ? "bg-indigo-500/[0.15] text-indigo-300"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setBmPage((p) => Math.min(bmTotalPages, p + 1))}
                    disabled={bmPage === bmTotalPages}
                    className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    下一页
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
