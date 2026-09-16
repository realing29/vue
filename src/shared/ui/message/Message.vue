<script setup lang="ts">
import { useMessage } from "./useMessage";

const { message } = useMessage();
</script>

<template>
  <Transition name="message">
    <p v-if="message" class="message" role="status">{{ message }}</p>
  </Transition>
</template>

<style scoped>
.message {
  position: fixed;
  top: 24px;
  left: 50%;
  z-index: 1000;
  max-width: min(420px, calc(100vw - 32px));
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  transform: translateX(-50%);
}

.message-enter-active,
.message-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}
</style>
