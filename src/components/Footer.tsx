"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";

export default function Footer() {
  const { lang } = useLanguage();

  const mediaLinks = lang === "en"
    ? [["Lectures", "/media/lectures"], ["Kirtans", "/media/kirtans"], ["Video", "/media/video"], ["Gallery", "/media/gallery"], ["Transcriptions", "/media/transcriptions"]]
    : [["Лекции", "/media/lectures"], ["Киртаны", "/media/kirtans"], ["Видео", "/media/video"], ["Галерея", "/media/gallery"], ["Транскрипции", "/media/transcriptions"]];

  const exploreLinks = lang === "en"
    ? [["Biography", "/biography"], ["Blog", "/blog"], ["Quotes", "/quotes"], ["Sankirtana Stories", "/sankirtana"], ["Calendar", "/calendar"]]
    : [["Биография", "/biography"], ["Блог", "/blog"], ["Цитаты", "/quotes"], ["Истории санкиртаны", "/sankirtana"], ["Календарь", "/calendar"]];

  return (
    <footer className="bg-temple-900 text-temple-300">
      {/* Maha Mantra Banner */}
      <div className="bg-saffron-600 py-6 text-center">
        <p className="font-display text-xl sm:text-2xl text-white/95 italic tracking-wide">
          Hare Krishna Hare Krishna &middot; Krishna Krishna Hare Hare
        </p>
        <p className="font-display text-xl sm:text-2xl text-white/95 italic tracking-wide mt-1">
          Hare Rama Hare Rama &middot; Rama Rama Hare Hare
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
            </h3>
            <p className="text-sm leading-relaxed text-temple-400">
              {lang === "en"
                ? "Official website of His Holiness Niranjana Swami, a senior disciple of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada."
                : "Официальный сайт Его Святейшества Ниранджаны Свами, старшего ученика Его Божественной Милости А.Ч. Бхактиведанты Свами Прабхупады."}
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              {lang === "en" ? "Media" : "Медиа"}
            </h3>
            <ul className="space-y-2.5">
              {mediaLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-temple-400 hover:text-saffron-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              {lang === "en" ? "Explore" : "Изучить"}
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-temple-400 hover:text-saffron-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              {lang === "en" ? "Contact" : "Контакты"}
            </h3>
            <p className="text-sm text-temple-400 leading-relaxed">
              1683 Main Street<br />
              East Hartford, CT 06108
            </p>
            <Link
              href="/contacts"
              className="inline-flex mt-4 text-sm text-saffron-400 hover:text-saffron-300 transition-colors font-medium"
            >
              {lang === "en" ? "Contact Us" : "Связаться с нами"} &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-temple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-temple-500">
            &copy; {new Date().getFullYear()} {lang === "en" ? "All Rights Reserved" : "Все права защищены"}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-temple-500 hover:text-temple-300 transition-colors">
              {lang === "en" ? "Privacy Policy" : "Политика конфиденциальности"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
