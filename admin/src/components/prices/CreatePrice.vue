<template lang="pug">
    v-dialog(v-model="dialog" width="500")
        v-card(v-if="product")
            v-card-title {{ product.name }}
            v-card-text
                v-text-field.mt-3(
                    v-model="price"
                    label="Цена"
                    name="price"
                    v-validate="'required|decimal'"
                    hide-details
                    outlined)
            v-card-actions
                .flex-grow-1
                v-btn(
                    text color="primary"
                    :loading="loading"
                    :disabled="errors.items.length > 0"
                    @click="submit()"
                ) Обновить цену
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'CreatePrice',
  data: () => ({
    loading: false,
    dialog: false,
    product: null,
    price: 0,
  }),
  methods: {
    ...mapActions('prices', ['create']),
    setProduct(product) {
      this.product = product;
      if (product.prices.length) {
        this.price = product.prices[0].value;
      }
      this.dialog = true;
    },
    submit() {
      if (this.product.id) {
        this.loading = true;
        this.create([{
          productId: this.product.id,
          value: this.price,
        }]).then(() => {
          this.$store.dispatch('products/find');
          this.dialog = false;
        }).finally(() => { this.loading = false; });
      }
    },
  },
};
</script>
