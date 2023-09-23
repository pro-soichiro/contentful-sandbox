<template>
  <div>
    <ul>
      <li v-for="blog in blogs">
        <nuxt-link :to="'/blogs/'+blog.sys.id">
          {{ blog.fields.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('contentful/fetchEntries', 'blogs')
    return {
      blogs: store.state.contentful.entries
    }
  },
};
</script>
