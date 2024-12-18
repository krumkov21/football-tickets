<template>
  <div id="nav" class="nav">
    <router-link to="/" class="brand">Football Tickets</router-link>
    <nav>
      <router-link :to="{ name: 'ticket-list' }">List</router-link>
      <router-link :to="{ name: 'ticket-create' }">Create</router-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #1e1e2f;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
}

.brand {
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  color: #ff6f61; 
  transition: color 0.3s ease, transform 0.2s ease;
}

.brand:hover {
  color: #ff8a75;
  transform: scale(1.05);
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid transparent;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
}

nav a:hover {
  background-color: #ff6f61; 
  color: #1e1e2f;
  border: 1px solid #ff6f61;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>


