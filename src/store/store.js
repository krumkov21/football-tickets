import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as event from "@/store/modules/ticket.js";
import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification,
  },
  state: {
    leagues: [
      "Premier League",
      "La Liga EA Sports",
      "Serie A",
      "Ligue 1 McDonald's",
      "BundesLiga",
    ],
  },
});
