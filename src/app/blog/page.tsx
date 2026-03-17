"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { useApi } from "@/lib/useApi";
import { getBlogs, type BlogPost } from "@/lib/api";

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

const tagColors: Record<string, string> = {
  "Gaura Purnima": "bg-saffron-50 text-saffron-700",
  "In Memoriam": "bg-temple-100 text-temple-700",
  "Vyasa Puja": "bg-devotion-50 text-devotion-700",
  "Initiation Lecture": "bg-sacred-50 text-sacred-700",
  "Initiation": "bg-sacred-50 text-sacred-700",
  "Japa Session": "bg-saffron-50 text-saffron-700",
};

export default function BlogPage() {
  const { lang, t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, loading } = useApi(
    () => getBlogs(page, 10),
    { blogs: [], total: 0, page: 1, pages: 1 },
    [page]
  );

  const blogs = data.blogs;
  const totalPages = data.pages || 1;

  return (
    <main className="bg-temple-50 min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-temple-500 mb-6">
            <Link href="/" className="hover:text-saffron-600 transition-colors">
              {lang === "en" ? "Home" : "Главная"}
            </Link>
            <span>/</span>
            <span className="text-temple-800">{lang === "en" ? "Blog" : "Блог"}</span>
          </nav>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-temple-900">
            {lang === "en" ? "Blog" : "Блог"}
          </h1>
          <p className="mt-4 text-lg text-temple-600 max-w-2xl">
            {lang === "en"
              ? "Messages, reflections, and updates from His Holiness Niranjana Swami."
              : "Послания, размышления и новости от Его Святейшества Ниранджаны Свами."}
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {loading && blogs.length === 0 ? (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 bg-white rounded-2xl border border-temple-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {blogs.map((post: BlogPost, i: number) => {
                const tag = post.tags?.[0] ?? "";
                return (
                  <article
                    key={post._id || i}
                    className="group bg-white rounded-2xl border border-temple-100 overflow-hidden hover:shadow-lg hover:border-saffron-200 transition-all duration-300"
                  >
                    <div className="h-1 bg-gradient-to-r from-saffron-400 to-saffron-500" />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        {tag && (
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${tagColors[tag] || "bg-saffron-50 text-saffron-700"}`}>
                            {tag}
                          </span>
                        )}
                        <span className="text-xs text-temple-400">
                          {post.date ? formatDate(post.date) : post.dateFormatted ?? ""}
                        </span>
                      </div>

                      <h2 className="font-display text-xl sm:text-2xl font-semibold text-temple-900 group-hover:text-saffron-700 transition-colors leading-snug">
                        {t(post.title_en, post.title_cyr)}
                      </h2>

                      <p className="mt-3 text-temple-600 leading-relaxed">
                        {t(post.excerpt_en, post.excerpt_cyr) || t(post.body_en?.slice(0, 200), post.body_cyr?.slice(0, 200))}
                      </p>

                      <div className="mt-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center">
                          <span className="text-saffron-600 font-display text-sm font-bold">N</span>
                        </div>
                        <span className="text-sm text-temple-500">
                          {lang === "en" ? "Niranjana Swami" : "Ниранджана Свами"}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 text-sm font-medium text-temple-500 bg-white rounded-lg border border-temple-200 hover:border-saffron-300 transition-colors disabled:opacity-50"
            >
              {lang === "en" ? "Previous" : "Назад"}
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? "bg-saffron-500 text-white"
                    : "bg-white text-temple-600 border border-temple-200 hover:border-saffron-300"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-4 py-2 text-sm font-medium text-temple-600 bg-white rounded-lg border border-temple-200 hover:border-saffron-300 transition-colors disabled:opacity-50"
            >
              {lang === "en" ? "Next" : "Далее"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
