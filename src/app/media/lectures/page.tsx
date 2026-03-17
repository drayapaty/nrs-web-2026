"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getLectures, type Lecture, type LectureListResponse } from "@/lib/api";

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function LecturesPage() {
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, loading } = useApi<LectureListResponse>(
    () => getLectures(page),
    { results: [], total: 0, page: 1, pages: 1 },
    [page]
  );

  const lectures = data.results || [];
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
            <span className="text-white/70">{lang === "en" ? "Lectures" : "Лекции"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Media" : "Медиа"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Lectures" : "Лекции"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Audio lectures on Bhagavad-gita, Srimad Bhagavatam, Caitanya Caritamrita, and various spiritual topics."
              : "Аудиолекции по Бхагавад-гите, Шримад-Бхагаватам, Чайтанья-чаритамрите и различным духовным темам."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      {/* Featured Player — first lecture */}
      {lectures.length > 0 && (
        <section className="px-6 sm:px-8 -mt-6">
          <div className="max-w-[1000px] mx-auto">
            <div className="max-w-md">
              <AudioPlayer
                title={t(lectures[0].en?.title, lectures[0].cyr?.title) || ""}
                date={`${formatDate(lectures[0].publishedDate || lectures[0].lectureDate || "")}${lectures[0].place ? ` — ${t(lectures[0].place.en, lectures[0].place.cyr)}` : ""}`}
                duration={lectures[0].duration ?? ""}
                audioUrl={lectures[0].audioLinkPresigned || lectures[0].audioLink}
              />
            </div>
          </div>
        </section>
      )}

      {/* Lecture List */}
      <section className="px-6 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto">
          {loading && lectures.length === 0 ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-ink-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div>
              {lectures.map((lecture: Lecture, i: number) => (
                <ScrollReveal key={lecture.uuid || i} delay={i * 40}>
                  <AudioPlayer
                    title={t(lecture.en?.title, lecture.cyr?.title) || ""}
                    date={`${formatDate(lecture.publishedDate || lecture.lectureDate || "")}${lecture.place ? ` — ${t(lecture.place.en, lecture.place.cyr)}` : ""}`}
                    duration={lecture.duration ?? ""}
                    audioUrl={lecture.audioLinkPresigned || lecture.audioLink}
                    compact
                  />
                </ScrollReveal>
              ))}
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
