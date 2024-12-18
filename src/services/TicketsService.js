import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTickets() {
    return apiClient.get("/tickets");
  },
  getTicket(id) {
    return apiClient.get("/tickets/" + id);
  },
  postTicket(ticket) {
    return apiClient.post("/tickets", ticket);
  },
};
