import { acceptHMRUpdate, defineStore } from "pinia";
import { getOrders } from "../api/getOrders";
import type { IOrderState } from "../type/type";

export const useOrderStore = defineStore("order", {
  state: (): IOrderState => ({
    orders: [],
    isLoading: false,
  }),
  getters: {
    getOrdersList: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchOrders() {
      this.isLoading = true;
      try {
        this.orders = await getOrders();
      } catch (error) {
        console.error(error);
        this.orders = [];
      } finally {
        this.isLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
