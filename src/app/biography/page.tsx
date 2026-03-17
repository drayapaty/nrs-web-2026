"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

const timeline = [
  {
    year: "1952",
    en: "His Holiness Niranjana Swami was born on December 10, 1952, in Lowell, Massachusetts, USA.",
    ru: "Его Святейшество Ниранджана Свами родился 10 декабря 1952 года в Лоуэлле, штат Массачусетс, США.",
  },
  {
    year: "1972",
    en: "His spiritual search took a turning point when he saw a Bhagavad-gita As It Is on the counter of a bookshop in Washington, DC. After completing his study, he continued his research of Gaudiya Vaishnava philosophy by purchasing and reading several other publications from His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.",
    ru: "Его духовный поиск принял решающий поворот, когда он увидел «Бхагавад-гиту как она есть» на прилавке книжного магазина в Вашингтоне. Завершив изучение, он продолжил исследование гаудия-вайшнавской философии, приобретая и читая другие книги Его Божественной Милости А.Ч. Бхактиведанты Свами Прабхупады.",
  },
  {
    year: "1973–1974",
    en: "By mid-1973, he accepted a monastic life, moved into the Boston ISKCON temple, and accepted initiation from his spiritual master, Srila Prabhupada, in the early spring of 1974. Soon thereafter he received the sannyasa order of life.",
    ru: "К середине 1973 года он принял монашескую жизнь, переехал в бостонский храм ИСККОН и принял инициацию от своего духовного учителя, Шрилы Прабхупады, ранней весной 1974 года. Вскоре после этого он принял санньясу.",
  },
  {
    year: "1977–1990s",
    en: "Following Srila Prabhupada's departure, he dedicated himself to preaching throughout Eastern Europe and the former Soviet Union, becoming one of ISKCON's most prolific traveling preachers in the region.",
    ru: "После ухода Шрилы Прабхупады он посвятил себя проповеди по всей Восточной Европе и бывшему Советскому Союзу, став одним из самых активных странствующих проповедников ИСККОН в регионе.",
  },
  {
    year: "Present",
    en: "He continues to serve as a member of ISKCON's Governing Body Commission (GBC) and travels extensively, delivering lectures, leading kirtans, and guiding disciples in countries throughout Europe, Asia, and beyond.",
    ru: "Он продолжает служить членом Руководящего совета ИСККОН (GBC) и активно путешествует, читая лекции, ведя киртаны и наставляя учеников в странах Европы, Азии и по всему миру.",
  },
];

export default function BiographyPage() {
  const { lang, t } = useLanguage();

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative bg-ink-950 pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <span className="text-white/70">{lang === "en" ? "Biography" : "Биография"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Biography" : "Биография"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {lang === "en" ? (
              <>His Holiness<br /><span className="text-gold-300">Niranjana Swami</span></>
            ) : (
              <>Его Святейшество<br /><span className="text-gold-300">Ниранджана Свами</span></>
            )}
          </h1>
          <p className="mt-6 text-white/40 leading-relaxed max-w-2xl">
            {lang === "en"
              ? "A senior disciple of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, dedicated to sharing the timeless teachings of bhakti yoga throughout the world."
              : "Старший ученик Его Божественной Милости А.Ч. Бхактиведанты Свами Прабхупады, посвятивший себя распространению вечных учений бхакти-йоги по всему миру."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 sm:px-8 py-20 sm:py-28">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] sm:left-[31px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-400/40 via-ink-200 to-transparent" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="relative flex gap-8 sm:gap-12">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 border border-ink-200 bg-cream-50 flex items-center justify-center">
                        <span className="font-display text-xs sm:text-sm font-semibold text-ink-600">
                          {item.year.slice(0, 4)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="font-display text-xl font-semibold text-ink-900 mb-3">
                        {item.year}
                      </h3>
                      <p className="text-ink-500 leading-relaxed">
                        {lang === "en" ? item.en : item.ru}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Srila Prabhupada link */}
      <section className="px-6 sm:px-8 pb-20">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="border border-ink-200 p-8 sm:p-10 hover:border-gold-400/40 transition-colors group">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-medium mb-3">
                {lang === "en" ? "Also Read" : "Также читайте"}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 group-hover:text-gold-600 transition-colors">
                {lang === "en"
                  ? "His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
                  : "Его Божественная Милость А.Ч. Бхактиведанта Свами Прабхупада"}
              </h2>
              <p className="mt-3 text-ink-400">
                {lang === "en"
                  ? "The Founder-Acharya of the International Society for Krishna Consciousness (ISKCON)"
                  : "Основатель-Ачарья Международного общества сознания Кришны (ИСККОН)"}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
