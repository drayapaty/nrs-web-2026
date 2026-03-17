"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "cyr" : "en"));
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
