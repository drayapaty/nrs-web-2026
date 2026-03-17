"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getQuotes, type Quote, type QuoteListResponse } from "@/lib/api";

export default function QuotesPage() {
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, loading } = useApi<QuoteListResponse>(
    () => getQuotes(page),
    { results: [], total: 0 },
    [page]
  );

  const quotes = data.results || [];

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
            <span className="text-white/70">{lang === "en" ? "Quotes" : "Цитаты"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Wisdom" : "Мудрость"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Quotes" : "Цитаты"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Daily inspiration and wisdom from the teachings of His Holiness Niranjana Swami."
              : "Ежедневное вдохновение и мудрость из учений Его Святейшества Ниранджаны Свами."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-16 sm:py-24">
        <div className="max-w-[900px] mx-auto">
          {loading && quotes.length === 0 ? (
            <div className="space-y-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-ink-100 animate-pulse" />
              ))}
            </div>
          ) : quotes.length === 0 ? (
            <p className="text-ink-400 text-center py-20">
              {lang === "en" ? "No quotes found for today." : "Цитат на сегодня не найдено."}
            </p>
          ) : (
            <div className="space-y-16">
              {quotes.map((quote: Quote, i: number) => (
                <ScrollReveal key={quote.uuid || quote._id || i} delay={i * 80}>
                  <blockquote className="relative">
                    <div className="absolute -left-4 sm:-left-8 top-0 w-[2px] h-full bg-gold-400/30" />
                    <p className="font-display text-xl sm:text-2xl lg:text-[1.75rem] text-ink-800 leading-[1.4] font-medium italic pl-6 sm:pl-10">
                      &ldquo;{t(quote.en?.text, quote.cyr?.text)}&rdquo;
                    </p>
                    <footer className="mt-5 pl-6 sm:pl-10 flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-gold-400" />
                      <div>
                        <p className="text-ink-500 text-sm font-medium">
                          {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
                        </p>
                        {(quote.en?.source || quote.cyr?.source) && (
                          <p className="text-ink-400 text-xs mt-0.5">
                            {t(quote.en?.source, quote.cyr?.source)}
                          </p>
                        )}
                      </div>
                    </footer>
                  </blockquote>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
