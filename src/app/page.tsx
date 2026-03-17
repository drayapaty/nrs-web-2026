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
  type LectureListResponse,
  type BlogListResponse,
} from "@/lib/api";

/* ── Fallback data ── */
const fallbackLectures: Partial<Lecture>[] = [
  { en: { title: "Sunday Program Lecture - BG 10.11" }, publishedDate: "2026-03-08", place: { en: "Kyiv" }, duration: "49:44" },
  { en: { title: "Vyasa Puja Lecture" }, publishedDate: "2026-03-07", place: { en: "Kyiv" }, duration: "1:11:25" },
  { en: { title: "Initiation Lecture" }, publishedDate: "2026-03-06", place: { en: "Kyiv" }, duration: "57:36" },
  { en: { title: "Gaura Purnima Lecture - CC Madhya 6.255" }, publishedDate: "2026-03-03", place: { en: "Kyiv" }, duration: "47:31" },
  { en: { title: "SB 6.2.13 - The Ultimate Shelter" }, publishedDate: "2026-02-28", place: { en: "Budapest" }, duration: "1:02:15" },
];

const fallbackBlogs: Partial<BlogPost>[] = [
  { en: { title: "Gaura Purnima Lectures", body: "Below is a playlist of Gaura Purnima Lectures." }, publishDate: "2026-03-02", tags: { en: ["Gaura Purnima"] } },
  { en: { title: "The Departure of His Holiness Badrinarayan Maharaja", body: "Last night, I received the devastating news that my dear godbrother..." }, publishDate: "2026-02-27", tags: { en: ["In Memoriam"] } },
  { en: { title: "Online Vyasa Puja Lecture", body: "Vyasa Puja celebration from Hungary, broadcast online..." }, publishDate: "2026-02-22", tags: { en: ["Vyasa Puja"] } },
];

const fallbackQuote: Quote = {
  _id: "fallback",
  en: { text: "There is no guarantee that after initiation, advancement will be quicker. But at initiation, the disciple makes a commitment and should then draw strength from that commitment.", source: "Lectures from a Disciple, Vol. 2" },
  cyr: { text: "Нет гарантии, что после инициации продвижение будет быстрее. Но при инициации ученик берёт на себя обязательство и должен черпать силу из этого обязательства.", source: "Лекции ученика, том 2" },
  quoteDate: "March 16",
};

function fmtDate(d: string) {
  try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }); }
  catch { return d; }
}

export default function Home() {
  const { lang, t } = useLanguage();

  const { data: lectureData } = useApi<LectureListResponse>(
    () => getLectures(1),
    { results: [], total: 0, page: 1, pages: 1 }
  );
  const { data: blogData } = useApi<BlogListResponse>(
    () => getBlogs(1),
    { results: [], total: 0, page: 1, pages: 1 }
  );
  const { data: quoteData } = useApi<Quote>(
    () => getQuoteOfTheDay(),
    fallbackQuote
  );

  const lectures: Partial<Lecture>[] = lectureData.results?.length > 0 ? lectureData.results.slice(0, 5) : fallbackLectures;
  const blogs: Partial<BlogPost>[] = blogData.results?.length > 0 ? blogData.results.slice(0, 3) : fallbackBlogs;
  const quote = quoteData._id !== "fallback" && (quoteData.en?.text || quoteData.cyr?.text) ? quoteData : fallbackQuote;

  return (
    <main className="overflow-x-hidden bg-cream-50">
      <Navigation />

      {/* ═══════════════════════════════════════
          HERO — Full bleed, cinematic
         ═══════════════════════════════════════ */}
      <section className="relative h-[100svh] min-h-[600px] bg-ink-950">
        <div className="absolute inset-0 hero-kenburns">
          <Image
            src="/images/hero-niranjana.png"
            alt="H.H. Niranjana Swami"
            fill
            className="object-cover object-[center_20%] opacity-70"
            priority
            sizes="100vw"
          />
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 via-30% to-transparent" />

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] hero-shimmer z-20" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="hero-fade-1 text-gold-400 text-[11px] font-medium uppercase tracking-[0.4em] mb-5">
              {lang === "en" ? "Official Website" : "Официальный сайт"}
            </p>

            <h1 className="hero-fade-2 font-display font-bold text-white leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3rem, 10vw, 8.5rem)" }}>
              {lang === "en" ? (
                <>Niranjana<br /><span className="text-gold-300">Swami</span></>
              ) : (
                <>Ниранджана<br /><span className="text-gold-300">Свами</span></>
              )}
            </h1>

            <div className="hero-fade-3 mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
              <p className="text-white/40 text-sm sm:text-base max-w-sm leading-relaxed font-light">
                {lang === "en"
                  ? "Lectures, kirtans & spiritual guidance — sharing the teachings of Srila Prabhupada worldwide."
                  : "Лекции, киртаны и духовное руководство — учения Шрилы Прабхупады по всему миру."}
              </p>

              <div className="hero-fade-4 flex items-center gap-4">
                <Link
                  href="/media/lectures"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-ink-900 text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-gold-400 hover:text-white"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  {lang === "en" ? "Listen" : "Слушать"}
                </Link>
                <Link
                  href="/biography"
                  className="inline-flex items-center px-8 py-4 text-white/70 text-[13px] font-medium uppercase tracking-wider border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300"
                >
                  {lang === "en" ? "About" : "О нём"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-5 left-1/2 hero-scroll-hint z-10">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MANTRA — Quiet, understated
         ═══════════════════════════════════════ */}
      <div className="bg-cream-100 py-5 border-y border-cream-300">
        <Marquee
          text="Hare Krishna Hare Krishna · Krishna Krishna Hare Hare · Hare Rama Hare Rama · Rama Rama Hare Hare"
          separator="       ◆       "
          speed={50}
          className="text-gold-500 font-display text-sm italic tracking-wider"
        />
      </div>

      {/* ═══════════════════════════════════════
          QUOTE — Giant serif, airy
         ═══════════════════════════════════════ */}
      <section className="py-28 sm:py-40 px-6 sm:px-8 bg-cream-50">
        <ScrollReveal className="max-w-5xl mx-auto text-center">
          <div className="divider-line text-ink-300 text-xs mb-16">
            {lang === "en" ? "Quote of the Day" : "Цитата дня"}
          </div>

          <blockquote>
            <p className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-ink-900 leading-[1.3] font-medium italic">
              &ldquo;{t(quote.en?.text, quote.cyr?.text)}&rdquo;
            </p>
          </blockquote>

          <div className="mt-10">
            <div className="w-10 h-[1px] bg-gold-400 mx-auto mb-4" />
            <p className="text-ink-500 text-sm font-medium">
              {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
            </p>
            <p className="text-ink-400 text-xs mt-1">
              {t(quote.en?.source, quote.cyr?.source)}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════
          LECTURES — Split layout, dark
         ═══════════════════════════════════════ */}
      <section className="relative bg-ink-950 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — Image, full height */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/niranjana-kirtan.png"
              alt="Leading kirtan"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink-950/20 lg:bg-transparent" />
          </div>

          {/* Right — Lecture list */}
          <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
            <ScrollReveal>
              <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
                {lang === "en" ? "Latest" : "Новое"}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
                {lang === "en" ? "Lectures" : "Лекции"}
              </h2>
              <div className="w-12 h-[1px] bg-gold-500 mt-5 mb-10" />
            </ScrollReveal>

            <div className="space-y-0 divide-y divide-white/[0.06]">
              {lectures.map((lecture, i) => (
                <ScrollReveal key={lecture.uuid || i} delay={i * 80}>
                  <Link
                    href={lecture.uuid ? `/media/lectures/${lecture.uuid}` : "/media/lectures"}
                    className="group flex items-center gap-4 py-5 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-400/50 group-hover:bg-gold-400/10 transition-all duration-300">
                      <svg className="w-3.5 h-3.5 ml-0.5 text-white/30 group-hover:text-gold-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                        {t(lecture.en?.title, lecture.cyr?.title)}
                      </p>
                      <p className="text-white/25 text-xs mt-1">
                        {(lecture.publishedDate || lecture.lectureDate) ? fmtDate(lecture.publishedDate || lecture.lectureDate || "") : ""}
                        {lecture.place ? ` · ${t(lecture.place.en, lecture.place.cyr)}` : ""}
                        {lecture.duration ? ` · ${lecture.duration}` : ""}
                      </p>
                    </div>

                    <svg className="w-4 h-4 text-white/10 group-hover:text-gold-400/50 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={500}>
              <Link
                href="/media/lectures"
                className="inline-flex items-center gap-2 mt-10 text-gold-400/70 text-[13px] font-medium uppercase tracking-wider hover:text-gold-300 transition-colors group"
              >
                {lang === "en" ? "All lectures" : "Все лекции"}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BLOG — Clean list on white
         ═══════════════════════════════════════ */}
      <section className="py-28 sm:py-36 px-6 sm:px-8 bg-cream-50">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-ink-400 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
                  {lang === "en" ? "Journal" : "Журнал"}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-900">
                  {lang === "en" ? "Recent Writing" : "Записи"}
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium text-ink-400 uppercase tracking-wider hover:text-ink-700 transition-colors group"
              >
                {lang === "en" ? "All" : "Все"}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-ink-200/60">
            {blogs.map((post, i) => (
              <ScrollReveal key={post.uuid || i} delay={i * 100}>
                <Link
                  href={post.uuid ? `/blog/${post.uuid}` : "/blog"}
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10 py-8 transition-colors"
                >
                  <time className="text-ink-400 text-xs font-mono shrink-0 sm:w-24 counter-label">
                    {(post.publishDate || post.blogDate) ? fmtDate(post.publishDate || post.blogDate || "") : ""}
                  </time>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-900 group-hover:text-gold-600 transition-colors leading-snug">
                      {t(post.en?.title, post.cyr?.title)}
                    </h3>
                    <p className="mt-2 text-ink-400 text-sm leading-relaxed line-clamp-1">
                      {t(post.en?.body, post.cyr?.body) || ""}
                    </p>
                  </div>

                  <svg className="w-5 h-5 text-ink-300 group-hover:text-gold-500 shrink-0 hidden sm:block transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MEDIA — Horizontal scroll, minimal
         ═══════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white border-y border-ink-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mb-12">
          <ScrollReveal>
            <p className="text-ink-400 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
              {lang === "en" ? "Explore" : "Изучить"}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink-900">
              {lang === "en" ? "Media" : "Медиа"}
            </h2>
          </ScrollReveal>
        </div>

        <div className="overflow-x-auto scrollbar-hide px-6 sm:px-8 lg:px-12">
          <div className="flex gap-6" style={{ minWidth: "max-content" }}>
            {[
              { en: "Lectures", ru: "Лекции", count: "1,200+", href: "/media/lectures" },
              { en: "Kirtans", ru: "Киртаны", count: "200+", href: "/media/kirtans" },
              { en: "Video", ru: "Видео", count: "300+", href: "/media/video" },
              { en: "Gallery", ru: "Галерея", count: "60+", href: "/media/gallery" },
              { en: "Transcriptions", ru: "Транскрипции", count: "50+", href: "/media/transcriptions" },
            ].map((item, i) => (
              <ScrollReveal key={item.href} delay={i * 80} direction="none">
                <Link
                  href={item.href}
                  className="group block w-[220px] sm:w-[260px] py-10 px-8 border border-ink-100 hover:border-ink-300 transition-all duration-500 hover:bg-ink-50"
                >
                  <p className="text-ink-300 text-xs font-mono counter-label">{item.count}</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 mt-3 group-hover:text-gold-600 transition-colors">
                    {lang === "en" ? item.en : item.ru}
                  </h3>
                  <div className="mt-6 flex items-center gap-2 text-ink-300 group-hover:text-gold-500 transition-colors">
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {lang === "en" ? "Browse" : "Открыть"}
                    </span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRABHUPADA — Elegant, editorial
         ═══════════════════════════════════════ */}
      <section className="py-28 sm:py-36 px-6 sm:px-8 bg-cream-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <Image
                  src="/images/bio-prabhupada.png"
                  alt="His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
                  width={480}
                  height={600}
                  className="w-full object-cover grayscale-[20%]"
                />
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-gold-400/30" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold-400/30" />
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.4em] text-ink-400 font-medium mb-6">
                {lang === "en" ? "ISKCON Founder–Acharya" : "Основатель–Ачарья ИСККОН"}
              </p>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 leading-[1.1]">
                {lang === "en" ? (
                  <>His Divine Grace<br />A.C. Bhaktivedanta<br />Swami Prabhupada</>
                ) : (
                  <>Его Божественная<br />Милость А.Ч. Бхактиведанта<br />Свами Прабхупада</>
                )}
              </h2>

              <div className="w-12 h-[1px] bg-gold-400 mt-6 mb-8" />

              <p className="text-ink-600 text-base sm:text-lg leading-relaxed">
                {lang === "en"
                  ? "Srila Prabhupada brought the timeless teachings of Lord Krishna to the Western world and founded the International Society for Krishna Consciousness."
                  : "Шрила Прабхупада принёс вечные учения Господа Кришны в западный мир и основал Международное общество сознания Кришны."}
              </p>

              <p className="mt-5 text-ink-400 leading-relaxed">
                {lang === "en"
                  ? "His Holiness Niranjana Swami accepted initiation from Srila Prabhupada in the early spring of 1974, dedicating his life to fulfilling the mission of his spiritual master."
                  : "Его Святейшество Ниранджана Свами принял инициацию от Шрилы Прабхупады весной 1974 года, посвятив жизнь миссии своего духовного учителя."}
              </p>

              <Link
                href="/biography"
                className="inline-flex items-center gap-2 mt-10 text-[13px] font-medium text-ink-500 uppercase tracking-wider hover:text-gold-600 transition-colors group"
              >
                {lang === "en" ? "Read biography" : "Читать биографию"}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SANKIRTANA — Minimal dark quote
         ═══════════════════════════════════════ */}
      <section className="py-28 sm:py-36 px-6 sm:px-8 bg-ink-950">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <p className="text-ink-500 text-[11px] uppercase tracking-[0.4em] font-medium mb-12">
            {lang === "en" ? "Sankirtana Stories" : "Истории санкиртаны"}
          </p>

          <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white/70 leading-relaxed italic">
            {lang === "en"
              ? "\u201CIt\u2019s very inspiring when people who took the books come to the temple later. On Thursday I met Andrei on the streets of Kyiv and he bought a set of books, and today on Sunday he came to the temple for the first time.\u201D"
              : "\u201CОчень вдохновляет, когда люди, взявшие книги, потом приходят в храм. В четверг я встретил Андрея на улицах Киева, он купил комплект книг, а в воскресенье впервые пришёл в храм.\u201D"}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="w-8 h-[1px] bg-ink-700" />
            <p className="text-ink-500 text-xs tracking-wide">
              Ekantita-buddhi das · {lang === "en" ? "Kyiv" : "Киев"}
            </p>
            <div className="w-8 h-[1px] bg-ink-700" />
          </div>

          <Link
            href="/sankirtana"
            className="inline-flex items-center gap-2 mt-14 text-[13px] font-medium text-ink-500 uppercase tracking-wider hover:text-white transition-colors group"
          >
            {lang === "en" ? "More stories" : "Ещё истории"}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}
