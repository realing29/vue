import { ref } from "vue";

type ConfirmOptions = {
  title?: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmState = {
  title: string;
  text: string;
  confirmText: string;
  cancelText: string;
  resolve: (value: boolean) => void;
};

const state = ref<ConfirmState | null>(null);

export const useConfirm = () => {
  const confirm = (options: string | ConfirmOptions) => {
    const normalized =
      typeof options === "string" ? { text: options } : options;

    return new Promise<boolean>((resolve) => {
      state.value?.resolve(false);
      state.value = {
        title: normalized.title ?? "Подтверждение",
        text: normalized.text,
        confirmText: normalized.confirmText ?? "Подтвердить",
        cancelText: normalized.cancelText ?? "Отмена",
        resolve,
      };
    });
  };

  const close = (result: boolean) => {
    state.value?.resolve(result);
    state.value = null;
  };

  return {
    state,
    confirm,
    close,
  };
};
