<template lang="pug">
  .noselect
    a.panel-block(
      :style="`padding-left: ${level * 1.5 + 1}em`"
      :class="{'has-background-white-ter': expanded, 'has-text-primary': selected == item.id}"
      @click="expand()"
    )
      .container
        .columns.is-mobile.is-vcentered
          .column(
            :class="{ 'has-text-weight-bold': expanded || selected == item.id }"
          ) {{ item.name }}
          .column.is-narrow.has-text-right(v-if="item.children.length")
            span.icon.is-small.has-text-grey-light(v-show="expanded")
              i.fas.fa-chevron-down
            span.icon.is-small.has-text-grey-light(v-show="!expanded")
              i.fas.fa-chevron-right
    div(v-if="expanded")
      tree-item.has-background-light(
        v-if="item.children.length"
        :item="{'id':item.id,'children':[],'name': $t('all') }"
        :selected="selected"
        :level="level + 1"
      )
      template(v-for="(child, index) in item.children")
        tree-item.has-background-light(
          :item="child"
          :key="index"
          :selected="selected"
          :level="level + 1"
        )
</template>
<script>
// eslint-disable-next-line import/no-self-import
import TreeItem from './TreeItem.vue';

export default {
  name: 'TreeItem',
  data: () => ({
    expanded: false,
  }),
  components: {
    TreeItem,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    selected: {
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  methods: {
    expand() {
      if (this.item.children.length) {
        this.expanded = !this.expanded;
      } else {
        this.$parent.$emit('selected-item', this.item.id);
      }
    },
  },
  created() {
    this.$on('selected-item', (id) => { this.$parent.$emit('selected-item', id); });
  },
};
</script>
<style>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
</style>
