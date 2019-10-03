<template lang="pug">
  section.hero.is-fullheight
    .hero-head
      .container(style="padding-top: 1.5em; padding-bottom: 1.5em;")
        .columns
          .column
            .title.is-4 {{ product.names[$i18n.locale] }}
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Product',
  data: () => ({
    product: {},
  }),
  methods: {
    ...mapActions('products', ['get']),
  },
  created() {
    this.get(this.$route.params.id)
      .then((product) => {
        this.product = product;
      });
  },
};
</script>
