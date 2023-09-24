<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" :title="post.title" />
    <dl>
      <dt>slug</dt>
      <dd>{{ post.slug }}</dd>
      <dt>title</dt>
      <dd>{{ post.title }}</dd>
      <dt>category</dt>
      <dd>
        <nuxt-link :to="'/posts/categories/' + post.postsCategory.fields.slug">
          {{ post.postsCategory.fields.name }}
        </nuxt-link>
      </dd>
      <dt>tags</dt>
      <ul>
        <li v-for="entry in post.postsTags">
          <nuxt-link :to="'/posts/tags/' + entry.fields.slug">
            {{ entry.fields.name }}
          </nuxt-link>
        </li>
      </ul>
      <dt>thumbnail</dt>
      <dd>
        <img
          :src="post.thumbnail.fields.file.url"
          :alt="post.thumbnail.fields.description"
          width="200px">
      </dd>
      <dt>content</dt>
      <PostRichText :richtext="post.content" />
      <dt>contentBlocks</dt>
      <component
        v-for="(contentBlock, index) in post.contentBlocks"
        :key="index"
        :is="capitalizedContentTypeId(contentBlock.sys.contentType.sys.id)"
        :data="contentBlock.fields"
      />
    </dl>
  </div>
</template>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import { mapState } from "vuex";
import PostRichText from "~/components/PostRichText.vue";

export default {
  components: {
    Breadcrumbs,
    PostRichText,
  },
  async asyncData({ store, params }) {
    await store.dispatch("contentful/fetchPost", params.id);
  },
  computed: {
    ...mapState({
      post: (state) => state.contentful.post,
    }),
    breadcrumbs() {
      return [
        { text: "お役立ち情報", path: "/posts" },
        {
          text: this.post.postsCategory.fields.name+'の一覧',
          path: `/posts/categories/${this.post.postsCategory.fields.slug}`,
        },
      ];
    },
  },
  methods: {
    capitalizedContentTypeId(contentTypeId) {
      return contentTypeId.charAt(0).toUpperCase() + contentTypeId.slice(1);
    },
  },
};
</script>
