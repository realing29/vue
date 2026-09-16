import { http, ORDERS_ENDPOINT } from "@shared/api";
import type { IOrder } from "../type/type";

export const getOrders = async () => {
  const { data } = await http.get<IOrder[]>(ORDERS_ENDPOINT);
  return data;
};
