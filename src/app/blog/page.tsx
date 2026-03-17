"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getBlogs, type BlogPost, type BlogListResponse } from "@/lib/api";

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function fmtDateShort(d: string) {
  try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }); }
  catch { return d; }
}

export default function BlogPage() {
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, loading } = useApi<BlogListResponse>(
    () => getBlogs(page),
    { results: [], total: 0, page: 1, pages: 1 },
    [page]
  );

  const blogs = data.results || [];
  const totalPages = data.pages || 1;

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="relative bg-ink-950 pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <span className="text-white/70">{lang === "en" ? "Blog" : "Блог"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Journal" : "Журнал"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Blog" : "Блог"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Messages, reflections, and updates from His Holiness Niranjana Swami."
              : "Послания, размышления и новости от Его Святейшества Ниранджаны Свами."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      {/* Blog List */}
      <section className="px-6 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto">
          {loading && blogs.length === 0 ? (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-ink-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-ink-200/60">
              {blogs.map((post: BlogPost, i: number) => {
                const tag = post.tags?.en?.[0] ?? "";
                const dateStr = post.publishDate || post.blogDate || "";
                return (
                  <ScrollReveal key={post.uuid || i} delay={i * 60}>
                    <Link
                      href={post.uuid ? `/blog/${post.uuid}` : "#"}
                      className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 py-8 transition-colors"
                    >
                      <time className="text-ink-400 text-xs font-mono shrink-0 sm:w-28 counter-label">
                        {dateStr ? fmtDateShort(dateStr) : ""}
                      </time>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {tag && (
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-medium">
                              {tag}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-900 group-hover:text-gold-600 transition-colors leading-snug">
                          {t(post.en?.title, post.cyr?.title)}
                        </h3>
                        <p className="mt-2 text-ink-400 text-sm leading-relaxed line-clamp-2">
                          {t(post.en?.body, post.cyr?.body)?.slice(0, 200) || ""}
                        </p>
                      </div>

                      <svg className="w-5 h-5 text-ink-300 group-hover:text-gold-500 shrink-0 hidden sm:block transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-5 py-2.5 text-[13px] font-medium text-ink-500 border border-ink-200 hover:border-ink-400 transition-colors disabled:opacity-30"
            >
              {lang === "en" ? "Previous" : "Назад"}
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 text-[13px] font-medium transition-colors ${
                  p === page
                    ? "bg-ink-900 text-white"
                    : "text-ink-500 border border-ink-200 hover:border-ink-400"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-5 py-2.5 text-[13px] font-medium text-ink-500 border border-ink-200 hover:border-ink-400 transition-colors disabled:opacity-30"
            >
              {lang === "en" ? "Next" : "Далее"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
