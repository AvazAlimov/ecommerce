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
        color="primary" v-on="on"
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
      v-container(fluid fill-height)
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
        icon: 'inbox',
        text: 'Категории',
      },
      {
        icon: 'favorite',
        text: 'Бренды',
      },
      {
        icon: 'local_offer',
        text: 'Товары',
      },
      {
        icon: 'people',
        text: 'Клиенты',
      },
      {
        icon: 'markunread_mailbox',
        text: 'Заказы',
      },
      {
        icon: 'message',
        text: 'Отзыв',
      },
      {
        icon: 'account_balance_wallet',
        text: 'Цены',
      },
      {
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
