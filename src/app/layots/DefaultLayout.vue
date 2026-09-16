<script setup lang="ts">
import Header from "@app/layots/Header.vue";
import { useAuthStore } from "@entities/auth/model/store";

const authStore = useAuthStore();
authStore.checkAuth();
</script>

<template>
  <div class="layout">
    <Header />
    <main class="layout__content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: #fff;
  color: #222;
}

.layout__content {
  padding: 24px;
}
</style>
