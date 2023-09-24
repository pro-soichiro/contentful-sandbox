<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" title="編集"/>
    <div v-if="state === 'ready'">
      <div>
        <label for="id">id</label>
        <input id="id" type="number" v-model="user.id">
      </div>
      <div>
        <label for="name">name</label>
        <input id="name" type="text" v-model="user.name">
      </div>
      <div>
        <label for="age">age</label>
        <input id="age" type="number" v-model="user.age">
      </div>
      <div>
        <button type="button" @click="submit">submit</button>
      </div>
    </div>
    <div v-else-if="state === 'sending'">
      sending...
    </div>
    <div v-else-if="state === 'success'">
      success!!
    </div>
  </div>
</template>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
      state: 'ready',
      user: {
        id: '',
        age: '',
        name: ''
      }
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch("contentful/fetchUser", params.id);
    return { user: { ...store.state.contentful.user }};
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'ユーザー一覧', path: '/users'},
        { text: this.user.id, path: `/users/${this.user.id}`},
      ]
    }
  },
  methods: {
    async submit() {
      this.state = 'sending'
      await this.$store.dispatch('contentful/updateUser', this.user)
      this.state = 'success'
      this.$router.push(`/users/${this.user.id}`)
      console.log('done')
    }
  }
}
</script>
