<template>
  <div>
    <nuxt-link to="/">TOP</nuxt-link>
    <span v-if="breadcrumbs.length"> &gt; </span>
    <span v-for="(crumb, i) in breadcrumbs" :key="i">
      <nuxt-link :to="crumb.path">
        {{ crumb.text }}
      </nuxt-link>
      <span v-if="i !== breadcrumbs.length - 1"> &gt; </span>
    </span>
    <span v-if="title"> &gt; </span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: { type: Array, default: () => [] },
    title: { type: String, default: null }
  },
}
</script>
