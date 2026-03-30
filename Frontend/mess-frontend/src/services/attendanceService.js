import API from "./api";

export const getAttendance = () =>
API.get("/MealAttendances");

export const addAttendance = (attendance) =>
API.post("/MealAttendances", attendance);