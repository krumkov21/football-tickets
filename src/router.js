import Vue from "vue";
import Router from "vue-router";
import TicketsList from "./views/TicketsList.vue";
import TicketsCreate from "./views/TicketsCreate.vue";
import TicketsShow from "./views/TicketsShow.vue";
import NProgress from "nprogress"; // Import NProgress
import NotFound from "./views/NotFound.vue";
import SortedTable from "./views/SortedTable.vue";


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
    {
      path: "/sorted/table",
      name: "sorted-table",
      component: SortedTable,
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
    },
    {
      path: "*",
      redirect: { name: "404" },
    },
  ],
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
