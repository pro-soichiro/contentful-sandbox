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
    renderBlockEmbeddedAsset({
      data: {
        target: { fields },
      },
    }) {
      return `<img src="${fields.file.url}" alt="${fields.description}"/>`;
    },
    renderHyperlink({ data, content }, next) {
      return `<a href="${data.uri}" target="_blank">${next(content)}</a>`;
    },
    renderEntryHyperlink({
      data: {
        target: { fields, sys },
      }, content
    }, next) {
      if (sys.contentType.sys.id !== "posts") return;

      return `<a href="${fields.slug}" target="_blank">${next(content)}</a>`;
    },
    renderInlineEmbeddedEntry({
      data: {
        target: { fields, sys },
      },
    }) {
      if (sys.contentType.sys.id !== "posts") return;

      return `<a href="${fields.slug}" target="_blank">${fields.title}</a>`;
    },
    renderBlockEmbeddedEntry({
      data: {
        target: { fields, sys },
      },
    }) {
      if (sys.contentType.sys.id === "posts") {
        return `<a href="${
        fields.slug
      }" target="_blank" class="embedded-post-card"><div class="embedded-post-card__caption"><strong class="embedded-post-card__caption-title">${
        fields.title
      }</strong><em class="embedded-post-card__caption-description">${
        fields.description
      }</em><em class="embedded-post-card__caption-url">http://localhost:3000/posts/${
        fields.slug
      }</em></div><div class="embedded-post-card__image"><div><div><img src="${
        fields.thumbnail.fields.file.url
      }" alt="${fields.thumbnail.fields.description}"/></div></div></div></a>`;
      }
    },
    richTextResponse(richtextObject) {
      const renderOptions = {
        renderNode: {
          [BLOCKS.EMBEDDED_ENTRY]: this.renderBlockEmbeddedEntry,
          [BLOCKS.EMBEDDED_ASSET]: this.renderBlockEmbeddedAsset,
          [INLINES.EMBEDDED_ENTRY]: this.renderInlineEmbeddedEntry,
          [INLINES.HYPERLINK]: this.renderHyperlink,
          [INLINES.ENTRY_HYPERLINK]: this.renderEntryHyperlink,
        },
      };
      return documentToHtmlString(richtextObject, renderOptions);
    },
  },
};
</script>

<style>
.post-rich-text img {
  width: 100%;
}
.embedded-post-card {
    max-width: 700px;
    border: 1px solid lightgray;
    border-radius: 4px;
    margin-bottom: 1rem;
    display: flex;
}
.embedded-post-card__caption {
  padding: 1.4rem;
  flex: 4 1 180px;
}
.embedded-post-card__caption-title,
.embedded-post-card__caption-description,
.embedded-post-card__caption-url {
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  -webkit-box-orient: vertical;
}
.embedded-post-card__caption-title {
  font-weight: bold;
  margin-bottom: 0.8rem;

  font-size: 1.4rem;
  line-height: 2.2rem;

  -webkit-line-clamp: 2;
}
.embedded-post-card__caption-description,
.embedded-post-card__caption-url {
  font-size: 1.2rem;
  line-height: 1.6rem;
}
.embedded-post-card__caption-description {
  color: grey;
  -webkit-line-clamp: 2;
}
.embedded-post-card__caption-url {
  margin-top: 0.6rem;
  -webkit-line-clamp: 1;
}
.embedded-post-card__image {
  flex: 1 1 180px;
  position: relative;
}
.embedded-post-card__image > div {
    position: absolute;
    inset: 0px;
}
.embedded-post-card__image > div > div {
      width: 100%;
      height: 100%;
}
.embedded-post-card__image > div > div > img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 0 3px 3px 0;
}
</style>
