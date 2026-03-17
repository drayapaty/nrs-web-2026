"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getKirtans, type Kirtan, type KirtanListResponse } from "@/lib/api";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch { return dateStr; }
}

export default function KirtansPage() {
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, loading } = useApi<KirtanListResponse>(
    () => getKirtans(page),
    { results: [], total: 0, page: 1, pages: 1 },
    [page]
  );

  const kirtans = data.results || [];
  const totalPages = data.pages || 1;

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
            <span className="text-white/70">{lang === "en" ? "Kirtans" : "Киртаны"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Media" : "Медиа"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Kirtans" : "Киртаны"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Sacred chanting and devotional music led by His Holiness Niranjana Swami."
              : "Духовное воспевание и преданная музыка под руководством Его Святейшества Ниранджаны Свами."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto">
          {loading && kirtans.length === 0 ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-ink-100 animate-pulse" />
              ))}
            </div>
          ) : kirtans.length === 0 ? (
            <p className="text-ink-400 text-center py-20">
              {lang === "en" ? "No kirtans found." : "Киртаны не найдены."}
            </p>
          ) : (
            <div>
              {kirtans.map((kirtan: Kirtan, i: number) => (
                <ScrollReveal key={kirtan.uuid || i} delay={i * 40}>
                  <AudioPlayer
                    title={t(kirtan.en?.title, kirtan.cyr?.title) || ""}
                    date={`${kirtan.kirtanDate ? formatDate(kirtan.kirtanDate) : ""}${kirtan.en?.location ? ` — ${t(kirtan.en.location, kirtan.cyr?.location)}` : ""}`}
                    duration={kirtan.duration ?? ""}
                    audioUrl={kirtan.audioLinkPresigned || kirtan.audioLink}
                    compact
                  />
                </ScrollReveal>
              ))}
            </div>
          )}

          {totalPages > 1 && (
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
                    p === page ? "bg-ink-900 text-white" : "text-ink-500 border border-ink-200 hover:border-ink-400"
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
