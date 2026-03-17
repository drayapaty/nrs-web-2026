"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getSankirtana, type SankirtanaStory, type SankirtanaListResponse } from "@/lib/api";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return dateStr; }
}

export default function SankirtanaPage() {
  const { lang } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, loading } = useApi<SankirtanaListResponse>(
    () => getSankirtana(page),
    { results: [], total: 0 },
    [page]
  );

  const stories = data.results || [];

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      <section className="relative bg-ink-950 pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <span className="text-white/70">{lang === "en" ? "Sankirtana" : "Санкиртана"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Community" : "Сообщество"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Sankirtana Stories" : "Истории санкиртаны"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Inspiring stories of book distribution and spreading Krishna consciousness."
              : "Вдохновляющие истории распространения книг и сознания Кришны."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto">
          {loading && stories.length === 0 ? (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 bg-ink-100 animate-pulse" />
              ))}
            </div>
          ) : stories.length === 0 ? (
            <p className="text-ink-400 text-center py-20">
              {lang === "en" ? "No stories found." : "Истории не найдены."}
            </p>
          ) : (
            <div className="space-y-12">
              {stories.map((story: SankirtanaStory, i: number) => (
                <ScrollReveal key={story.uuid || i} delay={i * 60}>
                  <article className="border-b border-ink-200/60 pb-10">
                    <div className="flex items-center gap-3 mb-4">
                      {story.authorDisplayPictureUrl ? (
                        <img
                          src={story.authorDisplayPictureUrl}
                          alt={story.authorName || ""}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-ink-200 flex items-center justify-center">
                          <span className="text-ink-500 text-sm font-display font-bold">
                            {(story.authorName || "?")[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-ink-900 text-sm font-medium">{story.authorName || "Anonymous"}</p>
                        {story.dateCreated && (
                          <p className="text-ink-400 text-xs">{formatDate(story.dateCreated)}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-ink-600 leading-relaxed">
                      {story.title || ""}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}

          {stories.length > 0 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-5 py-2.5 text-[13px] font-medium text-ink-500 border border-ink-200 hover:border-ink-400 transition-colors disabled:opacity-30"
              >
                {lang === "en" ? "Previous" : "Назад"}
              </button>
              <span className="text-ink-400 text-sm">
                {lang === "en" ? `Page ${page}` : `Страница ${page}`}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-5 py-2.5 text-[13px] font-medium text-ink-500 border border-ink-200 hover:border-ink-400 transition-colors"
              >
                {lang === "en" ? "Next" : "Далее"}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
