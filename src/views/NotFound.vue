<template>
  <div>
    <NavBar />
    <h1>Oops!</h1>
    <h3>
      The<template v-if="resource">{{ resource }}</template> page you're looking
      for is not here.
    </h3>
    <router-link :to="{ name: 'ticket-list' }"
      >Back to the home page</router-link
    >
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
};
</script>
