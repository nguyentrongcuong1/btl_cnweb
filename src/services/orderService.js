const ORDERS_KEY = "orders";

export const getOrders = () =>
  JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
export const saveOrders = (orders) =>
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
export const addOrder = (order) => {
  const orders = getOrders();
  saveOrders([...orders, order]);
};
export const cancelOrder = (id) => {
  const orders = getOrders().map((o) =>
    o.id === id ? { ...o, status: "CANCELED" } : o
  );
  saveOrders(orders);
};
export const updateOrderStatus = (id, status) => {
  const orders = getOrders().map((o) =>
    o.id === id ? { ...o, status } : o
  );
  saveOrders(orders);
};