<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      feathers-vuex-find(
        service="products"
        :query="{ $skip: (page - 1) * 10 }"
        watch="query.$skip")
        template(slot-scope="{ items, isFindPending, pagination }")
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
              v-pagination(
                v-model="page"
                :length="$getPageCount(pagination)"
                prev-icon="chevron_left"
                next-icon="chevron_right"
              )
</template>
<script>
export default {
  name: 'Pending',
  data: () => ({
    page: 1,
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
};
</script>
