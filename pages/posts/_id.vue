<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>/posts/_id.vue</h1>
    <h2>記事詳細</h2>
    <dl>
      <dt>slug</dt>
      <dd>{{ post.slug }}</dd>
      <dt>title</dt>
      <dd>{{ post.title }}</dd>
      <dt>category</dt>
      <dd>
        <nuxt-link :to="'/posts/categories/' + post.postsCategory.fields.url">
          {{ post.postsCategory.fields.name }}
        </nuxt-link>
      </dd>
      <dt>tags</dt>
      <ul>
        <li v-for="entry in post.postsTags">
          <nuxt-link :to="'/posts/tags/' + entry.fields.url">
            {{ entry.fields.name }}
          </nuxt-link>
        </li>
      </ul>
      <dt>content</dt>
      <dd v-html="toHtmlString(post.content)"></dd>
    </dl>
  </div>
</template>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default {
  components: {
    Breadcrumbs,
  },
  async asyncData({ store, params }) {
    await store.dispatch("contentful/fetchPost", params.id);
    return { post: store.state.contentful.post };
  },
  computed: {
    breadcrumbs() {
      return [
        { text: "Top", path: "/" },
        { text: "記事", path: "/posts" },
        {
          text: this.post.postsCategory.fields.name,
          path: `/posts/categories/${this.post.postsCategory.fields.url}`,
        },
        { text: this.post.title, path: `/posts/${this.post.slug}` },
      ];
    },
  },
  methods: {
    toHtmlString(obj) {
      return documentToHtmlString(obj);
    },
  },
};
</script>
