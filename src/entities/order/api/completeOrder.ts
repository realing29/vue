import { http, orderByIdEndpoint } from "@shared/api";
import { COMPLETED_ORDER_STATUS, type IOrder } from "../type/type";

export const completeOrder = async (id: number) => {
  const { data } = await http.patch<IOrder>(orderByIdEndpoint(id), {
    status: COMPLETED_ORDER_STATUS,
  });
  return data;
};
