"use client";

import { useState, useEffect, useRef } from "react";
import { search } from "@/lib/api";
import { useLanguage } from "@/lib/language";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await search(query);
        setResults(data.results);
        setHasSearched(true);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const getTitle = (item: any): string => {
    if (lang === "cyr" && item.cyr?.title) return item.cyr.title;
    return item.en?.title || item.title || "Untitled";
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] bg-ink-950/80 backdrop-blur-md flex items-start justify-center pt-32 animate-[fadeIn_0.2s_ease-out]"
    >
      <div className="w-full max-w-2xl mx-4 bg-cream-50 rounded-lg shadow-2xl animate-[scaleIn_0.2s_ease-out]">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "en" ? "Search lectures..." : "Поиск лекций..."}
            className="w-full px-6 py-5 text-lg bg-transparent border-b-2 border-gold-400 focus:outline-none focus:border-gold-500 text-ink-900 placeholder:text-ink-400"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <div className="text-center py-12 text-ink-500">
              {lang === "en" ? "No results found" : "Результатов не найдено"}
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="divide-y divide-ink-200">
              {results.map((item: any, idx) => (
                <li key={idx} className="p-6 hover:bg-cream-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-ink-900 mb-2">
                        {getTitle(item)}
                      </h3>
                      {item.lectureDate && (
                        <p className="text-sm text-ink-500">{item.lectureDate}</p>
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-wide text-gold-500 font-medium">
                      {item.audioLink ? (lang === "en" ? "Lecture" : "Лекция") : (lang === "en" ? "Blog" : "Блог")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
