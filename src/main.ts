import { createApp } from "vue";
import { createPinia } from "pinia";
import "./app/reset.css";
import App from "./app/App.vue";
import router from "./app/router/router.ts";
import { i18n } from "@shared/i18n";

createApp(App).use(createPinia()).use(router).use(i18n).mount("#app");
