import { createRouter, createWebHistory } from "vue-router";
import OrdersListPage from "@pages/ordresList/OrdersListPage.vue";
import OrdresCreatePage from "@pages/ordersCreate/ui/OrdersCreatePage.vue";
import LoginPage from "@pages/login/ui/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "Заказы",
    component: OrdersListPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "Создать заказ",
    component: OrdresCreatePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Авторизация",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
