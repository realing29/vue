import { acceptHMRUpdate, defineStore } from "pinia";
import type { ICurrentUser, IFormUser, IState } from "../type/type";

export const useAuthStore = defineStore("auth", {
  state: (): IState => ({
    currentUser: null,
    form: {
      name: "",
      password: "",
    },
    isInitialized: false,
  }),
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getFormName: (state) => {
      return state.form.name;
    },
    getFormPassword: (state) => {
      return state.form.name;
    },
  },
  actions: {
    setFormName(name: string) {
      this.form.name = name;
    },
    setFormPassword(password: string) {
      this.form.password = password;
    },
    async checkAuth() {},
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
