import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@app/layots/DefaultLayout.vue";
import { OrdersListPage } from "@pages/ordresList";
import { OrdersCreatePage } from "@pages/ordersCreate";
import { LoginPage } from "@pages/login";
import { currentUserStorage } from "@entities/auth";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: OrdersListPage,
      },
      {
        path: "create",
        name: "create",
        component: OrdersCreatePage,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!currentUserStorage.get();

  // Если маршрут требует авторизации, а пользователь не залогинен
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Перенаправляем на страницу входа
    next({ name: "login" });
  }
  // Если пользователь уже авторизован, но пытается зайти на страницу Login
  else if (to.name === "login" && isAuthenticated) {
    // Отправляем его на главную
    next({ name: "home" });
  }
  // В остальных случаях разрешаем переход
  else {
    next();
  }
});

export default router;
