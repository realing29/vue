import { http, ORDERS_ENDPOINT } from "@shared/api";
import type { ICreateOrderPayload, IOrder } from "../type/type";

export const createOrder = async (payload: ICreateOrderPayload) => {
  const { data } = await http.post<IOrder>(ORDERS_ENDPOINT, payload);
  return data;
};
