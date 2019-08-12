<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      .border.pa-4.radius
        .title.mb-4 {{ $t($route.name) }}
        v-text-field(
          v-model="payload.name"
          label="Уникальное название бренда"
          outlined
          name="name"
          v-validate="'required'")

        template(v-for="(language, index) in languages")
          v-text-field(
            :key="index"
            v-model="payload.names[language.code]"
            :label="`Название категории (${language.code})`"
            outlined
            :name="`name[${language.code}]`"
            v-validate="'required'")

        v-checkbox(
          v-model="payload.active"
          label="Активная категория"
          on-icon="check_box"
          off-icon="check_box_outline_blank")

        .caption.error--text.mb-4 {{ error }}
        v-btn(
          outlined block color="#707070"
          :loading="loading"
          :disabled="errors.items.length > 0"
          @click="submit()") Завершить
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Brand',
  data: () => ({
    payload: {
      name: '',
      names: {},
      active: true,
    },
    loading: null,
    error: null,
  }),
  computed: {
    ...mapState('languages', { findLanguagesLoading: 'isFindPending' }),
    ...mapGetters('languages', { findLanguagesInStore: 'find' }),
    languages() { return this.findLanguagesInStore().data; },
  },
  methods: {
    ...mapActions('languages', { findLanguages: 'find' }),
    ...mapActions('brands', ['create', 'update', 'get']),
    submit() {
      this.loading = true;
      this.error = null;
      this.getOnSubmitAction()
        .then(() => {
          this.$router.push({ name: 'brands' });
        })
        .catch((error) => { this.error = error; })
        .finally(() => { this.loading = false; });
    },
    getOnSubmitAction() {
      return this.$route.params.id
        ? this.update([this.$route.params.id, this.payload])
        : this.create([this.payload]);
    },
  },
  created() {
    this.findLanguages();
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then(async (brand) => {
          this.payload = brand;
          await new Promise(resolve => setTimeout(resolve, 50));
          this.$validator.validate();
        })
        .catch(() => this.$router.go(-1));
    }
  },
  mounted() {
    this.$validator.validate();
  },
};
</script>
