import { http } from "@shared/api/http";
import { COMPLETED_ORDER_STATUS, type IOrder } from "../type/type";

export const completeOrder = async (id: number) => {
  const { data } = await http.patch<IOrder>(`/events/${id}`, {
    status: COMPLETED_ORDER_STATUS,
  });
  return data;
};
