<template>
  <div class="post-horizontal-tich-text">
    <div class="post-horizontal-tich-text__left">
      <PostRichText :richtext="data.leftRichText" />
    </div>
    <div class="post-horizontal-tich-text__right">
      <PostRichText :richtext="data.rightRichText" />
    </div>
  </div>
</template>

<script>
import PostRichText from "~/components/PostRichText.vue";

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
.post-horizontal-tich-text {
  border: 1px solid #000;
  display: flex;
}
.post-horizontal-tich-text__left {
  width: 50%;
  padding: 2rem;
}
.post-horizontal-tich-text__right {
  width: 50%;
  padding: 2rem;
}
</style>
