<template>
  <div>
    <Breadcrumbs :breadcrumbs="[{ text: 'Top', path: '/' }]" />
    <h1>Home</h1>
    <h2>Posts</h2>
    <ul>
      <li>
        <nuxt-link to="/posts">/posts/index.vue</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/posts/tags">/posts/tags/index.vue</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/posts/categories"
          >/posts/categories/index.vue</nuxt-link
        >
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
