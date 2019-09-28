<template lang="pug">
  nav.panel.has-background-white
    template(v-for="(item, index) in items")
      tree-item(
        :item="item"
        :key="index"
        :selected="value"
        :level="0")
</template>

<script>
import TreeItem from './TreeItem.vue';

export default {
  name: 'Tree',
  components: {
    TreeItem,
  },
  props: {
    value: {
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.$on('selected-item', (id) => {
      // this.selected = id;
      this.$emit('input', id);
    });
  },
};
</script>
