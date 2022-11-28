import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getSingleNote = async (id) => {
  const response = await api.get("/singlenote", {
    headers: {
      token: localStorage.getItem("token"),
      id,
    },
  });
  return response.data;
};

export const addNote = async (data) => {
  return await api.post("/addnote", data, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const getAllNotes = async () => {
  const response = await api.get("/allnotes", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return response.data;
};
