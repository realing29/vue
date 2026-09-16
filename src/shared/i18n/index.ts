import { createI18n } from "vue-i18n";
import ru from "./locales/ru";

export const LOCALE_STORAGE_KEY = "app-locale";
export const SUPPORTED_LOCALE = "ru";

export const i18n = createI18n({
  legacy: false,
  locale: SUPPORTED_LOCALE,
  messages: {
    ru,
  },
});

document.documentElement.lang = i18n.global.locale.value;
