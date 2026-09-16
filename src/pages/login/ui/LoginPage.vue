<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { ROUTE_NAMES } from "@app/router/routes";
import { useAuthStore } from "@entities/auth";
import { useMessage } from "@shared/ui/message";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const { showMessage } = useMessage();

const MIN_PASSWORD_LENGTH = 8;
const authStore = useAuthStore();
const { getFormName, getFormPassword } = storeToRefs(authStore);
const isPasswordTouched = ref(false);

watch(
  () => t("app.title"),
  (title) => {
    document.title = title;
  },
  { immediate: true },
);

const passwordError = computed(() => {
  if (!isPasswordTouched.value) {
    return "";
  }
  if (getFormPassword.value.length < MIN_PASSWORD_LENGTH) {
    return t("login.passwordMinLength", { min: MIN_PASSWORD_LENGTH });
  }
  return "";
});

const isSubmitDisabled = computed(() => {
  return (
    !getFormName.value.trim() ||
    getFormPassword.value.length < MIN_PASSWORD_LENGTH
  );
});

const setFormName = (value: string) => {
  authStore.setFormName(value);
};
const setFormPassword = (value: string) => {
  authStore.setFormPassword(value);
};
const onNameInput = (event: Event) => {
  setFormName((event.target as HTMLInputElement).value);
};
const onPasswordInput = (event: Event) => {
  setFormPassword((event.target as HTMLInputElement).value);
};
const handleSubmit = async () => {
  isPasswordTouched.value = true;
  if (getFormPassword.value.length < MIN_PASSWORD_LENGTH) {
    return;
  }
  const isSuccess = await authStore.submitAuth();

  if (isSuccess) {
    router.push({ name: ROUTE_NAMES.HOME });
    return;
  }

  showMessage(t("login.authError"));
};
</script>

<template>
  <div class="login-page">
    <form class="login-page__form" novalidate @submit.prevent="handleSubmit">
      <input
        class="login-page__input"
        type="text"
        :placeholder="t('login.loginPlaceholder')"
        :value="getFormName"
        @input="onNameInput"
      />
      <input
        class="login-page__input"
        type="password"
        :placeholder="t('login.passwordPlaceholder')"
        :minlength="MIN_PASSWORD_LENGTH"
        :value="getFormPassword"
        @input="onPasswordInput"
        @blur="isPasswordTouched = true"
      />
      <p v-if="passwordError" class="login-page__error">{{ passwordError }}</p>
      <button
        class="login-page__button"
        type="submit"
        :disabled="isSubmitDisabled"
      >
        {{ t("login.submit") }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-page__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 300px;
}
.login-page__input {
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 0 10px;
}
.login-page__error {
  width: 100%;
  margin: 0;
  color: var(--color-danger);
  font-size: 14px;
}
.login-page__button {
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  padding: 0 10px;
  background: var(--color-primary);
  color: #fff;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.login-page__button:not(:disabled):hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.login-page__button:disabled {
  background: #e8e8e8;
  border-color: var(--color-border-muted);
  color: #999;
  cursor: default;
  opacity: 0.7;
}
</style>
