"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

export default function TranscriptionsPage() {
  const { lang } = useLanguage();

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      <section className="relative bg-ink-950 pt-36 sm:pt-40 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <span className="text-white/70">{lang === "en" ? "Transcriptions" : "Транскрипции"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Media" : "Медиа"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Transcriptions" : "Транскрипции"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Written transcriptions of lectures by His Holiness Niranjana Swami."
              : "Письменные транскрипции лекций Его Святейшества Ниранджаны Свами."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-20 sm:py-28">
        <div className="max-w-[1000px] mx-auto text-center">
          <ScrollReveal>
            <div className="py-20">
              <p className="font-display text-2xl text-ink-400 italic">
                {lang === "en" ? "Transcriptions coming soon..." : "Транскрипции скоро появятся..."}
              </p>
              <Link
                href="/media/lectures"
                className="inline-flex items-center gap-2 mt-8 text-[13px] font-medium text-ink-500 uppercase tracking-wider hover:text-gold-600 transition-colors group"
              >
                {lang === "en" ? "Listen to lectures" : "Слушать лекции"}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
