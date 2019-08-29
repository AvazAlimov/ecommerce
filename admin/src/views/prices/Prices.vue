<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      v-data-table.border.radius(
        :headers="headers"
        :items="products"
        hide-default-footer
        :expanded.sync="expanded")
        template(v-slot:item="{ item }")
          tr
            td
              v-btn(icon small @click="toggleItem(item)")
                v-icon {{ expanded.includes(item) ? 'expand_less' : 'expand_more' }}
            td {{ item.name }}
            td.text-center {{ item.category ? item.category.name : '-' }}
            td.text-center {{ item.brand ? item.brand.name : '-' }}
            td.text-end.title {{ item.prices.length ? item.prices[0].value : '0' }} сум
        template(v-slot:expanded-item="{ headers, item }")
          tr(v-for="price in item.prices" :key="price.id")
            td.border.text-end(:colspan="headers.length") {{ price.value }} сум
        template(v-slot:footer)
          v-divider
          .text-end.pa-2
            v-btn.mr-2(outlined color="#707070") Импортировать цены
            v-btn(outlined color="#707070") Опубликовать цены
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Prices',
  data: () => ({
    expanded: [],
    headers: [
      { sortable: false },
      { text: 'Наименование', value: 'name' },
      { text: 'Категория', value: 'category.name', align: 'center' },
      { text: 'Бренд', value: 'brand.name', align: 'center' },
      { text: 'Цена', value: 'price', align: 'end' },
    ],
  }),
  computed: {
    ...mapState('products', { findProductsLoading: 'isFindPending' }),
    ...mapGetters('products', { findProductsInStore: 'find' }),
    products() {
      const products = this.findProductsInStore().data;
      return products;
    },
  },
  methods: {
    ...mapActions('products', ['remove']),
    ...mapActions('products', { findProducts: 'find' }),
    removeProduct(id) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Do you really want to remove a product?')) {
        this.remove(id);
      }
    },
    toggleItem(item) {
      const index = this.expanded.indexOf(item);
      if (index > -1) {
        this.expanded.splice(index, 1);
      } else {
        this.expanded.push(item);
      }
    },
  },
  created() {
    this.findProducts();
  },
};
</script>
