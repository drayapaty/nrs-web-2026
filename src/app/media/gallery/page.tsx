"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getGalleries, type GalleryAlbum, type GalleryListResponse } from "@/lib/api";

export default function GalleryPage() {
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, loading } = useApi<GalleryListResponse>(
    () => getGalleries(page),
    { results: [], total: 0, page: 1, pages: 1 },
    [page]
  );

  const galleries = data.results || [];

  return (
    <main className="bg-cream-50 min-h-screen">
      <Navigation />

      <section className="relative bg-ink-950 pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8">
        <div className="max-w-[1000px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <span className="text-white/70">{lang === "en" ? "Gallery" : "Галерея"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Media" : "Медиа"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Gallery" : "Галерея"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Photo albums from travels, festivals, and spiritual programs worldwide."
              : "Фотоальбомы из путешествий, фестивалей и духовных программ по всему миру."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          {loading && galleries.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-ink-100 animate-pulse" />
              ))}
            </div>
          ) : galleries.length === 0 ? (
            <p className="text-ink-400 text-center py-20">
              {lang === "en" ? "No galleries found." : "Галереи не найдены."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((album: GalleryAlbum, i: number) => (
                <ScrollReveal key={album.uuid || i} delay={i * 60}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
                      {album.coverImage ? (
                        <img
                          src={album.coverImage}
                          alt={t(album.en?.title, album.cyr?.title) || "Gallery"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-ink-200">
                          <svg className="w-12 h-12 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <h3 className="font-display text-base font-semibold text-ink-900 group-hover:text-gold-600 transition-colors leading-snug">
                        {t(album.en?.title, album.cyr?.title) || "Untitled"}
                      </h3>
                      {album.date && (
                        <p className="text-ink-400 text-xs mt-1">
                          {new Date(album.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      )}
                      {album.images && (
                        <p className="text-ink-300 text-xs mt-0.5">
                          {album.images.length} {lang === "en" ? "photos" : "фото"}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
