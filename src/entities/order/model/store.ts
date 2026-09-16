import { acceptHMRUpdate, defineStore } from "pinia";
import { completeOrder } from "../api/completeOrder";
import { deleteOrder } from "../api/deleteOrder";
import { getOrders } from "../api/getOrders";
import { COMPLETED_ORDER_STATUS, type IOrderState } from "../type/type";

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
    async completeOrder(id: number) {
      try {
        const updatedOrder = await completeOrder(id);
        this.orders = this.orders.map((order) =>
          order.id === id
            ? { ...order, ...updatedOrder, status: COMPLETED_ORDER_STATUS }
            : order,
        );
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async deleteOrder(id: number) {
      try {
        await deleteOrder(id);
        this.orders = this.orders.filter((order) => order.id !== id);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
