"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language";

const navLinks = [
  { href: "/biography", label: "Biography", labelCyr: "Биография" },
  { href: "/blog", label: "Blog", labelCyr: "Блог" },
  {
    href: "/media/lectures",
    label: "Media",
    labelCyr: "Медиа",
    children: [
      { href: "/media/lectures", label: "Lectures", labelCyr: "Лекции" },
      { href: "/media/kirtans", label: "Kirtans", labelCyr: "Киртаны" },
      { href: "/media/video", label: "Video", labelCyr: "Видео" },
      { href: "/media/gallery", label: "Gallery", labelCyr: "Галерея" },
      { href: "/media/transcriptions", label: "Transcriptions", labelCyr: "Транскрипции" },
      { href: "/media/summaries", label: "Summaries", labelCyr: "Краткое содержание" },
    ],
  },
  { href: "/quotes", label: "Quotes", labelCyr: "Цитаты" },
  { href: "/sankirtana", label: "Sankirtana", labelCyr: "Санкиртана" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <>
      {/* ISKCON Founder-Acharya Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-temple-900 via-temple-800 to-temple-900 py-1.5 px-4 text-center">
        <div className="flex items-center justify-center gap-2.5">
          <Image
            src="/images/iskcon-logo.svg"
            alt="ISKCON"
            width={20}
            height={20}
            className="opacity-80"
          />
          <p className="text-[10px] sm:text-xs tracking-wide text-saffron-300/90 font-medium">
            {lang === "en"
              ? "ISKCON Founder\u2013Acharya His Divine Grace A.C. Bhaktivedanta Swami Prabhupada"
              : "Основатель\u2013Ачарья ИСККОН Его Божественная Милость А.Ч. Бхактиведанта Свами Прабхупада"}
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="fixed top-[30px] left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-temple-200/50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo / Site Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo-dark.png"
                alt="Niranjana Swami"
                width={36}
                height={36}
                className="rounded-full"
              />
              <div className="hidden sm:block">
                <p className="font-display text-lg font-semibold text-temple-900 leading-tight group-hover:text-saffron-600 transition-colors">
                  {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
                </p>
                <p className="text-[10px] text-temple-500 tracking-wider uppercase">
                  {lang === "en" ? "Official Website" : "Официальный сайт"}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href} className="relative group">
                    <button className="px-4 py-2 text-sm font-medium text-temple-700 hover:text-saffron-600 transition-colors rounded-lg hover:bg-saffron-50">
                      {t(link.label, link.labelCyr)}
                      <svg
                        className="inline-block ml-1 w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-temple-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-temple-700 hover:text-saffron-600 hover:bg-saffron-50 transition-colors"
                        >
                          {t(child.label, child.labelCyr)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-temple-700 hover:text-saffron-600 transition-colors rounded-lg hover:bg-saffron-50"
                  >
                    {t(link.label, link.labelCyr)}
                  </Link>
                )
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors
                  bg-saffron-50 border-saffron-200 text-saffron-700 hover:bg-saffron-100"
                aria-label={lang === "en" ? "Switch to Russian" : "Switch to English"}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {lang === "en" ? "РУС" : "ENG"}
              </button>

              {/* Search */}
              <button className="hidden sm:flex items-center gap-1.5 p-2 text-temple-500 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <Link
                href="/account/login"
                className="hidden sm:inline-flex px-5 py-2 text-sm font-medium text-white bg-saffron-500 hover:bg-saffron-600 rounded-lg transition-colors shadow-sm"
              >
                {lang === "en" ? "Sign In" : "Войти"}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-temple-600 hover:bg-temple-100 transition-colors"
              >
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden pb-6 border-t border-temple-100 mt-2 pt-4">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.href}>
                      <button
                        onClick={() => setMediaOpen(!mediaOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-temple-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"
                      >
                        {t(link.label, link.labelCyr)}
                        <svg
                          className={`w-4 h-4 transition-transform ${mediaOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {mediaOpen && (
                        <div className="ml-4 flex flex-col gap-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-2.5 text-sm text-temple-600 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"
                            >
                              {t(child.label, child.labelCyr)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-base font-medium text-temple-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"
                    >
                      {t(link.label, link.labelCyr)}
                    </Link>
                  )
                )}
                <div className="mt-4 px-4">
                  <Link
                    href="/account/login"
                    className="inline-flex justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-saffron-500 hover:bg-saffron-600 rounded-lg transition-colors shadow-sm"
                  >
                    {lang === "en" ? "Sign In" : "Войти"}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
