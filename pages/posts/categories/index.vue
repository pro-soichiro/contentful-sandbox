<template>
  <div>
    <Breadcrumbs />
    <h1>/posts/categories/index.vue</h1>
    <h2>カテゴリーの一覧</h2>
    <ul>
      <li v-for="entry in entries">
        <nuxt-link :to="'/posts/categories/' + entry.fields.url">
          {{ entry.fields.name }}
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
  async asyncData({ store }) {
    await store.dispatch("contentful/fetchEntries", "postsCategory");
    return { entries: store.state.contentful.entries };
  },
};
</script>
