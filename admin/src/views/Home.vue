<template lang="pug">
  v-app
    v-app-bar.elevation-0.border(app clipped-left)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
        v-btn(icon @click.stop="drawer = !drawer")
          v-icon menu
      v-toolbar-title {{ $route.name }}
      v-spacer
      v-menu(open-on-hover bottom offset-y)
        template(v-slot:activator="{ on }")
          v-btn.text-lowercase(depressed rounded color="primary" v-on="on") {{ user.email }}
        v-list.py-0
          v-list-item(@click="logout()")
            v-list-item-title Logout
    v-navigation-drawer(v-model="drawer" app clipped)
      v-list.py-0
        v-list-item(v-for="(item,index) in items" :key="index" :to="item.to")
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-title {{ item.text }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    drawer: true,
    items: [
      {
        to: { name: 'home' },
        icon: 'data_usage',
        text: 'Statistics',
      },
      {
        icon: 'inbox',
        text: 'Categories',
      },
      {
        icon: 'favorite',
        text: 'Brands',
      },
      {
        icon: 'local_offer',
        text: 'Products',
      },
      {
        icon: 'people',
        text: 'Customers',
      },
      {
        icon: 'markunread_mailbox',
        text: 'Orders',
      },
      {
        icon: 'message',
        text: 'Feedbacks',
      },
      {
        icon: 'account_balance_wallet',
        text: 'Prices',
      },
      {
        icon: 'settings',
        text: 'Settings',
      },
    ],
  }),
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'login' });
        });
    },
  },
};
</script>
