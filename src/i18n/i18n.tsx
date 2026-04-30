import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { strings, type StringKey } from "@/i18n/strings";

export type Lang = "en" | "hi";

type Params = Record<string, string | number>;

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: StringKey, params?: Params) => string;
};

const I18N_STORAGE_KEY = "tarot-anchal-lang";

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(template: string, params?: Params) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = params[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = window.localStorage.getItem(I18N_STORAGE_KEY);
    if (stored === "hi" || stored === "en") return stored;
    return "en";
  });

  useEffect(() => {
    window.localStorage.setItem(I18N_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    return {
      lang,
      setLang,
      t: (key, params) => {
        const template = strings[lang][key] ?? strings.en[key];
        return interpolate(template, params);
      }
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider />");
  return ctx;
}

