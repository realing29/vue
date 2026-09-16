import { http } from "@shared/api";
import type { ICreateOrderPayload, IOrder } from "../type/type";

export const createOrder = async (payload: ICreateOrderPayload) => {
  const { data } = await http.post<IOrder>("/events", payload);
  return data;
};
