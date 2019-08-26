<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      .border.pa-4.radius
        .title.mb-4 {{ $t($route.name) }}

        v-layout(row wrap)
            v-flex(xs4 v-for="(file,index) in files" :key="index")
              v-img.border(:src="file.src" cover height="300")
                v-layout(row)
                  v-spacer
                  v-btn.ma-2(icon small color="red" @click="removeFile(index)")
                    v-icon close
        v-btn(outlined color="#707070"
          @click="$refs.fileInput.click()")
          v-icon image
          | Привязать Фотографии

        input(ref="fileInput" type="file" name="name"
            accept=".jpg, .png, .jpeg" multiple style="display: none;")

        v-text-field.mt-4(
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
// eslint-disable-next-line import/no-unresolved, import/extensions
import upload from '@/services/uploads';

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
      photoIds: [],
    },
    loading: null,
    error: null,
    files: [],
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
    ...mapActions('products', ['create', 'update', 'patch', 'get']),
    ...mapActions('uploads', ['remove']),
    async submit() {
      this.loading = true;
      this.error = null;

      await this.uploadFile();

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
    async removeFile(index) {
      const file = this.files[index];
      if (file.id) {
        this.payload.photoIds.splice(index, 1);
        await this.remove(file.id);
        await this.patch([this.$route.params.id, { photoIds: this.payload.photoIds }]);
      }
      this.files.splice(index, 1);
    },
    async uploadFile() {
      const tasks = [];
      this.files.forEach((file) => {
        if (!file.id) {
          const data = new FormData();
          data.append('file', file.file);
          tasks.push(upload(data));
        }
      });
      const results = await Promise.all(tasks);
      results.forEach((element) => {
        this.payload.photoIds.push(element.id);
      });
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
          this.files = product.photos.map(file => ({
            id: file.id,
            src: file.path + file.filename,
          }));
          await new Promise(resolve => setTimeout(resolve, 50));
          this.$validator.validate();
        })
        .catch(() => this.$router.go(-1));
    }
  },
  mounted() {
    this.$refs.fileInput.onchange = () => {
      const files = Array.from(this.$refs.fileInput.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.files.push({
            src: e.target.result,
            file,
          });
        };
        reader.readAsDataURL(file);
      });
    };
    this.$validator.validate();
  },
};
</script>
