<template>
  <div>
    <Breadcrumbs title="お役立ち情報" />
    <h1>お役立ち情報</h1>
    <ul>
      <li v-for="entry in entries">
        <nuxt-link :to="'/posts/' + entry.fields.slug">
          {{ entry.fields.title }}
        </nuxt-link>
      </li>
    </ul>
    <Pagenation
      :totalItems="entries.length"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      :pageRange="pageRange"
    />
  </div>
</template>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import Pagenation from "~/components/Pagenation.vue";

export default {
  components: {
    Breadcrumbs,
    Pagenation,
  },
  data() {
    return {
      totalItems: "",
      itemsPerPage: 2,
      currentPage: 1,
      pageRange: 1,
    };
  },
  async asyncData({ store }) {
    await store.dispatch("contentful/fetchEntries", "posts");
    return { entries: store.state.contentful.entries };
  },
  // computed: {
  //   breadcrumbs() {
  //     return [
  //       { text: "Top", path: "/" },
  //       { text: "記事", path: "/posts" },
  //     ];
  //   },
  // },
};
</script>
