<template>
  <div>
    <Breadcrumbs title="カテゴリーの一覧"/>
    <h1>カテゴリーの一覧</h1>
    <ul>
      <li v-for="entry in entries">
        <nuxt-link :to="'/posts/categories/' + entry.fields.slug">
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
