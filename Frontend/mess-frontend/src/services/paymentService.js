import API from "./api";

export const getPayments = () => API.get("/Payments");

export const addPayment = (payment) => API.post("/Payments", payment);

export const deletePayment = (id) => API.delete(`/Payments/${id}`);