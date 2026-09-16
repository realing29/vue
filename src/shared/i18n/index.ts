import { createI18n } from "vue-i18n";
import ru from "./locales/ru";

export const LOCALE_STORAGE_KEY = "app-locale";
export const SUPPORTED_LOCALES = ["ru"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const i18n = createI18n({
  legacy: false,
  locale: "ru",
  fallbackLocale: "ru",
  messages: {
    ru,
  },
});

export const setLocale = (locale: AppLocale) => {
  i18n.global.locale.value = locale;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.documentElement.lang = locale;
};

document.documentElement.lang = i18n.global.locale.value;
