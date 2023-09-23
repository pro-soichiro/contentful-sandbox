<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div>{{ user.id }}</div>
    <div>{{ user.name }}</div>
    <div>{{ user.age }}</div>
    <nuxt-link :to="`/users/${user.id}/edit`">
      Edit
    </nuxt-link>
  </div>
</template>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  async asyncData({ store, params }) {
    await store.dispatch("contentful/fetchUser", params.id);
    return { user: store.state.contentful.user };
  },
  computed: {
    routeDetail() {
      return this.$route.params;
    },
    breadcrumbs() {
      return [
        { text: "Home", path: "/" },
        {
          text: "users",
          path: "/users",
        },
        {
          text: this.user.name,
          path: `/users/${this.user.id}`,
        },
      ];
    },
  },
};
</script>
