<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      feathers-vuex-find(
        service="users"
        :query="{ $skip: (page - 1) * 10, role: 1 }"
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
                td {{ item.email }}
                td.text-center {{ item.createdAt | moment('YYYY-MM-DD HH:mm') }}
                td.text-center {{ item.updatedAt | moment('YYYY-MM-DD HH:mm') }}
                td.text-end
                  v-btn(icon small :to="{ name: 'customers.edit', params: { id: item.id } }")
                    v-icon(small) edit
                  v-btn(icon small color="red" @click="removeUser(item.id)")
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
                v-btn(outlined color="#707070" :to="{ name: 'customers.add' }") Добавить клиента
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Customers',
  data: () => ({
    page: 1,
    headers: [
      { text: 'Эл. адрес', value: 'email' },
      { text: 'Дата создания', value: 'createdAt', align: 'center' },
      { text: 'Дата изменение', value: 'updatedAt', align: 'center' },
      { sortable: false },
    ],
  }),
  methods: {
    ...mapActions('users', ['remove']),
    removeUser(id) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Do you really want to remove a user?')) {
        this.remove(id);
      }
    },
  },
};
</script>
