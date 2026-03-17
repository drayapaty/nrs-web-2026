"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import {
  getLectures,
  getBlogs,
  getQuoteOfTheDay,
  type Lecture,
  type BlogPost,
  type Quote,
} from "@/lib/api";

/* ── fallback static data ── */
const fallbackLectures: Partial<Lecture>[] = [
  { title_en: "Sunday Program Lecture - BG 10.11", date: "2026-03-08", place_en: "Kyiv", length: "49:44" },
  { title_en: "Vyasa Puja Lecture", date: "2026-03-07", place_en: "Kyiv", length: "1:11:25" },
  { title_en: "Initiation Lecture", date: "2026-03-06", place_en: "Kyiv", length: "57:36" },
  { title_en: "Gaura Purnima Lecture - CC Madhya 6.255", date: "2026-03-03", place_en: "Kyiv", length: "47:31" },
];

const fallbackBlogs: Partial<BlogPost>[] = [
  { title_en: "Gaura Purnima Lectures", excerpt_en: "Below is a playlist of Gaura Purnima Lectures.", date: "2026-03-02", tags: ["Gaura Purnima"] },
  { title_en: "The Departure of His Holiness Badrinarayan Maharaja", excerpt_en: "Last night, I received the devastating news that my dear godbrother...", date: "2026-02-27", tags: ["In Memoriam"] },
  { title_en: "Online Vyasa Puja Lecture", excerpt_en: "Vyasa Puja celebration from Hungary, broadcast online...", date: "2026-02-22", tags: ["Vyasa Puja"] },
];

const fallbackQuote: Quote = {
  _id: "fallback",
  text_en: "There is no guarantee that after initiation, advancement will be quicker. But at initiation, the disciple makes a commitment and should then draw strength from that commitment.",
  source_en: "Lectures from a Disciple, Vol. 2",
  date: "March 16",
};

function fmtDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return dateStr; }
}

/* ── Media categories for horizontal scroll ── */
const mediaCategories = (lang: string) => [
  { label: lang === "en" ? "Lectures" : "Лекции", count: "1,200+", href: "/media/lectures", gradient: "from-[#2a1a10] to-[#4a2e1a]", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
  { label: lang === "en" ? "Kirtans" : "Киртаны", count: "200+", href: "/media/kirtans", gradient: "from-[#1a2e1a] to-[#2a4a2a]", icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" },
  { label: lang === "en" ? "Video" : "Видео", count: "300+", href: "/media/video", gradient: "from-[#1a1a2e] to-[#2a2a4a]", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { label: lang === "en" ? "Gallery" : "Галерея", count: "60+", href: "/media/gallery", gradient: "from-[#2e1a2a] to-[#4a2a3a]", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: lang === "en" ? "Transcriptions" : "Транскрипции", count: "50+", href: "/media/transcriptions", gradient: "from-[#2a2010] to-[#4a3a1a]", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

export default function Home() {
  const { lang, t } = useLanguage();

  const { data: lectureData } = useApi(
    () => getLectures(1, 4),
    { lectures: [], total: 0, page: 1, pages: 1 }
  );
  const { data: blogData } = useApi(
    () => getBlogs(1, 3),
    { blogs: [], total: 0, page: 1, pages: 1 }
  );
  const { data: quoteData } = useApi(
    () => getQuoteOfTheDay(),
    fallbackQuote
  );

  const lectures: Partial<Lecture>[] = lectureData.lectures.length > 0 ? lectureData.lectures : fallbackLectures;
  const blogs: Partial<BlogPost>[] = blogData.blogs.length > 0 ? blogData.blogs : fallbackBlogs;
  const quote = quoteData._id !== "fallback" ? quoteData : fallbackQuote;

  return (
    <main className="overflow-x-hidden">
      <Navigation />

      {/* ═══════════════════════════════════════════════
          HERO — Cinematic, full viewport, image-first
         ═══════════════════════════════════════════════ */}
      <section className="relative h-[100svh] min-h-[600px]">
        {/* Background image with Ken Burns */}
        <div className="absolute inset-0 hero-kenburns">
          <Image
            src="/images/hero-niranjana.png"
            alt="H.H. Niranjana Swami"
            fill
            className="object-cover object-[center_20%]"
            priority
            sizes="100vw"
          />
        </div>

        {/* Minimal bottom-only gradient — lets the image breathe */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 via-40% to-transparent" />

        {/* Saffron accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] hero-shimmer z-20" />

        {/* Ambient glow orb */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-saffron-500/10 rounded-full blur-[120px] hero-glow pointer-events-none" />

        {/* Hero content — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-[1400px] mx-auto">
            {/* Eyebrow */}
            <p className="hero-fade-1 text-saffron-400/80 text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] mb-4 sm:mb-5">
              {lang === "en" ? "Welcome" : "Добро пожаловать"}
            </p>

            {/* Name — large editorial type */}
            <h1 className="hero-fade-2 font-display text-[clamp(2.5rem,8vw,7rem)] font-bold text-white leading-[0.95] tracking-tight">
              {lang === "en" ? (
                <>
                  Niranjana<br />
                  <span className="text-saffron-400">Swami</span>
                </>
              ) : (
                <>
                  Ниранджана<br />
                  <span className="text-saffron-400">Свами</span>
                </>
              )}
            </h1>

            {/* Subtitle + CTA row */}
            <div className="hero-fade-3 mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-12">
              <p className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed font-light">
                {lang === "en"
                  ? "Lectures, kirtans, and spiritual guidance — sharing the timeless teachings of Srila Prabhupada."
                  : "Лекции, киртаны и духовное руководство — делимся вечными учениями Шрилы Прабхупады."}
              </p>

              <div className="hero-fade-4 flex items-center gap-3 shrink-0">
                <Link
                  href="/media/lectures"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-saffron-500 text-white text-sm font-medium transition-all duration-300 hover:bg-saffron-400 hover:shadow-[0_0_30px_rgba(238,140,20,0.3)]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  {lang === "en" ? "Listen" : "Слушать"}
                </Link>
                <Link
                  href="/biography"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white/90 text-sm font-medium border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                >
                  {lang === "en" ? "Biography" : "Биография"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 hero-scroll-hint z-10">
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MAHA MANTRA MARQUEE — Full-bleed saffron strip
         ═══════════════════════════════════════════════ */}
      <div className="bg-saffron-600 py-4">
        <Marquee
          text="Hare Krishna Hare Krishna · Krishna Krishna Hare Hare · Hare Rama Hare Rama · Rama Rama Hare Hare"
          separator="   ✦   "
          speed={40}
          className="text-white/90 font-display text-sm sm:text-base italic tracking-wide"
        />
      </div>

      {/* ═══════════════════════════════════════════════
          QUOTE — Large editorial typography, no card
         ═══════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 bg-temple-50">
        <ScrollReveal className="max-w-4xl mx-auto text-center">
          {/* Decorative lotus */}
          <div className="divider-lotus text-saffron-400/60 text-2xl mb-12">✿</div>

          <blockquote>
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-temple-900 leading-snug italic font-medium">
              &ldquo;{t(quote.text_en, quote.text_cyr)}&rdquo;
            </p>
          </blockquote>

          <div className="mt-8 space-y-1">
            <p className="text-saffron-700 font-semibold text-sm tracking-wide uppercase">
              {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
            </p>
            <p className="text-temple-400 text-xs">
              {t(quote.source_en, quote.source_cyr)}
            </p>
          </div>

          <div className="divider-lotus text-saffron-400/60 text-2xl mt-12">✿</div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════
          RECENT LECTURES — Dark cinematic section
         ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#1a1210] overflow-hidden">
        {/* Ambient texture */}
        <div className="absolute inset-0 opacity-5">
          <Image src="/images/bg-temple.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left — content */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="text-saffron-400/70 text-[11px] uppercase tracking-[0.3em] font-medium mb-3">
                  {lang === "en" ? "Latest" : "Новое"}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
                  {lang === "en" ? "Recent Lectures" : "Последние лекции"}
                </h2>
                <div className="w-16 h-[2px] bg-saffron-500 mt-5 mb-10" />
              </ScrollReveal>

              <div className="space-y-0 divide-y divide-white/10">
                {lectures.map((lecture, i) => (
                  <ScrollReveal key={i} delay={i * 100}>
                    <Link
                      href="/media/lectures"
                      className="group flex items-center gap-5 py-5 hover:bg-white/[0.03] -mx-3 px-3 transition-colors rounded-lg"
                    >
                      {/* Play circle */}
                      <div className="flex-shrink-0 w-11 h-11 rounded-full border border-saffron-500/40 flex items-center justify-center group-hover:bg-saffron-500 group-hover:border-saffron-500 transition-all duration-300">
                        <svg className="w-4 h-4 ml-0.5 text-saffron-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm sm:text-base font-medium truncate group-hover:text-saffron-300 transition-colors">
                          {t(lecture.title_en, (lecture as Lecture).title_cyr)}
                        </p>
                        <p className="text-white/40 text-xs mt-1">
                          {lecture.date ? fmtDate(lecture.date) : ""}{lecture.place_en ? ` · ${t(lecture.place_en, (lecture as Lecture).place_cyr)}` : ""}
                        </p>
                      </div>

                      {/* Duration */}
                      <span className="hidden sm:block text-white/30 text-xs font-mono shrink-0">
                        {lecture.length}
                      </span>

                      {/* Arrow */}
                      <svg className="w-4 h-4 text-white/20 group-hover:text-saffron-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={400}>
                <Link
                  href="/media/lectures"
                  className="inline-flex items-center gap-2 mt-8 text-saffron-400 text-sm font-medium hover:text-saffron-300 transition-colors group"
                >
                  {lang === "en" ? "Browse all lectures" : "Все лекции"}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </ScrollReveal>
            </div>

            {/* Right — editorial image */}
            <div className="hidden lg:flex lg:col-span-5 items-center">
              <ScrollReveal direction="right" className="relative w-full">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/images/niranjana-kirtan.png"
                    alt="H.H. Niranjana Swami leading kirtan"
                    fill
                    className="object-cover"
                  />
                  {/* Subtle frame accent */}
                  <div className="absolute -inset-3 border border-saffron-500/20 pointer-events-none" />
                </div>
                <p className="mt-4 text-white/30 text-xs italic">
                  {lang === "en" ? "Leading kirtan with devotees" : "Ведёт киртан с преданными"}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BLOG — Editorial list, minimal, no cards
         ═══════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 bg-temple-50">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-saffron-600/70 text-[11px] uppercase tracking-[0.3em] font-medium mb-3">
                  {lang === "en" ? "From the Blog" : "Из блога"}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-temple-900">
                  {lang === "en" ? "Latest Writing" : "Последние записи"}
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-temple-500 hover:text-saffron-600 transition-colors group"
              >
                {lang === "en" ? "All posts" : "Все записи"}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-temple-200">
            {blogs.map((post, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <Link href="/blog" className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-7 hover:bg-white/50 -mx-4 px-4 transition-colors rounded-lg">
                  {/* Date column */}
                  <time className="text-temple-400 text-xs sm:text-sm font-mono shrink-0 sm:w-28">
                    {post.date ? fmtDate(post.date) : ""}
                  </time>

                  {/* Title + excerpt */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-temple-900 group-hover:text-saffron-700 transition-colors leading-snug">
                      {t(post.title_en, (post as BlogPost).title_cyr)}
                    </h3>
                    <p className="mt-1.5 text-temple-500 text-sm leading-relaxed line-clamp-1">
                      {t(post.excerpt_en, (post as BlogPost).excerpt_cyr) || t((post as BlogPost).body_en?.slice(0, 120), (post as BlogPost).body_cyr?.slice(0, 120))}
                    </p>
                  </div>

                  {/* Tag */}
                  {post.tags?.[0] && (
                    <span className="text-xs text-saffron-600/70 font-medium shrink-0 hidden md:block">
                      {post.tags[0]}
                    </span>
                  )}

                  {/* Arrow */}
                  <svg className="w-5 h-5 text-temple-300 group-hover:text-saffron-500 transition-colors shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog" className="text-sm font-medium text-saffron-600">
              {lang === "en" ? "All posts" : "Все записи"} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MEDIA LIBRARY — Horizontal scroll, dark
         ═══════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-[#12100e]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-10">
          <ScrollReveal>
            <p className="text-saffron-400/70 text-[11px] uppercase tracking-[0.3em] font-medium mb-3">
              {lang === "en" ? "Explore" : "Изучить"}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              {lang === "en" ? "Media Library" : "Медиатека"}
            </h2>
            <p className="mt-3 text-white/40 text-sm max-w-md">
              {lang === "en"
                ? "Over two decades of lectures, kirtans, and spiritual teachings."
                : "Более двух десятилетий лекций, киртанов и духовных наставлений."}
            </p>
          </ScrollReveal>
        </div>

        {/* Horizontal scroll strip */}
        <div className="overflow-x-auto scrollbar-hide px-6 sm:px-8">
          <div className="flex gap-4 sm:gap-5 pb-4" style={{ minWidth: "max-content" }}>
            {mediaCategories(lang).map((cat, i) => (
              <ScrollReveal key={cat.href} delay={i * 80} direction="none">
                <Link
                  href={cat.href}
                  className="group relative block w-[260px] sm:w-[300px] aspect-[3/4] overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Icon */}
                  <div className="absolute top-6 left-6">
                    <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                    </svg>
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/40 text-xs font-mono mb-2">{cat.count}</p>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-saffron-300 transition-colors">
                      {cat.label}
                    </h3>
                    <div className="mt-3 w-0 group-hover:w-full h-[1px] bg-saffron-400/50 transition-all duration-500" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SRILA PRABHUPADA — Asymmetric editorial
         ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 overflow-hidden bg-temple-50">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <Image src="/images/bg-temple.png" alt="" fill className="object-cover" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Image — left */}
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/bio-prabhupada.png"
                    alt="His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative frame */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-saffron-400/40" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-saffron-400/40" />
              </div>
            </ScrollReveal>

            {/* Text — right */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <Image src="/images/iskcon-logo.svg" alt="ISKCON" width={28} height={28} className="opacity-70" />
                  <p className="text-[11px] uppercase tracking-[0.3em] text-saffron-700/80 font-medium">
                    {lang === "en" ? "ISKCON Founder–Acharya" : "Основатель–Ачарья ИСККОН"}
                  </p>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-temple-900 leading-[1.1]">
                  {lang === "en" ? (
                    <>His Divine Grace<br /><span className="text-saffron-700">A.C. Bhaktivedanta Swami<br />Prabhupada</span></>
                  ) : (
                    <>Его Божественная Милость<br /><span className="text-saffron-700">А.Ч. Бхактиведанта Свами Прабхупада</span></>
                  )}
                </h2>

                <div className="w-16 h-[2px] bg-saffron-500 mt-6 mb-8" />

                <p className="text-temple-700 text-base sm:text-lg leading-relaxed">
                  {lang === "en"
                    ? "Srila Prabhupada left his home and family to fully immerse himself in the path of bhakti yoga, eventually bringing the timeless teachings of Lord Krishna to the Western world and founding the International Society for Krishna Consciousness."
                    : "Шрила Прабхупада оставил дом и семью, чтобы полностью посвятить себя пути бхакти-йоги, принеся вечные учения Господа Кришны в западный мир и основав Международное общество сознания Кришны."}
                </p>

                <p className="mt-5 text-temple-500 leading-relaxed">
                  {lang === "en"
                    ? "His Holiness Niranjana Swami accepted initiation from Srila Prabhupada in the early spring of 1974, and has since dedicated his life to fulfilling the mission of his beloved spiritual master."
                    : "Его Святейшество Ниранджана Свами принял инициацию от Шрилы Прабхупады ранней весной 1974 года и с тех пор посвятил свою жизнь исполнению миссии своего любимого духовного учителя."}
                </p>

                <Link
                  href="/biography"
                  className="inline-flex items-center gap-2 mt-8 text-saffron-600 text-sm font-medium hover:text-saffron-800 transition-colors group"
                >
                  {lang === "en" ? "Read full biography" : "Читать биографию"}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SANKIRTANA — Pull quote, dark sacred
         ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#0f1a0f] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sacred-900/60 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sacred-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sacred-400/60 text-[11px] uppercase tracking-[0.3em] font-medium mb-8">
              {lang === "en" ? "Sankirtana Stories" : "Истории санкиртаны"}
            </p>

            {/* Oversized quote mark */}
            <div className="font-display text-[120px] sm:text-[160px] leading-none text-sacred-500/10 select-none -mb-16 sm:-mb-20">
              &ldquo;
            </div>

            <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white/85 leading-relaxed italic max-w-3xl mx-auto">
              {lang === "en"
                ? "It\u2019s very inspiring when people who took the books come to the temple later. On Thursday I met Andrei on the streets of Kyiv and he bought a set of books, and today on Sunday he came to the temple for the first time."
                : "Очень вдохновляет, когда люди, взявшие книги, потом приходят в храм. В четверг я встретил Андрея на улицах Киева, и он купил комплект книг, а сегодня, в воскресенье, он впервые пришёл в храм."}
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-sacred-400/30" />
              <p className="text-sacred-400/60 text-sm">Ekantita-buddhi das · {lang === "en" ? "Kyiv, Ukraine" : "Киев, Украина"}</p>
              <div className="w-8 h-[1px] bg-sacred-400/30" />
            </div>

            <Link
              href="/sankirtana"
              className="inline-flex items-center gap-2 mt-12 px-7 py-3.5 border border-sacred-500/30 text-sacred-300 text-sm font-medium hover:bg-sacred-500/10 hover:border-sacred-400/40 transition-all duration-300"
            >
              {lang === "en" ? "Read more stories" : "Читать ещё"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
