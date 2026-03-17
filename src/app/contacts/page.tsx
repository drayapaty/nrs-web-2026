"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLanguage } from "@/lib/language";

export default function ContactsPage() {
  const { lang } = useLanguage();

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      <section className="relative bg-ink-950 pt-36 sm:pt-40 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[800px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <span className="text-white/70">{lang === "en" ? "Contact" : "Контакты"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Get in Touch" : "Связаться"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Contact" : "Контакты"}
          </h1>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-20 sm:py-28">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink-900 mb-4">
                  {lang === "en" ? "Website Administration" : "Администрация сайта"}
                </h2>
                <p className="text-ink-500 leading-relaxed mb-6">
                  {lang === "en"
                    ? "For questions about the website, technical issues, or content inquiries, please reach out to our web team."
                    : "По вопросам о сайте, техническим проблемам или запросам о контенте, пожалуйста, обращайтесь к нашей команде."}
                </p>
                <a
                  href="mailto:info@niranjanaswami.net"
                  className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-500 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  info@niranjanaswami.net
                </a>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-ink-900 mb-4">
                  {lang === "en" ? "Follow Online" : "Подписаться"}
                </h2>
                <p className="text-ink-500 leading-relaxed mb-6">
                  {lang === "en"
                    ? "Stay connected through our social media channels for the latest updates, lectures, and events."
                    : "Следите за последними обновлениями, лекциями и мероприятиями через наши каналы."}
                </p>
                <div className="space-y-3">
                  <a
                    href="https://niranjanaswami.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-ink-500 hover:text-gold-600 transition-colors text-sm"
                  >
                    niranjanaswami.net
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
