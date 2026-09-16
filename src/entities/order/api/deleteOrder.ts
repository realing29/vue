import { http } from "@shared/api";

export const deleteOrder = async (id: number) => {
  await http.delete(`/events/${id}`);
};
