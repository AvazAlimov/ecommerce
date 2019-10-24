<template lang="pug">
  section.hero.is-fullheight
    .hero-head
      .container(style="padding-top: 1.5em; padding-bottom: 1.5em;")
        .columns
          .column
            .title.is-4 {{ $t('basket') }}
            table.table.is-fullwidth.is-bordered
              thead
                tr
                  th Product name
                  th Price/peace
                  th Quantity
                  th Total Price
              tbody
                tr(v-for="(item, index) in items")
                  td(style="vertical-align: middle;")
                    router-link.is-link(
                      :to="{ name: 'product', params: { id: item.id }}"
                    ) {{ item.names[$i18n.locale] }}
                  td(style="vertical-align: middle;")
                    | {{ getPrice(item) | numeralFormat }} {{ $t('sum') }}
                  td(style="vertical-align: middle;")
                    .buttons.has-addons.is-centered
                      button.button.is-danger(@click="remove(index)")
                        span.icon.is-small
                          i.fas.fa-trash
                      button.button.is-primary(@click="decrement(index)") -1
                      span.button(disabled style="min-width: 100px")
                        | {{ item.quantity }} {{ $t('pcs') }}
                      button.button.is-primary(@click="increment(index)") +1
                  td(style="vertical-align: middle;")
                    | {{ item.quantity * getPrice(item) | numeralFormat }} {{ $t('sum') }}
              tfoot
                tr.title.is-5
                  td Total
                  td
                  td
                  td {{ totalPrice | numeralFormat }} {{ $t('sum') }}
            div(v-if="user")
              p {{ $t('checkout_description') }}
              br
              button.button.is-primary(@click="checkout") {{ $t('checkout') }}
            div(v-else)
              p {{ $t('need_signed') }}
              br
              button.button.is-primary(@click="signin") {{ $t('sign_in') }}

</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Basket',
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('basket', ['items']),
    totalPrice() {
      let price = 0;
      this.items.forEach((item) => {
        price += item.quantity * this.getPrice(item);
      });
      return price;
    },
  },
  methods: {
    ...mapMutations('basket', ['increment', 'decrement', 'remove']),
    getPrice(item) {
      if (item.prices.length) {
        return item.prices[0].value;
      }
      return 0;
    },
    signin() {
      this.$router.push({ name: 'signin' });
    },
    checkout() {

    },
  },
};
</script>
