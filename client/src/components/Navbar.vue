<template lang="pug">
    nav.navbar.is-spaced(role="navigation" aria-label="main navigation")
            .navbar-brand
                a.navbar-item(href="/")
                  //- https://bulma.io/images/bulma-logo.png
                  img(:src="require('@/assets/logo.svg')")
                a.navbar-burger.burger(
                    @click="showNav = !showNav"
                    :class="{ 'is-active' : showNav }"
                    role="button"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navMenu"
                )
                    span(aria-hidden="true")
                    span(aria-hidden="true")
                    span(aria-hidden="true")
            #navMenu.navbar-menu(:class="{ 'is-active' : showNav }")
                .navbar-start
                    a.navbar-item {{ $t('categories') }}
                    a.navbar-item {{ $t('brands') }}
                    .navbar-item
                        .buttons
                            a.button.is-primary
                                strong {{ $t('basket') }}
                                span.icon
                                    i.fas.fa-shopping-basket
                .navbar-end
                    //- .navbar-item
                    //-     .control.is-loading
                    //-         input.input.is-rounded(type="text" placeholder="Rounded input")
                    .navbar-item(v-if="!user")
                        .buttons
                            router-link.button.is-primary(
                              :to="{ name: 'signup' }"
                            ) {{ $t('sign_up') }}

                            router-link.button.is-light(
                              :to="{ name: 'signin' }"
                            ) {{ $t('sign_in') }}
                    .navbar-item.has-dropdown.is-hoverable(v-else)
                        a.navbar-link {{ user.email }}
                        .navbar-dropdown.is-right
                            a.navbar-item {{ $t('account_settings') }}
                            a.navbar-item {{ $t('favourites') }}
                            a.navbar-item {{ $t('my_orders') }}
                            hr.navbar-divider
                            a.navbar-item(@click="signout()") {{ $t('sign_out') }}
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  data: () => ({
    showNav: false,
  }),
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    signout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$router.push({ name: 'home' }));
    },
  },
  created() {
    this.$store.dispatch('auth/authenticate');
  },
};
</script>
