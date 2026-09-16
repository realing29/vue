import { ref } from "vue";

export const MESSAGE_DEFAULT_DURATION_MS = 3000;

const message = ref("");
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const clearHideTimer = () => {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
};

export const useMessage = () => {
  const showMessage = (
    text: string,
    duration = MESSAGE_DEFAULT_DURATION_MS,
  ) => {
    message.value = text;
    clearHideTimer();
    hideTimer = setTimeout(() => {
      message.value = "";
      hideTimer = null;
    }, duration);
  };

  return {
    message,
    showMessage,
  };
};
