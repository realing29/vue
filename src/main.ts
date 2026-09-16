import { createApp } from "vue";
import { createPinia } from "pinia";
import "./app/reset.css";
import App from "./app/App.vue";
import router from "./app/router/router.ts";

createApp(App).use(createPinia()).use(router).mount("#app");
