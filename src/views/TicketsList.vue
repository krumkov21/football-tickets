<template>
  <div>
    <h1>Tickets Listing</h1>
    <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"/>
  </div>
</template>

<script>
import TicketCard from '@/components/TicketsCard.vue'
import TicketService from '@/services/TicketsService.js'

export default {
  components: {
    TicketCard
  },
  data() {
    return {
      tickets: []
    }
  },
  created() {
    TicketService.getTickets()
      .then(response => {
        this.tickets = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}
</script>