<template lang="pug">
  .border.pa-4.radius
    .title(v-if="!$route.params.id") {{ $t('categories.add') }}
    .title(v-if="$route.params.id") {{ $t('categories.edit') }}
    .mb-4
    v-text-field(
      v-model="payload.name"
      label="Уникальное название продукта"
      outlined
      name="name"
      v-validate="'required'")

    v-select(
      v-model="payload.parentId"
      :items="categories"
      item-text="name"
      item-value="id"
      label="Выберите родительскую категорию"
      outlined
      clearable
      clear-icon="close")

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
  name: 'Category',
  data() {
    return {
      payload: {
        name: '',
        parentId: this.$route.query.parentId || null,
        names: {},
        active: true,
      },
      loading: null,
      error: null,
    };
  },
  computed: {
    ...mapState('categories', { findCategoriesLoading: 'isFindPending' }),
    ...mapGetters('categories', { findCategoriesInStore: 'find' }),
    ...mapState('languages', { findLanguagesLoading: 'isFindPending' }),
    ...mapGetters('languages', { findLanguagesInStore: 'find' }),
    query() { return this.$route.params.id ? { id: { $ne: this.$route.params.id } } : {}; },
    categories() { return this.findCategoriesInStore({ query: this.query }).data; },
    languages() { return this.findLanguagesInStore().data; },
  },
  methods: {
    ...mapActions('categories', { findCategories: 'find' }),
    ...mapActions('languages', { findLanguages: 'find' }),
    ...mapActions('categories', ['create', 'update', 'get']),
    submit() {
      this.loading = true;
      this.error = null;
      this.getOnSubmitAction()
        .then(() => {
          this.$router.push({ name: 'categories' });
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
    this.findCategories({ query: this.query });
    this.findLanguages();
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then(async (category) => {
          this.payload = category;
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
