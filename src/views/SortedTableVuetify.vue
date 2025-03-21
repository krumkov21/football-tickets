<template>
  <v-container>
    <!-- Search Input -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search by name, email, or website"
          clearable
          outlined
          class="search-input"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Data Table -->
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          item-key="id"
          class="elevation-1"
          hide-default-footer
          :sort-by="sortKey"
          :sort-desc="[sortOrder === 'desc']"
          @update:sort-by="onSortUpdate"
          @update:sort-desc="onSortUpdate"
          dense
          fixed-header
        >
          <!-- Table Header with Sorting -->
          <template v-slot:[`column.name`]="{toggleSort }">
            <span @click="toggleSort('name')" style="cursor: pointer;">
              Name
              {{ sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
            </span>
          </template>

          <template v-slot:[`column.email`]="{toggleSort }">
            <span @click="toggleSort('email')" style="cursor: pointer;">
              Email
              {{ sortKey === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
            </span>
          </template>

          <template v-slot:item="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.username }}</td>
              <td>{{ props.item.email }}</td>

              <!-- Address Column with Tooltip -->
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="tooltip-container">
                      {{ props.item.address.city }}
                    </span>
                  </template>
                  <span class="tooltip-text">
                    📍 {{ props.item.address.street }}, {{ props.item.address.suite }}<br />
                    🏠 {{ props.item.address.zipcode }}<br />
                    🌍 Geo: ({{ props.item.address.geo.lat }}, {{ props.item.address.geo.lng }})
                  </span>
                </v-tooltip>
              </td>

              <td>{{ props.item.phone }}</td>
              <td>{{ props.item.website }}</td>

              <!-- Company Column with Tooltip -->
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="tooltip-container">
                      {{ props.item.company.name }}
                    </span>
                  </template>
                  <span class="tooltip-text">
                    {{ props.item.company.catchPhrase }}<br />
                    {{ props.item.company.bs }}
                  </span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
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
      headers: [
        { text: "Name", align: "start", key: "name", sortable: true },
        { text: "Username", align: "start", key: "username", sortable: false },
        { text: "Email", align: "start", key: "email", sortable: true },
        { text: "Address", align: "start", key: "address", sortable: false },
        { text: "Phone", align: "start", key: "phone", sortable: false },
        { text: "Website", align: "start", key: "website", sortable: false },
        { text: "Company", align: "start", key: "company", sortable: false },
      ],
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
    onSortUpdate() {
      this.sortUsers();
    },
    sortUsers() {
      this.users.sort((a, b) => {
        if (this.sortKey === "name") {
          return this.sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (this.sortKey === "email") {
          return this.sortOrder === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        }
        return 0;
      });
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
/* General container and input styling */
.search-input {
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
}

.v-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

/* Styling for table and data rows */
.v-data-table {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

}

.v-data-table th {
  background-color: #f1f1f1;
  text-align: left;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.v-data-table th:hover {
  background-color: #e3e3e3;
}

.v-data-table td {
  padding: 10px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}

.v-data-table tr:hover {
  background-color: #f9f9f9;
}

/* Tooltip styling */
.tooltip-container {
  position: relative;
  cursor: pointer;
  color: #007bff;
  font-weight: bold;
}

.tooltip-container:hover {
  text-decoration: underline;
}

/* Styling for Vuetify Tooltip */
.v-tooltip__content {
  font-size: 14px;
  max-width: 300px;
  white-space: normal;
}

</style>
