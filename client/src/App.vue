<template lang="pug">
    #app.has-background-white-ter
      ec-navbar
      .has-background-white-bis
        router-view
      ec-footer
</template>
<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    'ec-navbar': Navbar,
    'ec-footer': Footer,
  },
};
</script>
<style lang="stylus">
body
  height 100vh
#app
  height 100%
</style>
