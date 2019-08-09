<template lang="pug">
  v-app
    v-app-bar.elevation-0.border(app clipped-left)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
        v-btn(icon @click.stop="drawer = !drawer")
          v-icon menu
      v-toolbar-title.text-capitalize {{ $t($route.name) }}
      v-spacer
      v-btn.text-lowercase(
        depressed rounded
        color="primary"
        @click="logout()"
      ) {{ user.email }}
        v-icon(right) power_settings_new
    v-navigation-drawer(v-model="drawer" app clipped)
      v-list.py-0
        v-list-item(v-for="(item,index) in items" :key="index" :to="item.to")
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-title {{ item.text }}
    v-content
      v-container(fluid)
        router-view
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      drawer: true,
      items: [
        {
          to: { name: 'statistics' },
          icon: 'data_usage',
          text: this.$t('statistics'),
        },
        {
          to: { name: 'categories' },
          icon: 'inbox',
          text: this.$t('categories'),
        },
        {
          to: { name: 'brands' },
          icon: 'favorite',
          text: this.$t('brands'),
        },
        {
          to: { name: 'products' },
          icon: 'local_offer',
          text: this.$t('products'),
        },
        {
          to: { name: 'customers' },
          icon: 'people',
          text: this.$t('customers'),
        },
        {
          to: { name: 'orders' },
          icon: 'markunread_mailbox',
          text: this.$t('orders'),
        },
        {
          to: { name: 'feedbacks' },
          icon: 'message',
          text: this.$t('feedbacks'),
        },
        {
          to: { name: 'prices' },
          icon: 'account_balance_wallet',
          text: this.$t('prices'),
        },
        {
          to: { name: 'settings' },
          icon: 'settings',
          text: this.$t('settings'),
        },
      ],
    };
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$router.push({ name: 'login' }));
    },
  },
};
</script>
