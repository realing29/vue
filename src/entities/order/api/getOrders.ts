import { http } from "@shared/api";
import type { IOrder } from "../type/type";

export const getOrders = async () => {
  const { data } = await http.get<IOrder[]>("/events");
  return data;
};
