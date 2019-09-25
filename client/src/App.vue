<template lang="pug">
    #app
      ec-navbar
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
