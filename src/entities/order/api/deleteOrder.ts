import { http, orderByIdEndpoint } from "@shared/api";

export const deleteOrder = async (id: number) => {
  await http.delete(orderByIdEndpoint(id));
};
