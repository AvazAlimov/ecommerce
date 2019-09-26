<template lang="pug">
    #signin.container
        .columns
            .column.is-half.is-offset-one-quarter
                .field
                    label.label Email
                    .control
                        input.input(type="email" v-model="payload.email" placeholder="Email")
                .field
                    label.label Password
                    .control
                        input.input(
                            v-model="payload.password"
                            type="password"
                            placeholder="Password"
                        )
                .field.is-grouped
                    .control
                        button.button.is-link(@click="signin()") Sign in
                    .control
                        button.button.is-text Sign up
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'SignIn',
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
