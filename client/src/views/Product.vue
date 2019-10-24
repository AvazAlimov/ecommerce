<template lang="pug">
  section.hero.is-fullheight
    .hero-head
      .container(style="padding-top: 1.5em; padding-bottom: 1.5em;")
        .columns(v-if="product")
          .column.is-one-third
            figure.image
              img.product-image(
                v-if="product.photos.length"
                :src="product.photos[0].path + product.photos[0].filename"
              )
              img.product-image(v-else :src="require('@/assets/empty.jpg')")
          .column.is-two-third
            nav.breadcrumb.has-arrow-separator(aria-label="breadcrumbs" v-if="categories.length")
              ul
                li(v-for="(category, index) in categories" :key="index")
                  a.has-text-grey-dark {{ category.names[$i18n.locale] }}
            .title.is-4 {{ product.names[$i18n.locale] }}
            p(v-html="product.contents[$i18n.locale]")
            br
            .is-size-5(v-if="product.prices.length")
              .has-text-grey-dark
                strong {{ product.prices[0].value | numeralFormat }}
                |  {{ $t('sum') }}
            .is-size-6(v-else) {{ $t('price_not_available') }}
            br
            .buttons.has-addons(v-if="isIncluded")
              button.button.is-primary(@click="decrement(index)") -1
              span.button(disabled) {{ quantity }} {{ $t('pcs') }}
              button.button.is-primary(@click="increment(index)") +1
            .buttons(v-else)
              button.button(
                v-if="product.prices.length"
                @click="add(product)") {{ $t('add_to_basket') }}
            button.button.is-warning(@click="save" v-if="isSaved")
              span {{ $t('favourite') }}
              span.icon.is-small
                i.far.fa-heart
            button.button.is-primary.is-outlined(@click="save" v-else)
              span {{ $t('favourite') }}
              span.icon.is-small
                i.far.fa-heart
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'Product',
  data: () => ({
    product: null,
    categories: [],
  }),
  computed: {
    ...mapState('basket', ['items']),
    ...mapState('saved', ['savedItems']),
    isIncluded() {
      return this.items.find(element => this.product.id === element.id);
    },
    quantity() {
      return this.isIncluded.quantity;
    },
    index() {
      return this.items.indexOf(this.isIncluded);
    },
    isSaved() {
      return this.savedItems.find(id => this.product.id === id);
    },
  },
  methods: {
    ...mapActions('products', ['get']),
    ...mapActions('categories', { getCategory: 'get' }),
    ...mapMutations('basket', ['add', 'increment', 'decrement', 'remove']),
    ...mapMutations('saved', ['addToSaved', 'removeFromSaved']),
    save() {
      if (this.isSaved) {
        this.removeFromSaved(this.savedItems.indexOf(this.isSaved));
      } else {
        this.addToSaved(this.product.id);
      }
      window.focus();
    },
  },
  created() {
    const loadParentCategory = async (category) => {
      if (category.parentId) {
        const parent = await this.getCategory(category.parentId);
        this.categories.unshift(parent);
        loadParentCategory(parent);
      }
    };

    this
      .get(this.$route.params.id)
      .then(async (product) => {
        this.product = product;
        if (product.categoryId) {
          this.categories.unshift(product.category);
          loadParentCategory(product.category);
        }
      });
  },
};
</script>
<style lang="stylus">
.product-image
  background-color white
  min-width 100%
  object-fit scale-down
</style>
