<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>/posts/tags/_tagId.vue</h1>
    <h2>{{ tag.name }}の一覧</h2>
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
        { text: "Top", path: "/" },
        { text: "記事", path: "/posts" },
        { text: `「${this.tag.name}」の一覧`, path: `/posts/tags/${this.tag.slug}` },
      ];
    },
  },
};
</script>
