<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useAuthStore } from "@entities/auth";

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const { getCurrentUser } = storeToRefs(authStore);

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <RouterLink class="header__link" :to="{ name: 'home' }">
        {{ t("header.allOrders") }}
      </RouterLink>
      <RouterLink class="header__link" :to="{ name: 'create' }">
        {{ t("header.addOrder") }}
      </RouterLink>
    </nav>
    <div class="header__user">
      <span class="header__name">{{ getCurrentUser?.name }}</span>
      <button class="header__logout" type="button" @click="handleLogout">
        {{ t("header.logout") }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 56px;
  padding: 10px 24px;
  background: var(--color-primary);
  color: #fff;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.header__link {
  color: #fff;
  font-size: 16px;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
}

.header__link.router-link-exact-active {
  border-bottom-color: #fff;
}

.header__user {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__name {
  font-size: 16px;
}

.header__logout {
  min-width: 72px;
  padding: 6px 16px;
  border-radius: 4px;
  background: #e8e8e8;
  color: #333;
  font-size: 15px;
}

.header__logout:hover {
  background: #dcdcdc;
}
</style>
