import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@app/layots/DefaultLayout.vue";
import { OrdersListPage } from "@pages/ordresList";
import { OrdersCreatePage } from "@pages/ordersCreate";
import { LoginPage } from "@pages/login";
import { currentUserStorage } from "@entities/auth";
import { ROUTE_NAMES, ROUTE_PATHS } from "./routes";

const routes = [
  {
    path: ROUTE_PATHS.ROOT,
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: ROUTE_PATHS.HOME,
        name: ROUTE_NAMES.HOME,
        component: OrdersListPage,
      },
      {
        path: ROUTE_PATHS.CREATE,
        name: ROUTE_NAMES.CREATE,
        component: OrdersCreatePage,
      },
    ],
  },
  {
    path: ROUTE_PATHS.LOGIN,
    name: ROUTE_NAMES.LOGIN,
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
    next({ name: ROUTE_NAMES.LOGIN });
  }
  // Если пользователь уже авторизован, но пытается зайти на страницу Login
  else if (to.name === ROUTE_NAMES.LOGIN && isAuthenticated) {
    // Отправляем его на главную
    next({ name: ROUTE_NAMES.HOME });
  }
  // В остальных случаях разрешаем переход
  else {
    next();
  }
});

export default router;
