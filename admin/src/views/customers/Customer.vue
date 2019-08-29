<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      .border.pa-4.radius
        .title.mb-4 {{ $t($route.name) }}

        v-text-field.mt-4(
          v-model="payload.email"
          label="Электронная почта клиента"
          outlined
          name="email"
          v-validate="'required|email'")
        v-text-field(
          v-model="payload.password"
          label="Пароль клиента"
          outlined
          name="password"
          v-validate="'required'")
        .caption.error--text.mb-4 {{ error }}
        v-btn(
          outlined block color="#707070"
          :loading="loading"
          :disabled="errors.items.length > 0"
          @click="submit()") Завершить
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Customer',
  data: () => ({
    payload: {
      email: '',
      password: '',
      role: 1,
    },
    loading: null,
    error: null,
  }),
  methods: {
    ...mapActions('users', ['create', 'update', 'get']),
    async submit() {
      this.loading = true;
      this.error = null;

      this.getOnSubmitAction()
        .then(() => {
          this.$router.push({ name: 'customers' });
        })
        .catch((error) => { this.error = error; })
        .finally(() => { this.loading = false; });
    },
    getOnSubmitAction() {
      return this.$route.params.id
        ? this.update([this.$route.params.id, this.payload])
        : this.create([this.payload]);
    },
  },
  created() {
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then(async (product) => {
          this.payload.email = product.email;
          this.payload.role = product.role;
          await new Promise(resolve => setTimeout(resolve, 50));
          this.$validator.validate();
        })
        .catch(() => this.$router.go(-1));
    }
  },
  mounted() {
    this.$validator.validate();
  },
};
</script>
