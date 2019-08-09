<template lang="pug">
    v-card.border.elevation-0
      v-card-title.px-4
        .title {{ title }}
      v-card-text.px-0
        v-sparkline(
          auto-v-navigation-drawer
          :gradient="['#707070']"
          :smooth="8"
          :line-width="1"
          :label-size="2"
          :labels="labels"
          :value="value")
</template>

<script>
export default {
  name: 'LineGraph',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
};
</script>
