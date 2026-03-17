"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getLecture, type Lecture } from "@/lib/api";
import { use } from "react";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch { return dateStr; }
}

export default function LectureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang, t } = useLanguage();

  const { data: lecture, loading, error } = useApi<Lecture>(
    () => getLecture(id),
    {} as Lecture,
    [id]
  );

  const title = t(lecture?.en?.title, lecture?.cyr?.title) || "";
  const dateStr = lecture?.publishedDate || lecture?.lectureDate || "";
  const place = lecture?.place ? t(lecture.place.en, lecture.place.cyr) : "";

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      <section className="relative bg-ink-950 pt-36 sm:pt-40 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[800px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <Link href="/media/lectures" className="hover:text-white transition-colors">
              {lang === "en" ? "Lectures" : "Лекции"}
            </Link>
          </nav>

          {loading ? (
            <div className="space-y-4">
              <div className="h-6 bg-white/10 animate-pulse w-1/3" />
              <div className="h-12 bg-white/10 animate-pulse w-3/4" />
            </div>
          ) : error ? (
            <p className="text-white/40 py-10">{lang === "en" ? "Lecture not found." : "Лекция не найдена."}</p>
          ) : (
            <>
              {dateStr && (
                <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-4">
                  {formatDate(dateStr)}{place ? ` · ${place}` : ""}
                </p>
              )}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {title}
              </h1>
              {lecture?.duration && (
                <p className="text-white/30 text-sm mt-4">{lecture.duration}</p>
              )}
              <div className="w-12 h-[1px] bg-gold-500 mt-8" />
            </>
          )}
        </div>
      </section>

      {/* Audio Player */}
      {!loading && !error && (lecture?.audioLinkPresigned || lecture?.audioLink) && (
        <section className="px-6 sm:px-8 -mt-6 pb-16">
          <div className="max-w-[800px] mx-auto">
            <ScrollReveal>
              <AudioPlayer
                title={title}
                date={`${dateStr ? formatDate(dateStr) : ""}${place ? ` — ${place}` : ""}`}
                duration={lecture?.duration ?? ""}
                audioUrl={lecture?.audioLinkPresigned || lecture?.audioLink}
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="px-6 sm:px-8 py-12">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/media/lectures"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-500 uppercase tracking-wider hover:text-gold-600 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            {lang === "en" ? "All lectures" : "Все лекции"}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
