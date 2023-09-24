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
    renderEmbeddedEntry({data: {target: {fields, sys}}}){
      if (sys.contentType.sys.id === 'posts') {
        return `<div class="external-article-widget">
                  <a href="${fields.slug}" target="_blank">
                    <strong class="external-article-widget-title">
                      ${fields.title}
                    </strong>
                    <em class="external-article-widget-description">
                      ${fields.description}
                    </em>
                    <em class="external-article-widget-url">
                      http://localhost:3000/${fields.slug}
                    </em>
                  </a>
                  <a
                    class="external-article-widget-image"
                    href="${fields.slug}"
                    style="background-image: url('${fields.thumbnail.fields.file.url}');"
                    target="_blank">
                  </a>
                </div>
                `;
      }
    },
    richTextResponse(richtextObject) {
      const renderOptions = {
        renderNode: {
          [BLOCKS.EMBEDDED_ENTRY]: this.renderEmbeddedEntry,
          [BLOCKS.EMBEDDED_ASSET]: this.renderEmbeddedAsset,
          [INLINES.HYPERLINK]: this.renderHyperlink,
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
.external-article-widget {
  display: table;
  width: 100%;
  border: 1px solid grey;
  border-radius: 4px;
}
.external-article-widget-title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.external-article-widget-description {
    display: -webkit-box;
    max-height: 3em;
    overflow: hidden;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.external-article-widget>a {
    display: table-cell;
    padding: 16px;
    vertical-align: middle;
}
.external-article-widget-image {
    width: 225px;
    height: 150px;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    border-left: 1px solid grey;
    border-radius: 0 3px 3px 0;
}
</style>
