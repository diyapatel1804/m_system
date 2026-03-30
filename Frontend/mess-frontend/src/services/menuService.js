import API from "./api";

export const getMenus = () => API.get("/MealMenus");

export const addMenu = (menu) => API.post("/MealMenus", menu);

export const deleteMenu = (id) => API.delete(`/MealMenus/${id}`);