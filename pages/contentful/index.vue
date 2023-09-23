<template>
  <div>
    <ul>
      <li v-for="user in users">
        <nuxt-link :to="'/contentful/'+user.fields.id">
          {{ user.fields.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ store }) {
    await store.dispatch('contentful/fetchEntries', 'users')
    return {
      users: store.state.contentful.entries
    }
  },
};
</script>
