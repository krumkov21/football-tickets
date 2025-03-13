<template>
  <div>
    <NavBar/>
    <div v-if="loading">Loading ticket details...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="ticket-header">
        <span class="eyebrow">⏱︎ {{ ticket.time }} on {{ ticket.date }}</span>
        <h1 class="title">{{ ticket.home }} VS {{ ticket.guest }}</h1>
        <h5>League: {{ ticket.league }}</h5>
      </div>

      <h2>Location</h2>
      <address>📍{{ ticket.location }}</address>

      <h2>Ticket seat</h2>
      <p>💺 No̱{{ ticket.seat }}</p>

      <h2>Price:</h2>
      <p>💵 {{ ticket.price }} €</p>
    </div>
  </div>
</template>


<script>
import NavBar from '@/components/NavBar.vue'
import TicketService from '@/services/TicketsService.js'
import axios from "axios";

export default {
  components:{
    NavBar
  },
  props: ['id'],
  getTicket(id) {
    return axios.get(`/api/tickets/${id}`); // Make sure the API endpoint is correct
  },
  data() {
    return {
      ticket: null,
      loading: true,
      error: null
    };
  },
  async created() {
    console.log("Fetching ticket with ID:", this.id); // Debugging

    try {
      const response = await TicketService.getTicket(this.id);
      this.ticket = response.data;
    } catch (error) {
      this.error = "Failed to load ticket details. Please try again later.";
      console.error("Error fetching ticket:", error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
