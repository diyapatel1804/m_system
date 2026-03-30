import API from "./api";

export const getStudents = () => API.get("/Students");

export const addStudent = (student) => API.post("/Students", student);

export const deleteStudent = (id) => API.delete(`/Students/${id}`);