<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>/posts/categories/_categoryId.vue</h1>
    <h2>{{ category.fields.name }}の一覧</h2>
    <ul>
      <li v-for="entry in entries">
        <nuxt-link :to="'/posts/' + entry.fields.slug">
          {{ entry.fields.title }}
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
  async asyncData({ store, params }) {
    await store.dispatch("contentful/fetchEntries", "posts");
    const filterdEntries = store.state.contentful.entries.filter(
      (item) => item.fields.postsCategory.fields.slug === params.categoryId
    );
    return {
      category: {...filterdEntries[0].fields.postsCategory},
      entries: filterdEntries,
    };
  },
  computed: {
    breadcrumbs() {
      return [
        { text: "Top", path: "/" },
        { text: "記事", path: "/posts" },
        {
          text: this.category.fields.name,
          path: `/posts/categories/${this.category.fields.url}`,
        },
      ];
    },
  },
};
</script>
