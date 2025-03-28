<template>
  <v-container class="pa-4">
    <v-card class="custom-card" flat elevation="3">
      <v-card-title>Table 2</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="search"
          label="Search by name, email, or website"
          prepend-inner-icon="mdi-magnify"
          outlined
          hide-details
          class="custom-search"
        ></v-text-field>
      </v-card-text>

      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :custom-filter="customFilter"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        class="custom-table"
        dense
      >
        <template v-slot:[`item.address`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="tooltip-text">
                {{ item.address.city }}
              </span>
            </template>
            <span
              >📍 {{ item.address.street }}, {{ item.address.suite }}<br />
              🏠 {{ item.address.zipcode }}<br />
              🌍 Geo: ({{ item.address.geo.lat }},
              {{ item.address.geo.lng }})</span
            >
          </v-tooltip>
        </template>

        <template v-slot:[`item.company`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="tooltip-text">
                {{ item.company.name }}
              </span>
            </template>
            <span>{{ item.company.catchPhrase }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      users: [],
      sortBy: "name",
      sortDesc: false,
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Username", value: "username", sortable: false },
        { text: "Email", value: "email", sortable: true },
        { text: "Address", value: "address", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Website", value: "website", sortable: false },
        { text: "Company", value: "company", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    customFilter(value, search, user) {
      if (!search) return true;
      search = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.website.toLowerCase().includes(search)
      );
    },
    sortData(field) {
      if (this.sortBy === field) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortBy = field;
        this.sortDesc = false;
      }
    },
  },
};
</script>

<style scoped>
.custom-card {
  border-radius: 12px;
  padding: 20px;
  background-color: #f8f9fa;
}

.custom-search {
  max-width: 300px;
  margin-bottom: 10px;
}

.custom-table {
  border-radius: 10px;
  background-color: white;
}

.custom-table >>> tbody tr:nth-child(odd) {
  background-color: #f3f4f6;
}

.custom-table >>> tbody tr:hover {
  background-color: #e0e0e0;
  transition: 0.3s;
}

.tooltip-text {
  cursor: pointer;
  text-decoration: underline;
  position: relative;
  z-index: 10;
}

.v-tooltip__content {
  z-index: 1000 !important;
  visibility: visible !important;
  opacity: 1 !important;
  transition: opacity 0.3s ease !important;
}

.v-tooltip__content--bottom {
  transform: translateY(10px) !important;
}
</style>
