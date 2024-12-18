<template>
  <div>
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
</template>

<script>
import TicketService from '@/services/TicketsService.js'

export default {
  props: ['id'],
  data() {
    return {
      ticket: {},
      loading: true,
      error: null
    }
  },
  created() {
    TicketService.getTicket(this.id)
      .then(response => {
        this.ticket = response.data || {};
        this.loading = false;
      })
      .catch(error => {
        this.error = 'Failed to load ticket details. Please try again later.';
        console.log('There was an error:', error.response);
        this.loading = false;
      });
  }
}
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