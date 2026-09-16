<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useConfirm } from "./useConfirm";

const { state, close } = useConfirm();
const confirmButton = ref<HTMLButtonElement | null>(null);

const onOverlayClick = () => {
  close(false);
};

const onDialogClick = (event: MouseEvent) => {
  event.stopPropagation();
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    close(false);
  }
};

watch(
  state,
  async (nextState) => {
    if (!nextState) {
      window.removeEventListener("keydown", onKeydown);
      return;
    }

    window.addEventListener("keydown", onKeydown);
    await nextTick();
    confirmButton.value?.focus();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm">
      <div
        v-if="state"
        class="confirm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-text"
        @click="onOverlayClick"
      >
        <div class="confirm__dialog" @click="onDialogClick">
          <h2 id="confirm-title" class="confirm__title">{{ state.title }}</h2>
          <p id="confirm-text" class="confirm__text">{{ state.text }}</p>
          <div class="confirm__actions">
            <button
              class="confirm__button confirm__button--cancel"
              type="button"
              @click="close(false)"
            >
              {{ state.cancelText }}
            </button>
            <button
              ref="confirmButton"
              class="confirm__button confirm__button--ok"
              type="button"
              @click="close(true)"
            >
              {{ state.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
}

.confirm__dialog {
  width: min(420px, 100%);
  padding: 20px;
  border-radius: 8px;
  background: #fff;
  color: #222;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.confirm__title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
}

.confirm__text {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
}

.confirm__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.confirm__button {
  min-width: 108px;
  height: 40px;
  padding: 0 14px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.confirm__button--cancel {
  border: 1px solid #d0d0d0;
  background: #e8e8e8;
  color: #333;
}

.confirm__button--cancel:hover {
  background: #dcdcdc;
}

.confirm__button--ok {
  border: 1px solid var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}

.confirm__button--ok:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.confirm-enter-active,
.confirm-leave-active {
  transition: opacity 0.2s ease;
}

.confirm-enter-active .confirm__dialog,
.confirm-leave-active .confirm__dialog {
  transition: transform 0.2s ease;
}

.confirm-enter-from,
.confirm-leave-to {
  opacity: 0;
}

.confirm-enter-from .confirm__dialog,
.confirm-leave-to .confirm__dialog {
  transform: translateY(-8px);
}
</style>
