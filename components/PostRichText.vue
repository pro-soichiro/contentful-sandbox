<template>
  <div class="post-rich-text">
    <div v-html="richTextResponse(richtext)"></div>
  </div>
</template>

<script>
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export default {
  props: {
    richtext: {
      type: Object,
      required: true,
    },
  },
  methods: {
    renderEmbeddedAsset({
      data: {
        target: { fields },
      },
    }) {
      return `<img src="${fields.file.url}" alt="${fields.description}"/>`;
    },
    renderHyperlink({ data, content }, next) {
      return `<a href="${data.uri}" target="_blank">${next(content)}</a>`;
    },
    richTextResponse(content) {
      const renderOptions = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: this.renderEmbeddedAsset,
          [INLINES.HYPERLINK]: this.renderHyperlink,
        },
      };
      return documentToHtmlString(content, renderOptions);
    },
  },
};
</script>

<style>
.post-rich-text img {
  width: 100%;
}
</style>
