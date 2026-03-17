"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getBlog, type BlogPost } from "@/lib/api";
import { use } from "react";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch { return dateStr; }
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang, t } = useLanguage();

  const { data: post, loading, error } = useApi<BlogPost>(
    () => getBlog(id),
    {} as BlogPost,
    [id]
  );

  const dateStr = post?.publishDate || post?.blogDate || "";
  const title = t(post?.en?.title, post?.cyr?.title) || "";
  const body = t(post?.en?.body, post?.cyr?.body) || "";

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="relative bg-ink-950 pt-32 sm:pt-40 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[800px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              {lang === "en" ? "Blog" : "Блог"}
            </Link>
          </nav>

          {loading ? (
            <div className="h-12 bg-white/10 animate-pulse w-3/4" />
          ) : (
            <>
              {dateStr && (
                <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-4">
                  {formatDate(dateStr)}
                </p>
              )}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {title}
              </h1>
              <div className="w-12 h-[1px] bg-gold-500 mt-8" />
            </>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="px-6 sm:px-8 py-16 sm:py-24">
        <div className="max-w-[800px] mx-auto">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-5 bg-ink-100 animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
              ))}
            </div>
          ) : error ? (
            <p className="text-ink-400 text-center py-20">
              {lang === "en" ? "Unable to load this post." : "Не удалось загрузить запись."}
            </p>
          ) : (
            <ScrollReveal>
              <article
                className="prose prose-lg max-w-none font-body text-ink-700 leading-relaxed
                  prose-headings:font-display prose-headings:text-ink-900 prose-headings:font-semibold
                  prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-gold-400 prose-blockquote:text-ink-600 prose-blockquote:italic
                  prose-strong:text-ink-900"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </ScrollReveal>
          )}

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-ink-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-500 uppercase tracking-wider hover:text-gold-600 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              {lang === "en" ? "All posts" : "Все записи"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
