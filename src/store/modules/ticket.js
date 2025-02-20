import TicketsService from "@/services/TicketsService.js";

export const namespaced = true;

export const state = {
  tickets: [],
  ticketsTotal: 0,
  ticket: {},
  perPage: 3,
};

export const mutations = {
  ADD_TICKET(state, ticket) {
    state.tickets.push(ticket);
  },
  SET_TICKETS(state, tickets) {
    state.tickets = tickets;
  },
  SET_TICKETS_TOTAL(state, ticketsTotal) {
    state.ticketsTotal = ticketsTotal;
  },
  SET_TICKET(state, ticket) {
    state.ticket = ticket;
  },
};

export const actions = {
  createTicket({ commit, dispatch }, ticket) {
    return TicketsService.postEvent(ticket)
      .then(() => {
        commit("ADD_TICKET", ticket);
        commit("SET_TICKET", ticket);
        const notification = {
          type: "success",
          message: "Your event has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem creating your ticket: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchTickets({ commit, dispatch }, { perPage, page }) {
    TicketsService.getTickets(perPage, page)
      .then((response) => {
        commit("SET_TICKETS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_TICKETS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching tickets: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchTicket({ commit, getters }, id) {
    var ticket = getters.getTicketById(id);

    if (ticket) {
      commit("SET_TICKET", ticket);
      return ticket;
    } else {
      return TicketsService.getTicket(id)
        .then((response) => {
          commit("SET_TICKET", response.data);
          return response.data;
        })
        
    }
  },
};
export const getters = {
  getTicketById: (state) => (id) => {
    return state.tickets.find((ticket) => ticket.id === id);
  },
};
