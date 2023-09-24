<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" :title="category.fields.name+'の一覧'" />
    <h1>{{ category.fields.name }}の一覧</h1>
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
        { text: "お役立ち情報", path: "/posts" },
      ];
    },
  },
};
</script>
