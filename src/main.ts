import { createApp } from "vue";
import "./app/reset.css";
import App from "./app/App.vue";
import router from "./app/router.ts";

createApp(App).use(router).mount("#app");
