import { LANG_STORAGE_KEY, type Lang } from "@/lib/i18n";
import { useCallback, useEffect, useState } from "react";

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "km";
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "km" || stored === "en") return stored;
  } catch {
    /* storage unavailable — fall through to default */
  }
  return "km";
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — language still works for this session */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((current) => (current === "km" ? "en" : "km"));
  }, []);

  return { lang, setLang, toggle };
}
