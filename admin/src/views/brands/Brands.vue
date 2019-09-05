<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      feathers-vuex-find(
        service="brands"
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
                td.text-center.pa-2
                  v-avatar(color="white")
                    v-img(v-if="item.logo" :src="item.logo.path + item.logo.thumbnail")
                    v-icon(v-else) photo
                td {{ item.name }}
                td.text-center
                  v-icon(v-if="item.active" small) check
                  v-icon(v-else small) remove
                td.text-center {{ item.productIds.length }}
                td.text-center {{ item.createdAt | moment('YYYY-MM-DD HH:mm') }}
                td.text-center {{ item.updatedAt | moment('YYYY-MM-DD HH:mm') }}
                td.text-end
                  v-btn(icon small :to="{ name: 'brands.edit', params: { id: item.id } }")
                    v-icon(small) edit
                  v-btn(icon small color="red" @click="removeBrand(item.id)")
                    v-icon(small) delete
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
                v-btn(outlined color="#707070" :to="{ name: 'brands.add' }") Добавить бренд
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Brands',
  data: () => ({
    headers: [
      { text: 'Логотип', sortable: false, align: 'center' },
      { text: 'Наименование', value: 'name' },
      { text: 'Активный', value: 'active', align: 'center' },
      { text: 'Количество продуктов', value: 'products.length', align: 'center' },
      { text: 'Дата создания', value: 'createdAt', align: 'center' },
      { text: 'Дата изменение', value: 'updatedAt', align: 'center' },
      { sortable: false },
    ],
    page: 1,
  }),
  methods: {
    ...mapActions('brands', ['remove']),
    removeBrand(id) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Do you really want to remove a brand?')) {
        this.remove(id);
      }
    },
  },
};
</script>
