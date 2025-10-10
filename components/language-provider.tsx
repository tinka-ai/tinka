"use client";

// Shim: re-exportă contextul existent ca să fie valid vechiul import
export {
  LocaleProvider as LanguageProvider,
  useLocale as useLanguage,
} from "@/contexts/locale-context";
