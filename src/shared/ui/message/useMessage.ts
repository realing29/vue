import { ref } from "vue";

const message = ref("");
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const clearHideTimer = () => {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
};

export const useMessage = () => {
  const showMessage = (text: string, duration = 3000) => {
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
