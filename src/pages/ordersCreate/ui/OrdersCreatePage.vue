<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useAuthStore } from "@entities/auth";
import {
  formatOrderDate,
  NEW_ORDER_STATUS,
  useOrderStore,
} from "@entities/order";
import { useMessage } from "@shared/ui/message";

const { t } = useI18n();
const router = useRouter();
const { showMessage } = useMessage();
const authStore = useAuthStore();
const orderStore = useOrderStore();
const { getCurrentUser } = storeToRefs(authStore);

const form = reactive({
  name: getCurrentUser.value?.name ?? "",
  address: "",
  comment: "",
});

const isSubmitted = ref(false);
const isSubmitting = ref(false);

const nameError = computed(() => {
  if (!isSubmitted.value || form.name.trim()) {
    return "";
  }
  return t("createOrder.required");
});

const addressError = computed(() => {
  if (!isSubmitted.value || form.address.trim()) {
    return "";
  }
  return t("createOrder.required");
});

const handleSubmit = async () => {
  isSubmitted.value = true;

  if (!form.name.trim() || !form.address.trim() || isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;
  const isSuccess = await orderStore.createOrder({
    name: form.name.trim(),
    address: form.address.trim(),
    date: formatOrderDate(),
    status: NEW_ORDER_STATUS,
    comment: form.comment.trim(),
  });
  isSubmitting.value = false;

  if (isSuccess) {
    showMessage(t("createOrder.success"));
    router.push({ name: "home" });
    return;
  }

  showMessage(t("createOrder.failed"));
};
</script>

<template>
  <section class="create-order">
    <form
      class="create-order__form"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <label class="create-order__field">
        <span class="create-order__label">{{ t("createOrder.name") }}</span>
        <input
          v-model="form.name"
          class="create-order__input"
          type="text"
          name="name"
        />
        <p v-if="nameError" class="create-order__error">{{ nameError }}</p>
      </label>
      <label class="create-order__field">
        <span class="create-order__label">{{ t("createOrder.address") }}</span>
        <input
          v-model="form.address"
          class="create-order__input"
          type="text"
          name="address"
        />
        <p v-if="addressError" class="create-order__error">{{ addressError }}</p>
      </label>
      <label class="create-order__field">
        <span class="create-order__label">{{ t("createOrder.comment") }}</span>
        <textarea
          v-model="form.comment"
          class="create-order__textarea"
          name="comment"
          rows="4"
        />
      </label>
      <button
        class="create-order__button"
        type="submit"
        :disabled="isSubmitting"
      >
        {{ t("createOrder.submit") }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.create-order {
  display: flex;
  justify-content: center;
}

.create-order__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 420px;
}

.create-order__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.create-order__label {
  font-size: 14px;
  font-weight: 600;
  color: #222;
}

.create-order__input,
.create-order__textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  font: inherit;
  color: #222;
}

.create-order__input {
  height: 40px;
}

.create-order__textarea {
  padding: 10px;
  resize: vertical;
}

.create-order__error {
  margin: 0;
  color: #c0392b;
  font-size: 14px;
}

.create-order__button {
  width: 100%;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  background: var(--color-primary);
  color: #fff;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.create-order__button:not(:disabled):hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.create-order__button:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>
