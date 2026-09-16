export const COMPLETED_ORDER_STATUS = "completed";
export const NEW_ORDER_STATUS = "new";

export type OrderStatus =
  | typeof COMPLETED_ORDER_STATUS
  | typeof NEW_ORDER_STATUS;

export type IOrder = {
  id: number;
  name: string;
  address: string;
  date: string;
  status: OrderStatus | string;
  comment: string;
};

export type ICreateOrderPayload = Omit<IOrder, "id">;

export type IOrderState = {
  orders: IOrder[];
  isLoading: boolean;
};
