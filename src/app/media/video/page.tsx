"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getVideos, type Video, type VideoListResponse } from "@/lib/api";

export default function VideoPage() {
  const { lang, t } = useLanguage();

  const { data, loading } = useApi<VideoListResponse>(
    () => getVideos(),
    { results: [], total: 0, page: 1, pages: 1 }
  );

  const videos = data.results || [];

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
            <span className="text-white/70">{lang === "en" ? "Video" : "Видео"}</span>
          </nav>

          <p className="text-gold-400/60 text-[11px] uppercase tracking-[0.4em] font-medium mb-3">
            {lang === "en" ? "Media" : "Медиа"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {lang === "en" ? "Video" : "Видео"}
          </h1>
          <p className="mt-5 text-white/40 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Video recordings of lectures, kirtans, and special events."
              : "Видеозаписи лекций, киртанов и специальных мероприятий."}
          </p>
          <div className="w-12 h-[1px] bg-gold-500 mt-8" />
        </div>
      </section>

      <section className="px-6 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          {loading && videos.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video bg-ink-100 animate-pulse" />
              ))}
            </div>
          ) : videos.length === 0 ? (
            <p className="text-ink-400 text-center py-20">
              {lang === "en" ? "No videos found." : "Видео не найдены."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video: Video, i: number) => (
                <ScrollReveal key={video.uuid || video.videoId || i} delay={i * 60}>
                  <a
                    href={video.videoId ? `https://www.youtube.com/watch?v=${video.videoId}` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-video bg-ink-100 overflow-hidden">
                      {(video.thumbnails?.high || video.thumbnails?.medium || video.thumbnails?.default) ? (
                        <img
                          src={video.thumbnails.high || video.thumbnails.medium || video.thumbnails.default}
                          alt={t(video.en?.title, video.cyr?.title) || "Video"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-ink-200">
                          <svg className="w-12 h-12 text-ink-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100">
                          <svg className="w-6 h-6 ml-1 text-ink-900" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-display text-base font-semibold text-ink-900 group-hover:text-gold-600 transition-colors leading-snug line-clamp-2">
                        {t(video.en?.title, video.cyr?.title) || "Untitled"}
                      </h3>
                      {video.publishedAt && (
                        <p className="text-ink-400 text-xs mt-1">
                          {new Date(video.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </a>
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
