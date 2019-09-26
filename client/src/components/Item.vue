<template lang="pug">
  .card.item
    figure.image(v-if="item.photos.length")
      img.item-image(:src="item.photos[0].path + item.photos[0].thumbnail")
    br
    .is-size-6.has-text-dark.name {{ item.names[$i18n.locale] }}
    br
    .is-size-6(v-if="item.prices.length")
      .has-text-grey-dark
        strong {{ item.prices[0].value }}
        |  {{ $t('sum') }}
    .is-size-6(v-else) -
    br
    button.button.is-fullwidth {{ $t('add_to_basket') }}
</template>
<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
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
