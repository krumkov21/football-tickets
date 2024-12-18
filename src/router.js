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
      name: "ticket-list",
      component: TicketsList,
    },
    {
      path: "/ticket/create",
      name: "ticket-create",
      component: TicketsCreate,
    },
    {
      path: "/tickets/:id",
      name: "ticket-show",
      component: TicketsShow,
      props: true,
    },
  ],
});

