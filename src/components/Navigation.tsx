"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import SearchOverlay from "./SearchOverlay";

const links = [
  { href: "/biography", en: "Biography", ru: "Биография" },
  { href: "/blog", en: "Blog", ru: "Блог" },
  { href: "/media/lectures", en: "Lectures", ru: "Лекции" },
  { href: "/media/kirtans", en: "Kirtans", ru: "Киртаны" },
  { href: "/quotes", en: "Quotes", ru: "Цитаты" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleCmdK = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleCmdK);
    return () => window.removeEventListener("keydown", handleCmdK);
  }, []);

  return (
    <>
      {/* ── Founder-Acharya top bar ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink-950 h-9"
            : "bg-ink-950/80 backdrop-blur-md h-10"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center justify-center">
          <p className="text-[11px] sm:text-[13px] tracking-[0.2em] uppercase font-medium text-gold-400/80">
            {lang === "en"
              ? "ISKCON Founder–Acharya: His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
              : "Основатель–Ачарья ИСККОН: Его Божественная Милость А.Ч. Бхактиведанта Свами Прабхупада"}
          </p>
        </div>
      </div>

      {/* ── Main nav ── */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-9 bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "top-10 bg-ink-950/50 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <nav aria-label="Main navigation" className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Name */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/images/iskcon-logo.svg"
              alt="ISKCON"
              width={42}
              height={42}
              className={`transition-all duration-500 ${
                scrolled ? "opacity-90" : "opacity-80 brightness-0 invert"
              }`}
            />
            <span className={`font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500 ${
              scrolled ? "text-ink-900" : "text-white"
            }`}>
              {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-wide uppercase link-underline transition-colors duration-500 ${
                  scrolled ? "text-ink-600 hover:text-ink-900" : "text-white/70 hover:text-white"
                }`}
              >
                {lang === "en" ? link.en : link.ru}
              </Link>
            ))}

            <button
              onClick={() => setSearchOpen(true)}
              aria-label={lang === "en" ? "Open search" : "Открыть поиск"}
              className={`p-2 transition-colors duration-500 ${
                scrolled ? "text-ink-600 hover:text-ink-900" : "text-white/70 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            <button
              onClick={toggleLang}
              className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-500 ${
                scrolled ? "text-ink-600 hover:text-ink-900" : "text-white/70 hover:text-white"
              }`}
            >
              {lang === "en" ? "РУС" : "ENG"}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? (lang === "en" ? "Close menu" : "Закрыть меню") : (lang === "en" ? "Open menu" : "Открыть меню")}
            className={`lg:hidden p-2 transition-colors duration-500 ${
              scrolled ? "text-ink-700" : "text-white"
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Mobile overlay ── */}
      {open && (
        <div role="dialog" aria-modal="true" aria-label={lang === "en" ? "Navigation menu" : "Меню навигации"} className="fixed inset-0 z-[60] bg-ink-950/95 backdrop-blur-xl flex flex-col justify-center items-center animate-[fadeIn_0.3s_ease-out]">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white p-2"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-8">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl sm:text-4xl text-white/80 hover:text-gold-400 transition-colors animate-[menuFadeIn_0.5s_ease-out_both]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {lang === "en" ? link.en : link.ru}
              </Link>
            ))}

            <button
              onClick={() => { setOpen(false); setTimeout(() => setSearchOpen(true), 200); }}
              className="text-sm uppercase tracking-[0.3em] text-white/40 hover:text-gold-400 transition-colors animate-[menuFadeIn_0.5s_ease-out_both]"
              style={{ animationDelay: `${links.length * 80}ms` }}
            >
              {lang === "en" ? "Search" : "Поиск"}
            </button>

            <button
              onClick={() => { toggleLang(); setOpen(false); }}
              className="mt-2 text-sm uppercase tracking-[0.3em] text-white/40 hover:text-gold-400 transition-colors animate-[menuFadeIn_0.5s_ease-out_both]"
              style={{ animationDelay: `${(links.length + 1) * 80}ms` }}
            >
              {lang === "en" ? "Русский" : "English"}
            </button>
          </nav>
        </div>
      )}

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
