import Vue from "vue";
import Router from "vue-router";
import TicketsList from "./views/TicketsList.vue";
import TicketsCreate from "./views/TicketsCreate.vue";
import TicketsShow from "./views/TicketsShow.vue";
import NProgress from "nprogress"; // Import NProgress


Vue.use(Router);

const router = new Router({
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

// ✅ Attach global navigation guards to the same `router` instance
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start(); // Start loading bar
  next();
});

router.afterEach(() => {
  NProgress.done(); // Finish loading bar
});

export default router; // ✅ Export the correctly configured router
