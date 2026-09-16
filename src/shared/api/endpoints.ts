export const ORDERS_ENDPOINT = "/events";
export const USERS_ENDPOINT = "/users";

export const orderByIdEndpoint = (id: number) => `${ORDERS_ENDPOINT}/${id}`;
