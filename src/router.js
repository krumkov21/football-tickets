import Vue from "vue";
import Router from "vue-router";
import TicketsList from "./views/TicketsList.vue";
import TicketsCreate from "./views/TicketsCreate.vue";
import TicketsShow from "./views/TicketsShow.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "tickets-list",
      component: TicketsList,
    },
    {
      path: "/tickets/create",
      name: "event-create",
      component: TicketsCreate,
    },
    {
      path: "/tickets/:id",
      name: "tickets-show",
      component: TicketsShow,
      props: true,
    },
  ],
});
