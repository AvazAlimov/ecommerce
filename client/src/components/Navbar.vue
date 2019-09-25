<template lang="pug">
    nav.navbar(role="navigation" aria-label="main navigation")
            .navbar-brand

                a.navbar-item(href="https://bulma.io")
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
                .navbar-end
                    a.navbar-item Categories
                    a.navbar-item Brands
                    a.navbar-item Favourites
                    a.navbar-item Orders
                    a.navbar-item Account
                    .navbar-item
                        .buttons
                            a.button.is-primary
                                strong Basket
                                span.icon
                                    i.fas.fa-shopping-basket
                    .navbar-item
                        .buttons
                            a.button.is-primary
                                strong Sign up
                            a.button.is-light Log in
</template>
<script>
export default {
  name: 'Navbar',
  data: () => ({
    showNav: false,
  }),
};
</script>
