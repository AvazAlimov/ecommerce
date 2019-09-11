<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      create-price(ref="createPrice")
      feathers-vuex-find(
        service="products"
        :query="{ $skip: (page - 1) * 10 }"
        watch="query.$skip")
        template(slot-scope="{ items, isFindPending, pagination }")
          v-data-table.border.radius(
            v-if="pagination"
            :headers="headers"
            :loading="isFindPending"
            :items="items"
            :page.sync="page"
            :items-per-page="pagination.limit"
            :expanded.sync="expanded"
            hide-default-footer)
            template(v-slot:item="{ item }")
              tr
                td
                  v-btn(v-if="item.prices.length" icon small @click="toggleItem(item)")
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
                  v-btn(small icon @click="$refs.createPrice.setProduct(item)")
                    v-icon(small) update
            template(v-slot:expanded-item="{ headers, item }")
              tr
                td(:colspan="headers.length").primary.lighten-2
                    v-sparkline(
                      auto-v-navigation-drawer
                      :gradient="['#ffffff']"
                      :line-width="1"
                      :label-size="4"
                      color="rgba(255, 255, 255, .9)"
                      :labels="['0 сум'].concat(item.prices.map(price\
                        => `${price.value} сум`).reverse())"
                      :value="[0].concat(item.prices.map(price=>price.value).reverse())")
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
                v-btn.mr-2(outlined color="#707070" @click="download()") Импортировать цены
                v-btn(outlined color="#707070" @click="$refs.fileInput.click()") Опубликовать цены
                input(
                  ref="fileInput" type="file" name="name"
                  accept=".xlsx" style="display: none;"
                  @change="upload"
                )
</template>

<script>
// eslint-disable-next-line import/no-unresolved, import/extensions
import CreatePrice from '@/components/prices/CreatePrice.vue';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Excel from '@/services/excel.js';
// import { mapActions } from 'vuex';

export default {
  name: 'Prices',
  components: { CreatePrice },
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
    // ...mapActions('prices', ['remove']),
    // removePrice(id) {
    //   // eslint-disable-next-line no-alert, no-restricted-globals
    //   if (confirm('Do you really want to remove a price?')) {
    //     this.remove(id);
    //     this.$store.dispatch('products/find');
    //   }
    // },
    toggleItem(item) {
      const index = this.expanded.indexOf(item);
      if (index > -1) {
        this.expanded.splice(index, 1);
      } else {
        this.expanded.push(item);
      }
    },
    async download() {
      const products = [];
      const loop = skip => this.$store.dispatch('products/find', {
        query: {
          $limit: 50,
          $skip: skip,
        },
      })
        .then((result) => {
          result.data.forEach(element => products.push(element));
          if (result.total > result.skip + result.limit) {
            loop(skip + 50);
          } else {
            Excel.priceToExcel(products, 'prices');
          }
        });
      loop(0);
    },
    upload() {
      const file = this.$refs.fileInput.files[0];
      if (file) {
        Excel.excelToPrice(file).then((prices) => {
          Promise.all(prices.map(price => this.$store.dispatch('prices/create', price)))
            .then(() => this.$store.dispatch('products/find'))
            .catch(console.error);
        });
      }
    },
  },
};
</script>
