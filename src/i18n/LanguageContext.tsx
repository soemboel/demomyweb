import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { id } from "../locales/id";
import { en } from "../locales/en";
import type { Content } from "../locales/types";

export type Language = "id" | "en";

const contentMap: Record<Language, Content> = { id, en };

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: Content;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "site-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "id";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore (private browsing, storage disabled, etc.)
    }
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage: () => setLanguage((l) => (l === "id" ? "en" : "id")),
      t: contentMap[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
