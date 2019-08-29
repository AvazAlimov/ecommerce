<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      v-data-table.border.radius(
        :headers="headers"
        :items="customers"
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
          .text-end.pa-2
            v-btn(outlined color="#707070" :to="{ name: 'customers.add' }") Добавить клиента
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Customers',
  data: () => ({
    headers: [
      { text: 'Эл. адрес', value: 'email' },
      { text: 'Дата создания', value: 'createdAt', align: 'center' },
      { text: 'Дата изменение', value: 'updatedAt', align: 'center' },
      { sortable: false },
    ],
  }),
  computed: {
    ...mapState('users', { findUsersLoading: 'isFindPending' }),
    ...mapGetters('users', { findUsersInStore: 'find' }),
    query: () => ({ query: { role: 1 } }),
    customers() { return this.findUsersInStore(this.query).data; },
  },
  methods: {
    ...mapActions('users', ['remove']),
    ...mapActions('users', { findUsers: 'find' }),
    removeUser(id) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Do you really want to remove a user?')) {
        this.remove(id);
      }
    },
  },
  created() {
    this.findUsers(this.query);
  },
};
</script>
