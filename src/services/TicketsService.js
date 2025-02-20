import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default {
  getTickets(perPage, page) {
    return apiClient.get("/tickets?_limit=" + perPage + "&_page=" + page);
  },
  getTicket(id) {
    return apiClient.get("/tickets/" + id);
  },
  postTicket(ticket) {
    return apiClient.post("/tickets", ticket);
  },
};
