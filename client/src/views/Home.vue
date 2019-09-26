<template lang="pug">
  section.hero.is-fullheight
    .hero-head
      .container(style="padding-top: 1.5em; padding-bottom: 1.5em;")
        .columns
          .column.is-one-third
            .title.is-4 {{ $t('categories') }}
            ec-tree(:items="categories" v-model="categoryId")
          .column
            .title.is-4 {{ $t('products') }}
            feathers-vuex-find(service="products" :query="{ categoryId }" watch="query.categoryId")
              template(slot-scope="{ items, isFindPending, pagination }")
                .columns.is-gapless
                  .column.is-one-quarter(v-for="(item, index) in items" :key="index")
                    ec-item(:item="item")
      //- .modal.is-active
      //-   .modal-background
      //-   .modal-card
      //-     section.modal-card-body
      //-       h1 Sign in
      //-   button.modal-close.is-large(aria-label="close")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
/* eslint-disable import/no-unresolved */
import Tree from '@/components/Tree.vue';
import Item from '@/components/Item.vue';

export default {
  name: 'Home',
  components: {
    'ec-tree': Tree,
    'ec-item': Item,
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
          name: item.names[this.$i18n.locale],
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
