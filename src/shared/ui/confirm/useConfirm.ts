import { ref } from "vue";
import { i18n } from "@shared/i18n";

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
    const { t } = i18n.global;

    return new Promise<boolean>((resolve) => {
      state.value?.resolve(false);
      state.value = {
        title: normalized.title ?? t("confirm.title"),
        text: normalized.text,
        confirmText: normalized.confirmText ?? t("confirm.confirm"),
        cancelText: normalized.cancelText ?? t("confirm.cancel"),
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
