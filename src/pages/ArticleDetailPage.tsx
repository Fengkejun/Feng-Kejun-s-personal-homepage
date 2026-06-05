import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "@/data/profile";
import { articleContents } from "@/data/content";
import {
  IconArrowLeft,
  IconChevronRight,
  IconFileText,
  IconArticle,
} from "@tabler/icons-react";
import { FaFileAlt, FaPlayCircle } from "react-icons/fa";

export default function ArticleDetailPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const id = Number(articleId);
  const article = articles.find((a) => a.id === id);
  const content = articleContents[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0c1222] text-slate-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">文章不存在</p>
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1222] text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0c1222]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="flex items-center gap-1 text-slate-500 hover:text-slate-200 transition-colors"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            首页
          </Link>
          <IconChevronRight className="w-3 h-3 text-slate-700" />
          <a
            href="/Feng-Kejun-s-personal-homepage/#notes"
            className="text-slate-500 hover:text-slate-200 transition-colors"
          >
            笔记与收藏
          </a>
          <IconChevronRight className="w-3 h-3 text-slate-700" />
          <span className="text-slate-300 font-medium truncate">
            {article.title}
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left sidebar - article list */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-16 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <IconArticle className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-semibold text-slate-200">
                技术文章
              </h2>
              <span className="text-xs text-slate-600 ml-auto">
                {articles.length} 篇
              </span>
            </div>

            <nav className="space-y-0.5 max-h-[70vh] overflow-y-auto">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  to={`/article/${a.id}`}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    a.id === id
                      ? "bg-indigo-400/[0.08] text-indigo-300"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                  }`}
                >
                  {a.type === "article" ? (
                    <FaFileAlt className="w-3 h-3 flex-shrink-0 opacity-50" />
                  ) : (
                    <FaPlayCircle className="w-3 h-3 flex-shrink-0 opacity-50" />
                  )}
                  <span className="truncate">{a.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <article className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-10">
            {/* Article header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400">
                  {article.type === "article" ? (
                    <FaFileAlt className="w-3 h-3" />
                  ) : (
                    <FaPlayCircle className="w-3 h-3" />
                  )}
                  {article.type === "article" ? "文章" : "视频"}
                </span>
                <span className="text-xs text-slate-600">
                  {article.category}
                </span>
                <span className="text-xs text-slate-600">{article.date}</span>
                <span className="text-xs text-slate-600">
                  {article.readTime}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-5 leading-tight">
                {article.title}
              </h1>

              <p className="text-slate-400 text-base leading-relaxed mb-5">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Article content */}
            {content ? (
              <div
                className="prose prose-invert max-w-none
                  prose-headings:text-slate-100 prose-headings:font-bold
                  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/[0.06] prose-h2:pb-3
                  prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-[15px]
                  prose-strong:text-slate-200
                  prose-code:text-indigo-300 prose-code:bg-white/[0.04] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[#0a0d14] prose-pre:border prose-pre:border-white/[0.06] prose-pre:rounded-xl
                  prose-table:text-sm prose-th:text-slate-300 prose-td:text-slate-400
                  prose-a:text-indigo-400 prose-li:text-slate-400
                  prose-blockquote:border-indigo-400/20 prose-blockquote:text-slate-400 prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-xl"
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(content),
                }}
              />
            ) : (
              <div className="text-center py-20">
                <IconFileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">该文章内容正在整理中...</p>
                <p className="text-slate-600 text-sm mt-2">
                  请查看左侧其他文章
                </p>
              </div>
            )}
          </article>

          {/* Prev / Next */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/[0.06]">
            {id > 1 ? (
              <Link
                to={`/article/${id - 1}`}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                ← {articles.find((a) => a.id === id - 1)?.title}
              </Link>
            ) : (
              <span />
            )}
            {id < articles.length ? (
              <Link
                to={`/article/${id + 1}`}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors text-right"
              >
                {articles.find((a) => a.id === id + 1)?.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(
      /\`\`\`(\w*)\n([\s\S]*?)\`\`\`/g,
      '<pre><code class="language-$1">$2</code></pre>'
    )
    .replace(/\`([^`]+)\`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/^\> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hupolb])(.*\S.*)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "")
    .replace(/<p>(<h[1-3]>)/g, "$1")
    .replace(/(<\/h[1-3]>)<\/p>/g, "$1")
    .replace(/<p>(<pre>)/g, "$1")
    .replace(/(<\/pre>)<\/p>/g, "$1")
    .replace(/<p>(<ul>)/g, "$1")
    .replace(/(<\/ul>)<\/p>/g, "$1")
    .replace(/<p>(<blockquote>)/g, "$1")
    .replace(/(<\/blockquote>)<\/p>/g, "$1")
    .trim();
}
