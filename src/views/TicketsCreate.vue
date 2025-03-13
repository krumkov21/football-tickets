<template>
  <div>
    <NavBar/>
    <h1>Create a Match Ticket</h1>
    <form @submit.prevent="createTicket">
      <label>Select a League</label>
      <select v-model="ticket.league">
        <option v-for="league in leagues" :key="league">{{ league }}</option>
      </select>

      <h3>Name your match</h3>
      <div class="field">
        <label>Home Team</label>
        <input
          v-model="ticket.home"
          type="text"
          placeholder="Add home team's name"
        />
      </div>
      <div class="field">
        <label>Guest Team</label>
        <input
          v-model="ticket.guest"
          type="text"
          placeholder="Add guest team's name"
        />
      </div>

      <h3>Where is the match?</h3>
      <div class="field">
        <label>Stadium</label>
        <input
          v-model="ticket.location"
          type="text"
          placeholder="Add a stadium location"
        />
      </div>

       <h3>When is the match?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="ticket.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="ticket.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <div class="field">
        <label>Select a seat</label>
        <input
          v-model="ticket.seat"
          type="text"
          placeholder="Add a seat"
        />
      </div>

       <div class="field">
        <label>Select a price in EURO (€)</label>
        <input
          v-model="ticket.price"
          type="text"
          placeholder="Add a price"
        />
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import TicketsService from '@/services/TicketsService';
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    NavBar,
    Datepicker
  },
  data() {
    return {
      ticket: {
        home: "",
        guest: "",
        date: "",
        time: "",
        location: "",
        league: "",
        seat: "",
        price: ""
      },
       leagues: [
      "Premier League",
      "La Liga EA Sports",
      "Serie A",
      "Ligue 1 McDonald's",
      "BundesLiga",
    ],
      times: Array.from({ length: 24 }, (_, i) => `${i + 1}:00`)
    };
  },
  methods: {
    createTicket() {
      if (!this.ticket.home || !this.ticket.guest || !this.ticket.date || !this.ticket.time || !this.ticket.seat || !this.ticket.league || !this.ticket.price) {
        alert("Please fill in all required fields.");
        return;
      }
      TicketsService.postTicket(this.ticket)
        .then(() => {
          alert("Match ticket created successfully!");
          this.ticket = { home: "", guest: "", date: "", time: "", location: "", league: "", seat: "", price:""};
        })
        .catch(error => {
          console.error("There was an error creating the ticket:", error.response);
        });
    }
  }
};
</script>

<style scoped>
h1 {
  color:black;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

h3 {
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

label {
  color: #ff6f61;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
}

div {
  margin-bottom: 20px;
}

input, select, .datepicker {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #444;
  background-color: #2a2a3b;
  color: #ffffff;
  border-radius: 5px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input::placeholder {
  color: #777;
}

input:focus, select:focus, .datepicker:focus {
  border-color: #ff6f61;
  background-color: #333;
  outline: none;
}

.field {
  margin-bottom: 15px;
}

.button {
  display: inline-block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(135deg, #ff6f61, #ff8a75);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.button:hover {
  box-shadow: 0 4px 10px rgba(255, 111, 97, 0.5);
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(0);
  box-shadow: none;
}

form {
  background-color: #1e1e2f;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  input, select, .button {
    font-size: 0.9rem;
  }

  form {
    padding: 20px;
  }
}
</style>


