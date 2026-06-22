"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type Lang = "en" | "cyr";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  /** Get a bilingual field value. Pass the en and cyr values. */
  t: (en: string | undefined, cyr: string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  setLang: () => {},
  t: (en) => en ?? "",
});

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "cyr") return stored;
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(getInitialLang());
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "cyr" : "en";
      try {
        localStorage.setItem("lang", next);
      } catch {}
      return next;
    });
  }, []);

  const t = useCallback(
    (en: string | undefined, cyr: string | undefined) => {
      if (lang === "cyr" && cyr) return cyr;
      return en ?? "";
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
