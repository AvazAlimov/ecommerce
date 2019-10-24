<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      .border.radius.pa-5
        .title Корзина
        v-combobox.mt-3(v-model="user"
          label="Клиент"
          placeholder="Поиск клиента"
          :items="clients"
          :search-input.sync="userQuery"
          item-text="email"
          outlined
          hide-details
          clearable
          clear-icon="close")
        v-combobox.mt-3(
          ref="procutsSearch"
          label="Товары"
          placeholder="Поиск товаров"
          :items="products"
          :search-input.sync="productQuery"
          @change="addProduct"
          item-text="name"
          outlined
          hide-details
          clearable
          clear-icon="close")
        .title.mt-3(v-if="items.length") Всего товаров: {{ items.length }}
        template(v-for="(item, index) in items")
          .border.radius.pa-4.mt-3
            v-layout(row wrap align-center)
              v-flex(shrink)
                v-text-field.mr-2(
                  style="max-width: 100px"
                  v-model="item.quantity"
                  flat solo outlined
                  suffix="шт."
                  hide-details
                  :name="`quantity${item.id}`"
                  v-validate="'required|numeric'")
              v-flex(extend)
                .title {{ item.name }}
                .subtitle Цена: {{ item.price | numeralFormat }} сум
                  |  x {{ (item.quantity || 0) | numeralFormat }}
                  |  = {{ (item.price * item.quantity) | numeralFormat }} сум
              v-flex(shrink)
                v-btn(icon small color="red" @click="items.splice(index, 1)")
                  v-icon(small) close
        v-divider.my-3
        v-layout(row wrap align-center)
          v-flex(extend)
            .title Итоговая цена: {{ totalPrice | numeralFormat }} сум
          v-flex(shrink)
            v-btn.ml-3(
              :loading="loading"
              :disabled="errors.items.length > 0 || !user"
              @click="submitPayme()"
              outlined
            ) Подтвердить (Payme)
            v-btn.ml-3(
              :loading="loading"
              :disabled="errors.items.length > 0 || !user"
              @click="submitClick()"
              outlined
            ) Подтвердить (Click)
</template>
<script>
import { mapActions } from 'vuex';
import { isObject } from 'util';

export default {
  name: 'New',
  data: () => ({
    loading: false,
    userQuery: '',
    clients: [],
    user: null,
    productQuery: '',
    products: [],
    items: [],
  }),
  computed: {
    totalPrice() {
      let price = 0;
      this.items.forEach((item) => {
        price += item.quantity * item.price;
      });
      return price;
    },
  },
  methods: {
    ...mapActions('orders', ['create']),
    ...mapActions('users', { findClients: 'find' }),
    ...mapActions('products', { findProducts: 'find' }),
    addProduct(product) {
      if (isObject(product) && !this.items.find(item => item.id === product.id)) {
        this.items.push({
          id: product.id,
          name: product.name,
          quantity: 1,
          price: product.prices.length ? product.prices[0].value : 0,
        });
      }
      this.$refs.procutsSearch.setValue(null);
    },
    submitClick() {
      this.loading = true;
      this.create({
        clientId: this.user.id,
        items: this.items,
        price: this.totalPrice,
      })
        .then((order) => {
          const url = `https://my.click.uz/services/pay?service_id=${
            14492
          }&merchant_id=${
            9879
          }&amount=${
            order.price
          }&transaction_param=${
            order.id
          }&return_url=${
            'http://46.8.35.24'
          }&card_type=uzcard`;
          window.location.replace(url);
        })
        .catch(console.error)
        .finally(() => { this.loading = false; });
    },
    submitPayme() {
      this.loading = true;
      this.create({
        clientId: this.user.id,
        items: this.items,
        price: this.totalPrice,
      })
        .then((order) => {
          const form = document.createElement('form');
          form.setAttribute('method', 'post');
          form.setAttribute('action', 'https://test.paycom.uz');

          const merchant = document.createElement('input');
          merchant.setAttribute('type', 'hidden');
          merchant.setAttribute('name', 'merchant');
          merchant.setAttribute('value', '5d838220b280ff2249d61db7');

          const amount = document.createElement('input');
          amount.setAttribute('type', 'hidden');
          amount.setAttribute('name', 'amount');
          amount.setAttribute('value', `${order.price * 1000}`);

          const orderId = document.createElement('input');
          orderId.setAttribute('type', 'hidden');
          orderId.setAttribute('name', 'account[order_id]');
          orderId.setAttribute('value', `${order.id}`);

          form.appendChild(merchant);
          form.appendChild(amount);
          form.appendChild(orderId);

          document.getElementsByTagName('body')[0].appendChild(form);

          form.submit();
        })
        .catch(console.error)
        .finally(() => { this.loading = false; });
    },
  },
  watch: {
    userQuery(value) {
      if (value) {
        this.findClients({
          query: {
            role: 1,
            email: { $like: `%${value}%` },
          },
        }).then(({ data }) => { this.clients = data; });
      } else {
        this.clients = [];
      }
    },
    productQuery(value) {
      if (value) {
        this.findProducts({
          query: {
            name: { $like: `%${value}%` },
          },
        }).then(({ data }) => { this.products = data; });
      } else {
        this.products = [];
      }
    },
  },
};
</script>
