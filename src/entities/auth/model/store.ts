import { acceptHMRUpdate, defineStore } from "pinia";
import type { IState } from "../type/type";
import { mockAuth } from "@/shared/api/mockAuth";
import { currentUserStorage } from "../lib/currentUserStorage";

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
      return state.form.password;
    },
    getCurrentUserIsAdmin: (state) => {
      return state.currentUser?.role === "ADMIN";
    },
  },
  actions: {
    setFormName(name: string) {
      this.form.name = name;
    },
    setFormPassword(password: string) {
      this.form.password = password;
    },
    async checkAuth() {
      const currentUser = currentUserStorage.get();
      if (currentUser) {
        this.currentUser = currentUser;
        return true;
      }
      return false;
    },
    logout() {
      currentUserStorage.remove();
      this.currentUser = null;
    },
    async submitAuth() {
      const { name, password } = this.form;
      try {
        const user = await mockAuth({ name, password });
        if (user) {
          this.currentUser = user;
          currentUserStorage.set(user);
          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
