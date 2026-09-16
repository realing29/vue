import { http } from "@shared/api/http";

export const deleteOrder = async (id: number) => {
  await http.delete(`/events/${id}`);
};
