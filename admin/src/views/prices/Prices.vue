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
            :expanded.sync="expanded"
            hide-default-footer)
            template(v-slot:item="{ item }")
              tr
                td
                  v-btn(icon small @click="toggleItem(item)")
                    v-icon {{ expanded.includes(item) ? 'expand_less' : 'expand_more' }}
                td {{ item.name }}
                td.text-center {{ item.category ? item.category.name : '-' }}
                td.text-center {{ item.brand ? item.brand.name : '-' }}
                td.title
                  .text-end(v-if="item.prices.length") {{ item.prices[0].value }} сум
                  .text-end(v-else) -
                td
                  .text-end(v-if="item.prices.length")
                    | {{ item.prices[0].createdAt | moment('YYYY-MM-DD HH:mm') }}
                  .text-end(v-else) -
                td.text-center
                  v-btn(small icon)
                    v-icon(small) update
            template(v-slot:expanded-item="{ headers, item }")
              tr.text-end(v-for="price in item.prices" :key="price.id")
                td(:colspan="headers.length - 2") {{ price.value }} сум
                td {{ price.createdAt | moment('YYYY-MM-DD HH:mm') }}
                td
            template(v-slot:footer)
              v-divider
              v-pagination(
                v-model="page"
                :length="$getPageCount(pagination)"
                prev-icon="chevron_left"
                next-icon="chevron_right"
              )
              v-divider
              .text-end.pa-2
                v-btn.mr-2(outlined color="#707070") Импортировать цены
                v-btn(outlined color="#707070") Опубликовать цены
</template>

<script>
export default {
  name: 'Prices',
  data: () => ({
    expanded: [],
    page: 1,
    headers: [
      { sortable: false },
      { text: 'Наименование', value: 'name' },
      { text: 'Категория', value: 'category.name', align: 'center' },
      { text: 'Бренд', value: 'brand.name', align: 'center' },
      { text: 'Цена', align: 'end', sortable: false },
      { text: 'Дата', align: 'end', sortable: false },
      { sortable: false },
    ],
  }),
  methods: {
    toggleItem(item) {
      const index = this.expanded.indexOf(item);
      if (index > -1) {
        this.expanded.splice(index, 1);
      } else {
        this.expanded.push(item);
      }
    },
  },
};
</script>
