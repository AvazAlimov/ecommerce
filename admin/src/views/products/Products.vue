<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      feathers-vuex-find(
        service="products"
        qid="table"
        :query="{ $skip: (page - 1) * 10 }"
        watch="query.$skip")

        template(slot-scope="{ items, isFindPending }")
          v-data-table.border.radius(
            :headers="headers"
            :loading="isFindPending"
            :items="items"
            :page.sync="page"
            :items-per-page="10"
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
              v-pagination(v-model="page" :length="pageCount")
              v-divider
              .text-end.pa-2
                v-btn(outlined color="#707070" :to="{ name: 'products.add' }") Добавить товар
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
    page: 1,
  }),
  computed: {
    ...mapState('products', ['pagination']),
    pageCount() {
      if (this.pagination.table) {
        return parseInt(this.pagination.table.total / 10, 10)
                + (this.pagination.table.total % 10 > 0);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('products', ['remove']),
    removeProduct(id) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Do you really want to remove a product?')) {
        this.remove(id);
      }
    },
  },
};
</script>
