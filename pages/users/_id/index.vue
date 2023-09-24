<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" :title="user.name" />
    <div>{{ user.id }}</div>
    <div>{{ user.name }}</div>
    <div>{{ user.age }}</div>
    <nuxt-link :to="`/users/${user.id}/edit`"> Edit </nuxt-link>
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
    breadcrumbs() {
      return [
        {
          text: "ユーザー一覧",
          path: "/users",
        },
      ];
    },
  },
};
</script>
