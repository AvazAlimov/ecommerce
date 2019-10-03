<template lang="pug">
  section.hero.is-fullheight
    .hero-head
      .container(style="padding-top: 1.5em; padding-bottom: 1.5em;")
        .columns
          .column.is-one-third
            .title.is-4 {{ $t('brands') }}
            ec-tree(:items="brands" v-model="brandId")
          .column
            .title.is-4 {{ $t('products') }}
            feathers-vuex-find(service="products" :query="{ brandId }" watch="query.brandId")
              template(slot-scope="{ items, isFindPending, pagination }")
                .columns.is-gapless
                  .column.is-one-third-desktop.is-half-tablet(
                    v-for="(item, index) in items" :key="index"
                  )
                    ec-item(:item="item")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
/* eslint-disable import/no-unresolved */
import Tree from '@/components/Tree.vue';
import Item from '@/components/Item.vue';

export default {
  name: 'Brands',
  components: {
    'ec-tree': Tree,
    'ec-item': Item,
  },
  data: () => ({
    brandId: null,
  }),
  computed: {
    ...mapGetters('brands', { findBrandsInStore: 'find' }),
    brands() {
      const items = this.findBrandsInStore().data
        .map(item => ({
          id: item.id,
          name: item.names[this.$i18n.locale],
          count: item.productIds.length,
          children: [],
        }));
      return items;
    },
  },
  methods: {
    ...mapActions('brands', { findBrands: 'find' }),
  },
  created() {
    this.findBrands();
  },
};
</script>
