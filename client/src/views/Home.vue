<template lang="pug">
  .container(style="padding-top: 1.5em; padding-bottom: 1.5em;")
    .columns
      .column.is-one-third
        .title.is-4 Categories
        ec-tree(:items="categories" v-model="categoryId")
      .column
        .title.is-4 Products
        feathers-vuex-find(service="products" :query="{ categoryId }" watch="query.categoryId")
          template(slot-scope="{ items, isFindPending, pagination }")
            .columns.is-gapless
              .column.is-one-quarter(v-for="(item, index) in items" :key="index")
                .card.item
                  figure.image(v-if="item.photos.length")
                    img.item-image(:src="item.photos[0].path + item.photos[0].thumbnail")
                  br
                  .is-size-6.has-text-dark.name {{ item.names['ru'] }}
                  br
                  .is-size-6(v-if="item.prices.length")
                    .has-text-grey-dark
                      strong {{ item.prices[0].value }}
                      |  сум
                  .is-size-6(v-else) -
                  br
                  button.button.is-fullwidth Add to card
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// eslint-disable-next-line import/no-unresolved
import Tree from '@/components/Tree.vue';

export default {
  name: 'Home',
  components: {
    'ec-tree': Tree,
  },
  data: () => ({
    categoryId: null,
  }),
  computed: {
    ...mapGetters('categories', { findCategoriesInStore: 'find' }),
    categories() {
      const categories = this.findCategoriesInStore().data
        .map(item => ({
          id: item.id,
          name: item.name,
          names: item.names,
          parentId: item.parentId,
          children: [],
        }));

      categories.filter(category => category.parentId !== null)
        .forEach((category) => {
          const parent = categories.find(item => item.id === category.parentId);
          if (parent) parent.children.push(category);
          else category.parentId = null; // eslint-disable-line no-param-reassign
        });
      const parents = categories.filter(category => category.parentId === null);
      if (parents.length) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.categoryId = parents[0].id;
      }
      return parents;
    },
  },
  methods: {
    ...mapActions('categories', { findCategories: 'find' }),
  },
  created() {
    this.findCategories();
  },
};
</script>
<style lang="stylus">
.child
  padding-left 10px
.item
  padding 1em
.item-image
  min-height 192px
  max-height 192px
  object-fit scale-down
.name
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
</style>
