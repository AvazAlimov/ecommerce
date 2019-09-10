<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      v-tabs(left).border.radius
        v-tab(:to="{ name: 'orders.pending' }") {{ $t('orders.pending') }}
        v-tab(:to="{ name: 'orders.finished' }") {{ $t('orders.finished') }}
        v-tab(:to="{ name: 'orders.new' }") {{ $t('orders.new') }}

    v-flex(xs12)
      router-view
</template>

<script>
export default {
  name: 'Orders',
};
</script>
