"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";

export default function NotFoundClient() {
  const { lang } = useLanguage();

  const isEn = lang === "en";

  return (
    <div className="text-center max-w-lg">
      <p className="font-display text-[8rem] sm:text-[10rem] leading-none font-bold text-ink-950/10">
        404
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink-900 -mt-8 mb-4">
        {isEn ? "Page Not Found" : "Страница не найдена"}
      </h1>
      <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
      <p className="text-ink-500 text-base leading-relaxed mb-10">
        {isEn
          ? "The page you are looking for may have been moved or no longer exists."
          : "Возможно, страница была перемещена или больше не существует."}
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 text-sm font-medium tracking-wide uppercase bg-ink-950 text-cream-50 hover:bg-gold-500 transition-colors duration-300"
      >
        {isEn ? "Return Home" : "Вернуться на главную"}
      </Link>
    </div>
  );
}
