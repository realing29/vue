export const COMPLETED_ORDER_STATUS = "Выполнен";

export type IOrder = {
  id: number;
  name: string;
  address: string;
  date: string;
  status: string;
  comment: string;
};

export type IOrderState = {
  orders: IOrder[];
  isLoading: boolean;
};
