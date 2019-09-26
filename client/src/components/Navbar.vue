<template lang="pug">
    nav.navbar.is-spaced(role="navigation" aria-label="main navigation")
            .navbar-brand
                a.navbar-item(href="/")
                    img(src="https://bulma.io/images/bulma-logo.png" width="112" height="28")
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
                    a.navbar-item Categories
                    a.navbar-item Brands
                    .navbar-item
                        .buttons
                            a.button.is-primary
                                strong Basket
                                span.icon
                                    i.fas.fa-shopping-basket
                .navbar-end
                    //- .navbar-item
                    //-     .control.is-loading
                    //-         input.input.is-rounded(type="text" placeholder="Rounded input")
                    .navbar-item(v-if="!user")
                        .buttons
                            a.button.is-primary
                                strong Sign up
                            a.button.is-light Log in
                    .navbar-item.has-dropdown.is-hoverable(v-else)
                        a.navbar-link {{ user.email }}
                        .navbar-dropdown.is-right
                            a.navbar-item Profile
                            a.navbar-item Favourites
                            a.navbar-item Orders
                            hr.navbar-divider
                            a.navbar-item Sign out
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
  created() {
    this.$store.dispatch('auth/authenticate');
  },
};
</script>
