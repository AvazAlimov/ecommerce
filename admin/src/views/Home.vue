<template lang="pug">
  v-app
    v-app-bar.elevation-0.border(app clipped-left)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
        v-btn(icon @click.stop="drawer = !drawer")
          v-icon menu
      v-toolbar-title.text-capitalize {{ $route.name }}
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
  data: () => ({
    drawer: true,
    items: [
      {
        to: { name: 'home' },
        icon: 'data_usage',
        text: 'Статистика',
      },
      {
        to: { name: 'categories' },
        icon: 'inbox',
        text: 'Категории',
      },
      {
        to: { name: 'brands' },
        icon: 'favorite',
        text: 'Бренды',
      },
      {
        to: { name: 'products' },
        icon: 'local_offer',
        text: 'Товары',
      },
      {
        to: { name: 'customers' },
        icon: 'people',
        text: 'Клиенты',
      },
      {
        to: { name: 'orders' },
        icon: 'markunread_mailbox',
        text: 'Заказы',
      },
      {
        to: { name: 'feedbacks' },
        icon: 'message',
        text: 'Отзыв',
      },
      {
        to: { name: 'prices' },
        icon: 'account_balance_wallet',
        text: 'Цены',
      },
      {
        to: { name: 'settings' },
        icon: 'settings',
        text: 'Настройки',
      },
    ],
  }),
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
