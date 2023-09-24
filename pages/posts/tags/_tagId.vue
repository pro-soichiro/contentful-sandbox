<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" :title="this.tag.name+'の一覧'" />
    <h1>{{ tag.name }}の一覧</h1>
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
  head() {
    return {
      title: `${this.tag.name}の一覧`
    }
  },
  components: {
    Breadcrumbs,
  },
  async asyncData({ store, params }) {
    await store.dispatch("contentful/fetchEntries", "posts");
    const filterdEntries = store.state.contentful.entries.filter((item) => {
      return item.fields.postsTags.some(
        (tag) => tag.fields.slug === params.tagId
      );
    });
    await store.dispatch("contentful/fetchTag", params.tagId);
    return { tag: store.state.contentful.tag, entries: filterdEntries };
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
