"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getLectures, type Lecture } from "@/lib/api";

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
  const [activeFilter, setActiveFilter] = useState("All");

  const { data, loading } = useApi(
    () => getLectures(page, 10),
    { lectures: [], total: 0, page: 1, pages: 1 },
    [page]
  );

  const lectures = data.lectures;
  const totalPages = data.pages || 1;

  const filters = lang === "en"
    ? ["All", "2026", "2025", "English", "Russian", "Ukrainian"]
    : ["Все", "2026", "2025", "Английский", "Русский", "Украинский"];

  return (
    <main className="bg-temple-50 min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-temple-500 mb-6">
            <Link href="/" className="hover:text-saffron-600 transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <Link href="/media/lectures" className="hover:text-saffron-600 transition-colors">
              {lang === "en" ? "Media" : "Медиа"}
            </Link>
            <span>/</span>
            <span className="text-temple-800">{lang === "en" ? "Lectures" : "Лекции"}</span>
          </nav>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-temple-900">
            {lang === "en" ? "Lectures" : "Лекции"}
          </h1>
          <p className="mt-4 text-lg text-temple-600 max-w-2xl">
            {lang === "en"
              ? "Audio lectures on Bhagavad-gita, Srimad Bhagavatam, Caitanya Caritamrita, and various spiritual topics."
              : "Аудиолекции по Бхагавад-гите, Шримад-Бхагаватам, Чайтанья-чаритамрите и различным духовным темам."}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-temple-200 text-sm">
              <svg className="w-4 h-4 text-temple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-temple-600">{lang === "en" ? "Filter" : "Фильтр"}</span>
            </div>
            {filters.map((filter, idx) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  (idx === 0 && activeFilter === filters[0]) || activeFilter === filter
                    ? "bg-saffron-500 text-white"
                    : "bg-white text-temple-600 border border-temple-200 hover:border-saffron-300 hover:text-saffron-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Player — first lecture */}
      {lectures.length > 0 && (
        <section className="px-4 sm:px-6 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-md">
              <AudioPlayer
                title={t(lectures[0].title_en, lectures[0].title_cyr)}
                date={`${formatDate(lectures[0].date)}${lectures[0].place_en ? ` — ${t(lectures[0].place_en, lectures[0].place_cyr)}` : ""}`}
                duration={lectures[0].length ?? ""}
                audioUrl={lectures[0].url}
              />
            </div>
          </div>
        </section>
      )}

      {/* Lecture List */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          {loading && lectures.length === 0 ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 bg-white rounded-xl border border-temple-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {lectures.map((lecture: Lecture, i: number) => (
                <AudioPlayer
                  key={lecture._id || i}
                  title={t(lecture.title_en, lecture.title_cyr)}
                  date={`${formatDate(lecture.date)}${lecture.place_en ? ` — ${t(lecture.place_en, lecture.place_cyr)}` : ""}`}
                  duration={lecture.length ?? ""}
                  audioUrl={lecture.url}
                  compact
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 text-sm font-medium text-temple-500 bg-white rounded-lg border border-temple-200 hover:border-saffron-300 transition-colors disabled:opacity-50"
            >
              {lang === "en" ? "Previous" : "Назад"}
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-saffron-500 text-white"
                    : "bg-white text-temple-600 border border-temple-200 hover:border-saffron-300"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-4 py-2 text-sm font-medium text-temple-600 bg-white rounded-lg border border-temple-200 hover:border-saffron-300 transition-colors disabled:opacity-50"
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
