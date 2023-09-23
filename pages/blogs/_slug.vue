<template>
  <div>
    <dl>
      <dt>id</dt>
      <dd>{{ blog.sys.id }}</dd>
      <hr>
      <dt>name</dt>
      <dd>{{ blog.fields.name }}</dd>
      <hr>
      <dt>coverImage</dt>
      <dl>
        <dt>fields.title</dt>
        <dd>{{ blog.fields.coverImage.fields.title }}</dd>
        <dt>fields.description</dt>
        <dd>{{ blog.fields.coverImage.fields.description }}</dd>
        <dt>fields.file.url</dt>
        <dd>{{ blog.fields.coverImage.fields.file.url }}</dd>
      </dl>
      <hr>
      <dt>contentBlocks</dt>
      <dl>
        <div
          v-for="(contentBlock, index) in blog.fields.contentBlocks"
          :key="index"
          v-html="renderContentBlock(contentBlock)">
        </div>
      </dl>
    </dl>
    <pre>{{ blog.fields.contentBlocks[1] }}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {};
  },
  async asyncData({store, params}) {
    await store.dispatch('contentful/fetchEntry', { entryId: params.slug })
  },
  computed: {
    ...mapState({
      blog: state => state.contentful.entry
    })
  },
  methods: {
    renderContentBlock(contentBlock) {
      const contentTypeId = contentBlock.sys.contentType.sys.id
      const contentFields = contentBlock.fields
      if (contentTypeId === 'blogsText') {
        return `<dt>${contentTypeId}</dt>
                <dd>${contentFields.text}</dd>`
      } else if (contentTypeId === 'blogsTextAndImage') {
        return `<dt>${contentTypeId}</dt>
                <dd>${contentFields.image}</dd>
                <dd>${contentFields.text}</dd>
                `
      }
    }
  }
};
</script>


<style scoped>
dl dl{
  padding-left: 2rem;
}
</style>