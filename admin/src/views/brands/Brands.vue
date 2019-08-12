<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      v-data-table.border.radius(
        :headers="headers"
        :items="brands"
        hide-default-footer)
        template(v-slot:item="{ item }")
          td.text-center
            v-avatar(color="white")
              v-img(v-if="item.logo" :src="item.logo")
              v-icon(v-else) photo
          td {{ item.name }}
          td.text-center
            v-icon(v-if="item.active" small) check
            v-icon(v-else small) remove
          td.text-center {{ item.products || 0 }}
          td.text-center {{ item.createdAt | moment('YYYY-MM-DD HH:mm') }}
          td.text-center {{ item.updatedAt | moment('YYYY-MM-DD HH:mm') }}
          td.text-end
            v-btn(icon small :to="{ name: 'brands.edit', params: { id: item.id } }")
              v-icon(small) edit
            v-btn(icon small color="red" @click="removeBrand(item.id)")
              v-icon(small) delete
        template(v-slot:footer)
          v-divider
          .text-end.pa-2
            v-btn(outlined color="#707070" :to="{ name: 'brands.add' }") Добавить бренд
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

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
  }),
  computed: {
    ...mapState('brands', { findBrandsLoading: 'isFindPending' }),
    ...mapGetters('brands', { findBrandsInStore: 'find' }),
    brands() { return this.findBrandsInStore().data; },
  },
  methods: {
    ...mapActions('brands', ['remove']),
    ...mapActions('brands', { findBrands: 'find' }),
    removeBrand(id) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Do you really want to remove a brand?')) {
        this.remove(id);
      }
    },
  },
  created() {
    this.findBrands();
  },
};
</script>
