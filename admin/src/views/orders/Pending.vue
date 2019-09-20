<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      feathers-vuex-find(
        service="orders"
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
                td {{ item.id }}
                td {{ item.client.email }}
                td.text-center {{ item.price | numeralFormat }} сум
                td.text-center {{ item.createdAt | moment('YYYY-MM-DD HH:mm') }}
                td.text-center {{ item.updatedAt | moment('YYYY-MM-DD HH:mm') }}
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
      { text: 'Номер заказа', value: 'id' },
      { text: 'Клиент', value: 'client.name' },
      { text: 'Цена', value: 'price', align: 'center' },
      { text: 'Дата создания', value: 'createdAt', align: 'center' },
      { text: 'Дата изменение', value: 'updatedAt', align: 'center' },
    ],
  }),
};
</script>
