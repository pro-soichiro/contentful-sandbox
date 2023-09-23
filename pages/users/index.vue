<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>Users</h1>
    <ul>
      <li v-for="user in users">
        <nuxt-link :to="'/users/' + user.fields.id">
          {{ user.fields.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  computed: {
    breadcrumbs() {
      return [
        { text: "Home", path: "/" },
        {
          text: "users",
          path: "/users",
        },
      ];
    },
  },
  async asyncData({ store }) {
    await store.dispatch("contentful/fetchEntries", "users");
    return { users: store.state.contentful.entries };
  },
};
</script>
