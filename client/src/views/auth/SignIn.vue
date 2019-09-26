<template lang="pug">
  section.hero.is-medium
    .hero-body
      .container
        .columns
          .column.is-one-third.is-offset-one-third
            .card
              .card-content
                .title.is-4 {{ $t('sign_in') }}

                .field
                  label.label {{ $t('email') }}
                  .control
                    input.input(
                      v-model="payload.email"
                      type="email"
                      :placeholder="$t('email')"
                      name="email"
                      v-validate="'required|email'"
                    )

                .field
                  label.label {{ $t('password') }}
                  .control
                    input.input(
                      v-model="payload.password"
                      :type="show ? 'text': 'password'"
                      :placeholder="$t('password')"
                      name="password"
                      v-validate="'required'"
                    )

                label.checkbox.noselect
                  input(type="checkbox" v-model="show")
                  |  {{ $t('show_password') }}

                br
                br

                article.message.is-danger(v-if="error")
                  .message-body {{ $t(`error_code_${error.code}`) }}

                .field
                  .control
                    button.button.is-primary.is-fullwidth(
                      :class="{'is-loading': loading}"
                      :disabled="errors.any()"
                      @click="signin()"
                    ) {{ $t('sign_in') }}
                br
                .has-text-centered
                  p.is-4 {{ $t('no_account') }}
                    router-link.is-link(:to="{ name: 'signup' }")  {{ $t('create_account') }}
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
        .dispatch('auth/authenticate', this.payload)
        .then(() => this.$router.push({ name: 'home' }))
        .catch((error) => { this.error = error; })
        .finally(() => { this.loading = false; });
    },
  },
  mounted() {
    this.$validator.validate();
  },
};
</script>
