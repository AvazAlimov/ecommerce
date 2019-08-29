<template lang="pug">
  v-app(dark)
    v-content
      v-container(fill-height fluid)
        v-layout(align-center justify-center)
          v-flex(xs10 sm6 md4 lg3)
            v-form
              .headline.mb-5.text-center Авторизация

              v-text-field(
                v-model="payload.email"
                label="Имя пользователя"
                outlined
                name="email"
                v-validate="'required'"
                autocomplete="username")

              v-text-field(
                v-model="payload.password"
                label="Пароль"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                outlined
                name="password"
                v-validate="'required'"
                autocomplete="current-password")

              v-btn(
                block outlined large
                :disabled="errors.items.length > 0"
                :loading="loading"
                @click="signin()"
              ) Войти в систему
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    loading: false,
    show: false,
    payload: {
      strategy: 'local',
      email: '',
      password: '',
    },
    error: null,
  }),
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    signin() {
      this.error = null;
      this.loading = true;

      this.$store.dispatch('auth/authenticate', this.payload)
        .then(() => {
          if (this.user.role === 0) {
            this.$router.push({ name: 'home' });
          } else {
            this.$store.dispatch('auth/logout');
          }
        })
        .catch((error) => {
          this.error = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
