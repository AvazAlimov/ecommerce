<template lang="pug">
  v-card.border.elevation-0
    v-card-title.pa-2
      v-spacer
      v-btn(icon small)
        v-icon more_horiz
    v-card-text
      v-layout.mb-4.text-center(row wrap)
        v-flex.mb-4(xs12)
          .display-1.black--text {{ title.value }}
          .subheading {{ title.name }}
        v-flex(xs6)
          .subheading {{ positive.name }}
          .headline.black--text {{ positive.value }}
        v-flex(xs6)
          .subheading {{ negative.name }}
          .headline.black--text {{ negative.value }}
</template>

<script>
export default {
  name: 'StatisticsCard',
  props: {
    title: {
      type: Object,
      default: () => ({
        name: 'Title',
        value: '100%',
      }),
    },
    positive: {
      type: Object,
      default: () => ({
        name: 'Positive',
        value: '60%',
      }),
    },
    negative: {
      type: Object,
      default: () => ({
        name: 'Negative',
        value: '40%',
      }),
    },
  },
};
</script>

<style>

</style>
