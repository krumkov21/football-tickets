<template>
  <div class="table-container">
    <input
      v-model="search"
      placeholder="Search by name, email, or website"
      class="search-input"
    />

    <table>
      <thead>
        <tr>
          <th @click="toggleSortOrder('name')">
            Name
            {{ sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "" }}
          </th>
          <th>Username</th>
          <th @click="toggleSortOrder('email')">
            Email
            {{ sortKey === "email" ? (sortOrder === "asc" ? "↑" : "↓") : "" }}
          </th>
          <th>Address</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>

          <td class="tooltip-container">
            <span class="tooltip-text">
              📍 {{ user.address.street }}, {{ user.address.suite }}<br />
              🏠 {{ user.address.zipcode }}<br />
              🌍 Geo: ({{ user.address.geo.lat }}, {{ user.address.geo.lng }})
            </span>
            {{ user.address.city }}
          </td>

          <td>{{ user.phone }}</td>
          <td>{{ user.website }}</td>

          <td class="tooltip-container">
            <span class="tooltip-text">
              {{ user.company.catchPhrase }}<br />
              {{ user.company.bs }}
            </span>
            {{ user.company.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      search: "",
      sortOrder: "asc",
      sortKey: "name",
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        `${user.name} ${user.website} ${user.email}`
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    },
    sortedUsers() {
      return [...this.filteredUsers].sort((a, b) => {
        return this.sortOrder === "asc"
          ? a[this.sortKey].localeCompare(b[this.sortKey])
          : b[this.sortKey].localeCompare(a[this.sortKey]);
      });
    },
  },
  methods: {
    toggleSortOrder(column) {
      if (this.sortKey === column) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = column;
        this.sortOrder = "asc";
      }
    },
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => (this.users = response.data))
      .catch((error) => console.error("Error fetching users:", error));
  },
};
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.search-input {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

table {
  width: 80%;
  max-width: 900px;
  border-collapse: collapse;
  text-align: center;
  background-color: #e1bee7;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

th,
td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #b39ddb;
  cursor: pointer;
}

.tooltip-container {
  position: relative;
  cursor: pointer;
  color: black;
}

.tooltip-text {
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 8px 12px;
  position: absolute;
  z-index: 1;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out, bottom 0.2s ease-in-out;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  bottom: 135%;
}
</style>
