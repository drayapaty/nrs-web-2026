"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-ink-950 text-ink-400">
      {/* Mantra strip */}
      <div className="py-8 text-center border-b border-white/[0.06]">
        <p className="font-display text-lg sm:text-xl text-white/20 italic tracking-widest">
          Hare Krishna Hare Krishna · Krishna Krishna Hare Hare · Hare Rama Hare Rama · Rama Rama Hare Hare
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-2xl text-white font-semibold tracking-tight">
              {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-500 max-w-xs">
              {lang === "en"
                ? "Official website. A senior disciple of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada."
                : "Официальный сайт. Старший ученик Его Божественной Милости А.Ч. Бхактиведанты Свами Прабхупады."}
            </p>
          </div>

          {/* Media */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-500 mb-5">
              {lang === "en" ? "Media" : "Медиа"}
            </p>
            <ul className="space-y-3">
              {(lang === "en"
                ? [["Lectures", "/media/lectures"], ["Kirtans", "/media/kirtans"], ["Video", "/media/video"], ["Gallery", "/media/gallery"]]
                : [["Лекции", "/media/lectures"], ["Киртаны", "/media/kirtans"], ["Видео", "/media/video"], ["Галерея", "/media/gallery"]]
              ).map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-ink-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-500 mb-5">
              {lang === "en" ? "Explore" : "Изучить"}
            </p>
            <ul className="space-y-3">
              {(lang === "en"
                ? [["Biography", "/biography"], ["Blog", "/blog"], ["Quotes", "/quotes"], ["Sankirtana", "/sankirtana"]]
                : [["Биография", "/biography"], ["Блог", "/blog"], ["Цитаты", "/quotes"], ["Санкиртана", "/sankirtana"]]
              ).map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-ink-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-500 mb-5">
              {lang === "en" ? "Connect" : "Контакты"}
            </p>
            <Link
              href="/contacts"
              className="text-sm text-ink-400 hover:text-white transition-colors"
            >
              {lang === "en" ? "Contact Us" : "Связаться с нами"}
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-600">
            &copy; {new Date().getFullYear()} {lang === "en" ? "Niranjana Swami. All rights reserved." : "Ниранджана Свами. Все права защищены."}
          </p>
          <p className="text-[10px] text-ink-700 uppercase tracking-widest">
            ISKCON Founder–Acharya His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
          </p>
        </div>
      </div>
    </footer>
  );
}
