<template>
  <div>
    <NavBar />
    <h1>Tickets Listing</h1>
    <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    <router-link to="/sorted/table">
      <v-btn variant="outlined"> Table </v-btn>
    </router-link>
    <router-link to="/sorted/table/vuetify">
      <v-btn variant="outlined"> Table 2 </v-btn>
    </router-link>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import TicketCard from "@/components/TicketsCard.vue";
import TicketService from "@/services/TicketsService.js";

export default {
  components: {
    NavBar,
    TicketCard,
  },
  data() {
    return {
      tickets: [],
    };
  },
  created() {
    TicketService.getTickets()
      .then((response) => {
        this.tickets = response.data;
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
};
</script>
