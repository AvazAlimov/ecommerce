<template lang="pug">
  .card.item
    figure.image(v-if="item.photos.length")
      img.item-image(:src="item.photos[0].path + item.photos[0].thumbnail")
    br
    .is-size-6.has-text-dark.name {{ item.names['ru'] }}
    br
    .is-size-6(v-if="item.prices.length")
      .has-text-grey-dark
        strong {{ item.prices[0].value }}
        |  сум
    .is-size-6(v-else) -
    br
    button.button.is-fullwidth Add to card
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
