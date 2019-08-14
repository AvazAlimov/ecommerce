<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      .border.pa-4.radius
        .title.mb-4 {{ $t($route.name) }}
        v-text-field(
          v-model="payload.name"
          label="Уникальное название товара"
          outlined
          name="name"
          v-validate="'required'")

        v-select(
          v-model="payload.categoryId"
          :items="categories"
          label="Категория"
          item-text="name"
          item-value="id"
          outlined
          clearable clear-icon="close")

        v-select(
          v-model="payload.brandId"
          :items="brands"
          label="Бренд"
          item-text="name"
          item-value="id"
          outlined
          clearable clear-icon="close")

        template(v-for="(language, index) in languages")
          .mb-5(:key="index")
            v-text-field.mb-1(
              v-model="payload.names[language.code]"
              :label="`Название товара (${language.code})`"
              outlined
              hide-details
              :name="`name[${language.code}]`"
              v-validate="'required'")
            vue-editor(v-model="payload.contents[language.code]")

        v-checkbox(
          v-model="payload.active"
          label="Активный товар"
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
import { VueEditor } from 'vue2-editor';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Product',
  components: {
    VueEditor,
  },
  data: () => ({
    payload: {
      name: '',
      names: {},
      contents: {},
      categoryId: null,
      brandId: null,
      active: true,
    },
    loading: null,
    error: null,
  }),
  computed: {
    ...mapState('languages', { findLanguagesLoading: 'isFindPending' }),
    ...mapGetters('languages', { findLanguagesInStore: 'find' }),
    ...mapState('brands', { findBrandsLoading: 'isFindPending' }),
    ...mapGetters('brands', { findBrandsInStore: 'find' }),
    ...mapState('categories', { findCategoriesLoading: 'isFindPending' }),
    ...mapGetters('categories', { findCategoriesInStore: 'find' }),
    languages() { return this.findLanguagesInStore().data; },
    brands() { return this.findBrandsInStore().data; },
    categories() { return this.findCategoriesInStore().data; },
  },
  methods: {
    ...mapActions('languages', { findLanguages: 'find' }),
    ...mapActions('brands', { findBrands: 'find' }),
    ...mapActions('categories', { findCategories: 'find' }),
    ...mapActions('products', ['create', 'update', 'get']),
    submit() {
      this.loading = true;
      this.error = null;
      this.getOnSubmitAction()
        .then(() => {
          this.$router.push({ name: 'products' });
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
    this.findBrands();
    this.findCategories();
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then(async (product) => {
          this.payload = product;
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
