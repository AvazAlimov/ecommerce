<template lang="pug">
  .card.item
    figure.image(v-if="item.photos.length")
      img.item-image(:src="item.photos[0].path + item.photos[0].thumbnail")
    figure.image(v-else)
      img.item-image(:src="require('@/assets/empty.jpg')")
    br
    .is-size-6.has-text-dark.name {{ item.names[$i18n.locale] }}
    br
    .is-size-6(v-if="item.prices.length")
      .has-text-grey-dark
        strong {{ item.prices[0].value | numeralFormat }}
        |  {{ $t('sum') }}
    .is-size-6(v-else) {{ $t('price_not_available') }}
    br
    .buttons.has-addons.is-centered(v-if="isIncluded")
      button.button.is-primary(@click="decrement(index)") -1
      span.button(disabled) {{ quantity }} {{ $t('pcs') }}
      button.button.is-primary(@click="increment(index)") +1
    button.button.is-fullwidth(v-else @click="add(item)") {{ $t('add_to_basket') }}
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('basket', ['items']),
    isIncluded() {
      return this.items.find(element => this.item.id === element.id);
    },
    quantity() {
      return this.isIncluded.quantity;
    },
    index() {
      return this.items.indexOf(this.isIncluded);
    },
  },
  methods: {
    ...mapMutations('basket', ['add', 'increment', 'decrement', 'remove']),
  },
};
</script>

<style lang="stylus">
.item
  padding 1em
.item-image
  min-height 192px
  max-height 192px
  object-fit scale-down
.name
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
</style>
