<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      .border.pa-4.radius
        .title.mb-4 {{ $t($route.name) }}
        v-img.border.radius(v-if="file" max-width="256" :src="file.src")
            v-layout(row)
              v-spacer
              v-btn.ma-2(icon small color="red" @click="removeFile()")
                v-icon close
        v-btn(v-else
          outlined color="#707070"
          @click="$refs.fileInput.click()")
          v-icon image
          | Привязать логотип
        input(
          ref="fileInput" type="file" name="file"
          style="display: none;" accept=".jpg, .png, .jpeg")

        v-text-field.mt-4(
          v-model="payload.name"
          label="Уникальное название бренда"
          outlined
          name="name"
          v-validate="'required'")

        template(v-for="(language, index) in languages")
          v-text-field(
            :key="index"
            v-model="payload.names[language.code]"
            :label="`Название бренда (${language.code})`"
            outlined
            :name="`name[${language.code}]`"
            v-validate="'required'")

        v-checkbox(
          v-model="payload.active"
          label="Активный бренд"
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
// eslint-disable-next-line import/no-unresolved, import/extensions
import upload from '@/services/uploads';

export default {
  name: 'Brand',
  data: () => ({
    payload: {
      name: '',
      names: {},
      active: true,
      logoId: null,
    },
    loading: null,
    file: null,
    error: null,
  }),
  computed: {
    ...mapState('languages', { findLanguagesLoading: 'isFindPending' }),
    ...mapGetters('languages', { findLanguagesInStore: 'find' }),
    languages() { return this.findLanguagesInStore().data; },
  },
  methods: {
    ...mapActions('languages', { findLanguages: 'find' }),
    ...mapActions('uploads', ['remove']),
    ...mapActions('brands', ['create', 'update', 'patch', 'get']),
    async submit() {
      // this.loading = true;
      this.error = null;

      await this.uploadFile();

      this.getOnSubmitAction()
        .then(() => this.$router.push({ name: 'brands' }))
        .catch((error) => { this.error = error; })
        .finally(() => { this.loading = false; });
    },
    async uploadFile() {
      if (this.file && !this.file.id) {
        const data = new FormData();
        data.append('file', this.file.file);
        const file = await upload(data);
        this.payload.logoId = file.id;
      } else {
        this.payload.logoId = null;
      }
    },
    async removeFile() {
      if (this.file.id) {
        await this.remove(this.file.id);
        await this.patch([this.$route.params.id, { logoId: null }]);
      }
      delete this.payload.logo;
      this.file = null;
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
          if (brand.logo) {
            this.file = {
              id: brand.logo.id,
              src: brand.logo.path + brand.logo.filename,
            };
          }
          this.payload = brand;
          await new Promise(resolve => setTimeout(resolve, 50));
          this.$validator.validate();
        })
        .catch(() => this.$router.go(-1));
    }
  },
  mounted() {
    this.$validator.validate();
    this.$refs.fileInput.onchange = () => {
      const files = Array.from(this.$refs.fileInput.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.file = {
            src: e.target.result,
            file,
          };
        };
        reader.readAsDataURL(file);
      });
    };
  },
};
</script>
