<template>
  <v-app>
    <v-container fluid>
  
      <v-text-field
        v-model="search"
        label="Search by name, email, or website"
        prepend-inner-icon="mdi-magnify"
        outlined
        dense
        clearable
      ></v-text-field>

      <v-btn @click="toggleFilters" color="primary" block> Sort By </v-btn>

      <v-row v-if="showFilters">
        <v-col cols="6">
          <v-btn @click="sortBy('name')" color="secondary" block>
            Name
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn @click="sortBy('email')" color="secondary" block>
            Email
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="sortedItems"
        :loading="loading"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:loading>
          <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </template>

        <template v-slot:item="props">
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.username }}</td>
            <td>{{ props.item.email }}</td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ props.item.address.city }}</span>
                </template>
                <span>
                  📍 {{ props.item.address.street }},
                  {{ props.item.address.suite }}<br />
                  🏠 {{ props.item.address.zipcode }}<br />
                  🌍 Geo: ({{ props.item.address.geo.lat }},
                  {{ props.item.address.geo.lng }})
                </span>
              </v-tooltip>
            </td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.website }}</td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ props.item.company.name }}</span>
                </template>
                <span>
                  {{ props.item.company.catchPhrase }}<br />
                  {{ props.item.company.bs }}
                </span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      sortKey: "",
      sortOrder: 1,
      showFilters: false,
      headers: [
        { text: "Name", value: "name", sortable: false },
        { text: "Username", value: "username", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Adress", value: "address.city", sortable: false },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Website", value: "website", sortable: false },
        { text: "Company", value: "company.name", sortable: false },
      ],
      items: [],
      loading: false,
    };
  },
  computed: {
    filteredItems() {
      if (!this.search) return this.items;
      const lowerSearch = this.search.toLowerCase();
      return this.items.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.email.toLowerCase().includes(lowerSearch) ||
          item.website.toLowerCase().includes(lowerSearch)
      );
    },
    sortedItems() {
      if (!this.sortKey) return this.filteredItems;
      return [...this.filteredItems].sort(
        (a, b) =>
          a[this.sortKey].localeCompare(b[this.sortKey]) * this.sortOrder
      );
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    getSortIcon(key) {
      if (this.sortKey !== key) return "";
      return this.sortOrder === 1 ? "↑" : "↓";
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
  },
};
</script>

<style scoped>
.v-container {
  height: 100%;
}

.v-data-table-header .v-sortable {
  display: none !important;
}
</style>
