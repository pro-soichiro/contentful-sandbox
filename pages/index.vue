<template>
  <div>
    <Breadcrumbs />
    <h1>Home</h1>
    <h2>お役立ち情報</h2>
    <ul>
      <li>
        <nuxt-link to="/posts">お役立ち情報一覧</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/posts/tags">タグ一覧</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/posts/categories">カテゴリー一覧</nuxt-link>
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
  name: "IndexPage",
};
</script>
