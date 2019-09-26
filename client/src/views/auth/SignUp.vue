<template lang="pug">
  section.hero.is-medium
    .hero-body
      .container
        .columns
          .column.is-one-third.is-offset-one-third
            .card
              .card-content
                .title.is-4 {{ $t('create_account') }}
                .field
                  label.label {{ $t('email') }}
                  .control
                    input.input(
                      v-model="payload.email"
                      type="email"
                      :placeholder="$t('email')"
                    )
                .field
                  label.label {{ $t('password') }}
                  .control
                    input.input(
                        v-model="payload.password"
                        :type="show ? 'text': 'password'"
                        :placeholder="$t('password')"
                    )
                label.checkbox.noselect
                  input(type="checkbox" v-model="show")
                  |  {{ $t('show_password') }}
                br
                br
                article.message.is-danger(v-if="error")
                  .message-body {{ error }}
                  //- .message-body {{ $t(`error_code_${error.code}`) }}
                .field
                  .control
                    button.button.is-primary.is-fullwidth(
                      :class="{'is-loading': loading}"
                      @click="signin()"
                    ) {{ $t('create_account') }}
                br
                .has-text-centered
                  p.is-4 {{ $t('have_account') }}
                    router-link.is-link(:to="{ name: 'signin' }")  {{ $t('sign_in') }}

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
      this.$store
        .dispatch('users/create', this.payload)
        .then(() => {
          this.loading = true;
          this.$store
            .dispatch('auth/authenticate', this.payload)
            .then(() => this.$router.push({ name: 'home' }))
            .catch((error) => { this.error = error; })
            .finally(() => { this.loading = false; });
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    },
  },
};
</script>
