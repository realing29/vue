export const COMPLETED_ORDER_STATUS = "Выполнен";
export const NEW_ORDER_STATUS = "Новый";

export type IOrder = {
  id: number;
  name: string;
  address: string;
  date: string;
  status: string;
  comment: string;
};

export type ICreateOrderPayload = Omit<IOrder, "id">;

export type IOrderState = {
  orders: IOrder[];
  isLoading: boolean;
};
