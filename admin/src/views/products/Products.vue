<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      v-data-table.border.radius(
        :headers="headers"
        :items="products"
        hide-default-footer)
        template(v-slot:item="{ item }")
          tr
            td {{ item.name }}
            td.text-center
              v-icon(v-if="item.active" small) check
              v-icon(v-else small) remove
            td.text-center {{ item.category ? item.category.name : '-' }}
            td.text-center {{ item.brand ? item.brand.name : '-' }}
            td.text-center {{ item.createdAt | moment('YYYY-MM-DD HH:mm') }}
            td.text-center {{ item.updatedAt | moment('YYYY-MM-DD HH:mm') }}
            td.text-end
              v-btn(icon small :to="{ name: 'products.edit', params: { id: item.id } }")
                v-icon(small) edit
              v-btn(icon small color="red" @click="removeProduct(item.id)")
                v-icon(small) delete
        template(v-slot:footer)
          v-divider
          .text-end.pa-2
            v-btn(outlined color="#707070" :to="{ name: 'products.add' }") Добавить товар
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Products',
  data: () => ({
    headers: [
      { text: 'Наименование', value: 'name' },
      { text: 'Активный', value: 'active', align: 'center' },
      { text: 'Категория', value: 'categoryId', align: 'center' },
      { text: 'Бренд', value: 'brandId', align: 'center' },
      { text: 'Дата создания', value: 'createdAt', align: 'center' },
      { text: 'Дата изменение', value: 'updatedAt', align: 'center' },
      { sortable: false },
    ],
  }),
  computed: {
    ...mapState('products', { findProductsLoading: 'isFindPending' }),
    ...mapGetters('products', { findProductsInStore: 'find' }),
    products() { return this.findProductsInStore().data; },
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
  },
  created() {
    this.findProducts();
  },
};
</script>
