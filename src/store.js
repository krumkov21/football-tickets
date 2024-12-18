import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    leagues: [
      "Premier League",
      "La Liga EA Sports",
      "Serie A",
      "Ligue 1 McDonald's",
      "BundesLiga",
    ],
    tickets: [],
  },
  mutations: {
    ADD_TICKET(state, ticket) {
      state.tickets.push(ticket);
    },
    SET_TICKETS(state, tickets) {
      state.tickets = tickets;
    },
  },
  actions: {
    createTicket({ commit }, ticket) {
      return new Promise((resolve, reject) => {
        try {
          commit("ADD_TICKET", ticket);
          resolve(ticket);
        } catch (error) {
          reject(error);
        }
      });
    },
    loadTickets({ commit }) {
      commit("SET_TICKETS", []);
    },
  },
  getters: {
    getTicketById: (state) => (id) => {
      return state.tickets.find((ticket) => ticket.id === id);
    },
  },
});
