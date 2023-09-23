<template>
  <div>
    <nuxt-link v-for="(crumb, i) in breadcrumbs" :key="i" :to="crumb.path">
      {{ crumb.text }}
      <span v-if="i !== breadcrumbs.length - 1"> &gt; </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: { type: Array, default: () => [], required: true }
  },
}
</script>
