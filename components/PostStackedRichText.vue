<template>
  <div class="post-stacked-rich-text">
    <PostRichText
      :richtext="data.richText"
    />
  </div>
</template>

<script>
import PostRichText from '~/components/PostRichText.vue';

export default {
  components: {
    PostRichText,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post-stacked-rich-text {
  border: 1px solid #000;
}
</style>
