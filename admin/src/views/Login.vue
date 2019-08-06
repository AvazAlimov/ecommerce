<template lang="pug">
  v-app(dark)
    v-content
      v-container(fill-height fluid)
        v-layout(align-center justify-center)
          v-flex(xs10 sm6 md4 lg3)
            v-form
              .headline.mb-5.text-center Авторизация

              v-text-field(
                v-model="payload.username"
                label="Имя пользователя"
                outlined
                name="username"
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

              v-btn(block outlined large :disabled="errors.items.length > 0") Войти в систему
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    show: false,
    payload: {
      username: '',
      password: '',
    },
  }),
};
</script>
