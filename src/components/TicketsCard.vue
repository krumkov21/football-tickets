<template>
  <router-link class="ticket-link" :to="{ name: 'ticket-show', params: { id: ticket.id } }">
    <div class="ticket-card -shadow">
      <span class="eyebrow">⏱︎ {{ ticket.time }} on {{ ticket.date }}</span>
      <h4 class="title">{{ ticket.home }} vs {{ ticket.guest}}</h4>
      <h4 class="title">💺No̱ {{ ticket.seat }}</h4>
      <h4 class="title">💵 {{ ticket.price }} €</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    ticket: Object
  }
}
</script>

<style scoped>
.ticket-link {
  display: block;
  text-decoration: none; 
  margin-bottom: 20px;
}

.ticket-card {
  background-color: #2a2a3b;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  margin-bottom: 30px;
}

.ticket-card.-shadow:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
}

.eyebrow {
  display: block;
  font-size: 0.9rem;
  color: #ff6f61;
  font-weight: 500;
  margin-bottom: 10px;
}

.title {
  font-size: 1.2rem;
  margin: 5px 0;
  color: #f5f5f5;
  font-weight: 600;
}

.title:last-child {
  color: #ffce54;
}

@media (max-width: 768px) {
  .ticket-card {
    padding: 15px;
  }

  .title {
    font-size: 1rem;
  }

  .eyebrow {
    font-size: 0.8rem;
  }
}
</style>

