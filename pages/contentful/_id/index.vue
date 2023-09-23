<template>
  <div>
    <table>
      <thead>
        <th>id</th>
        <th>name</th>
        <th>age</th>
      </thead>
      <tbody>
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({store, params}) {
    await store.dispatch('contentful/fetchUser', params.id)
    return { user: store.state.contentful.user }
  },
};
</script>
