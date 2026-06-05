import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { noteBooks } from "@/data/profile";
import { noteContents } from "@/data/content";
import { IconBook2, IconArrowLeft, IconChevronRight } from "@tabler/icons-react";

export default function NoteDetailPage() {
  const { noteId } = useParams<{ noteId: string }>();
  const book = noteBooks.find((b) => b.id === noteId);
  const [activeArticle, setActiveArticle] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [noteId, activeArticle]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0c1222] text-slate-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">笔记不存在</p>
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const currentArticle = book.articles[activeArticle];
  const sectionContents = noteContents[book.id];
  const contents = typeof sectionContents === 'object' ? sectionContents : {};

  // Also collect top-level articles that belong to this book
  const topLevelArticles: Record<string, string> = {};
  for (const [key, value] of Object.entries(noteContents)) {
    if (typeof value === 'string' && book.articles.some(a => a.id === key)) {
      topLevelArticles[key] = value;
    }
  }
  const content = contents[currentArticle.title] || contents[currentArticle.id] || topLevelArticles[currentArticle.id] || null;

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
            学习笔记
          </a>
          <IconChevronRight className="w-3 h-3 text-slate-700" />
          <span className="text-slate-300 font-medium truncate">
            {book.title}
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="lg:sticky lg:top-16 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <span className="text-lg">{book.icon}</span>
              <div>
                <h2 className="text-sm font-semibold text-slate-200">{book.title}</h2>
                <span className="text-xs text-slate-500">
                  {book.articleCount} 篇笔记
                </span>
              </div>
            </div>

            <nav className="space-y-0.5 max-h-[60vh] overflow-y-auto">
              {book.articles.map((article, i) => (
                <button
                  key={article.id}
                  onClick={() => setActiveArticle(i)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeArticle === i
                      ? "bg-indigo-400/[0.08] text-indigo-300"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <IconBook2 className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                  <span className="truncate">{article.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <article className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8">
              {currentArticle.title}
            </h1>

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
                <IconBook2 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">该篇笔记内容正在整理中...</p>
                <p className="text-slate-600 text-sm mt-2">
                  请查看其他笔记章节
                </p>
              </div>
            )}
          </article>

          {/* Prev / Next */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setActiveArticle(Math.max(0, activeArticle - 1))}
              disabled={activeArticle === 0}
              className="text-sm text-slate-500 hover:text-slate-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              ← 上一篇
            </button>
            <button
              onClick={() =>
                setActiveArticle(
                  Math.min(book.articles.length - 1, activeArticle + 1)
                )
              }
              disabled={activeArticle === book.articles.length - 1}
              className="text-sm text-slate-500 hover:text-slate-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              下一篇 →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\`\`\`(\w*)\n([\s\S]*?)\`\`\`/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/\`([^`]+)\`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^\> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hupolb])(.*\S.*)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-3]>)/g, '$1')
    .replace(/(<\/h[1-3]>)<\/p>/g, '$1')
    .replace(/<p>(<pre>)/g, '$1')
    .replace(/(<\/pre>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
    .trim();
}
