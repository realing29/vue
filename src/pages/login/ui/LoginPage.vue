<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@entities/auth/model/store";
import { useMessage } from "@shared/ui/message/useMessage";
import { useRouter } from "vue-router";

const router = useRouter();
const { showMessage } = useMessage();
const AUTH_ERROR_MESSAGE = "Неверный логин\\пароль";

const MIN_PASSWORD_LENGTH = 8;
const MIN_PASSWORD_LENGTH_ERROR = "Пароль должен содержать не менее 8 символов";
const authStore = useAuthStore();
const { getFormName, getFormPassword } = storeToRefs(authStore);
const isPasswordTouched = ref(false);

const passwordError = computed(() => {
  if (!isPasswordTouched.value) {
    return "";
  }
  if (getFormPassword.value.length < MIN_PASSWORD_LENGTH) {
    return MIN_PASSWORD_LENGTH_ERROR;
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
    router.push({ name: "home" });
    return;
  }

  showMessage(AUTH_ERROR_MESSAGE);
};
</script>

<template>
  <div class="login-page">
    <form class="login-page__form" novalidate @submit.prevent="handleSubmit">
      <input
        class="login-page__input"
        type="text"
        placeholder="Логин"
        :value="getFormName"
        @input="onNameInput"
      />
      <input
        class="login-page__input"
        type="password"
        placeholder="Пароль"
        minlength="8"
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
        Войти
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
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
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
}
.login-page__error {
  width: 100%;
  margin: 0;
  color: #c0392b;
  font-size: 14px;
}
.login-page__button {
  width: 100%;
  height: 40px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
  padding: 0 10px;
  background: #2c3e50;
  color: #fff;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.login-page__button:not(:disabled):hover {
  background: #1a252f;
  border-color: #1a252f;
}

.login-page__button:disabled {
  background: #e8e8e8;
  border-color: #d0d0d0;
  color: #999;
  cursor: default;
  opacity: 0.7;
}
</style>
