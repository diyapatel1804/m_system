import API from "./api";

export const getComplaints = () => API.get("/Complaints");

export const addComplaint = (complaint) =>
API.post("/Complaints", complaint);

export const deleteComplaint = (id) =>
API.delete(`/Complaints/${id}`);