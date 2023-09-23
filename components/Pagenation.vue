<template>
  <div>
    <button @click="changePage(1)" :disabled="currentPage === 1">最初</button>
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">前</button>
    <span v-for="page in pages" :key="page">
      <button @click="changePage(page)" :disabled="currentPage === page">{{ page }}</button>
    </span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPage">次</button>
    <button @click="changePage(totalPage)" :disabled="currentPage === totalPage">最後</button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageRange: {
      type: Number,
      default: 5
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pages() {
      let start = this.currentPage - Math.floor(this.pageRange / 2);
      start = Math.max(start, 1);
      const end = start + this.pageRange - 1;
      if (end > this.totalPage) {
        start = this.totalPage - this.pageRange + 1;
      }
      return Array.from({ length: this.pageRange }, (_, i) => start + i).filter(page => page <= this.totalPage);
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    }
  }
}
</script>
