"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language";

const SUBJECTS = [
  { value: "", label: { en: "Select a subject", cyr: "Выберите тему" } },
  { value: "general", label: { en: "General Inquiry", cyr: "Общий вопрос" } },
  { value: "technical", label: { en: "Technical Issue", cyr: "Техническая проблема" } },
  { value: "content", label: { en: "Content Request", cyr: "Запрос контента" } },
  { value: "other", label: { en: "Other", cyr: "Другое" } },
];

const INITIAL_STATE = { name: "", email: "", subject: "", message: "" };

export default function ContactsPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = lang === "en" ? "Name is required" : "Имя обязательно";
    if (!form.email.trim()) {
      errs.email = lang === "en" ? "Email is required" : "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = lang === "en" ? "Invalid email format" : "Неверный формат email";
    }
    if (!form.subject) errs.subject = lang === "en" ? "Subject is required" : "Тема обязательна";
    if (!form.message.trim()) errs.message = lang === "en" ? "Message is required" : "Сообщение обязательно";
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(INITIAL_STATE);
    }, 1200);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 bg-cream-50 border text-ink-900 text-sm font-body rounded-sm outline-none transition-all duration-200 placeholder:text-ink-400 ${
      errors[field] ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30" : "border-ink-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
    }`;

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

      <section className="px-6 sm:px-8 py-16 sm:py-24">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              <div className="lg:col-span-2">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 mb-4">
                  {lang === "en" ? "Website Administration" : "Администрация сайта"}
                </h2>
                <p className="text-ink-500 leading-relaxed mb-8 text-sm">
                  {lang === "en"
                    ? "For questions about the website, technical issues, or content inquiries, please reach out to our web team."
                    : "По вопросам о сайте, техническим проблемам или запросам о контенте, пожалуйста, обращайтесь к нашей команде."}
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-ink-400 font-medium mb-2">
                      {lang === "en" ? "Email" : "Эл. почта"}
                    </h3>
                    <a
                      href="mailto:info@niranjanaswami.net"
                      className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-500 transition-colors font-medium text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      info@niranjanaswami.net
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-ink-400 font-medium mb-2">
                      {lang === "en" ? "Social" : "Соц. сети"}
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="https://niranjanaswami.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-ink-500 hover:text-gold-600 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        niranjanaswami.net
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="bg-cream-200/50 border border-cream-300 rounded-sm p-8 sm:p-12 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-400/20 flex items-center justify-center">
                      <svg className="w-7 h-7 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-ink-900 mb-2">
                      {lang === "en" ? "Message Sent" : "Сообщение отправлено"}
                    </h3>
                    <p className="text-ink-500 text-sm leading-relaxed">
                      {lang === "en"
                        ? "Thank you for reaching out. We will get back to you as soon as possible."
                        : "Спасибо за обращение. Мы ответим вам как можно скорее."}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-gold-600 hover:text-gold-500 text-sm font-medium transition-colors"
                    >
                      {lang === "en" ? "Send another message" : "Отправить ещё"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-ink-500 font-medium mb-2">
                        {lang === "en" ? "Name" : "Имя"} <span className="text-gold-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder={lang === "en" ? "Your full name" : "Ваше полное имя"}
                        className={inputClasses("name")}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-ink-500 font-medium mb-2">
                        {lang === "en" ? "Email" : "Эл. почта"} <span className="text-gold-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder={lang === "en" ? "your@email.com" : "ваш@email.com"}
                        className={inputClasses("email")}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs uppercase tracking-[0.15em] text-ink-500 font-medium mb-2">
                        {lang === "en" ? "Subject" : "Тема"} <span className="text-gold-400">*</span>
                      </label>
                      <select
                        id="subject"
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        className={inputClasses("subject")}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.value === "" ? s.label[lang as "en" | "cyr"] || s.label.en : s.label[lang as "en" | "cyr"] || s.label.en}
                          </option>
                        ))}
                      </select>
                      {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-ink-500 font-medium mb-2">
                        {lang === "en" ? "Message" : "Сообщение"} <span className="text-gold-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        rows={5}
                        placeholder={lang === "en" ? "How can we help you?" : "Чем мы можем вам помочь?"}
                        className={`${inputClasses("message")} resize-none`}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-3 bg-gold-400 hover:bg-gold-500 disabled:opacity-60 text-white text-sm font-medium tracking-wide rounded-sm transition-all duration-200 hover:shadow-lg hover:shadow-gold-400/20"
                    >
                      {submitting
                        ? lang === "en"
                          ? "Sending..."
                          : "Отправка..."
                        : lang === "en"
                        ? "Send Message"
                        : "Отправить"}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
