<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 md6 lg4)
      .border.pa-4
        v-treeview(
          activatable
          hoverable
          expand-icon="keyboard_arrow_down"
          :items="items"
          @update:active="activate")
          template(v-slot:prepend="{ item }")
            v-icon bookmark_outline
          template(v-slot:append="{ active }")
            v-icon(v-if="active") check
        v-btn.mt-4(block outlined color="#707070") Добавить корневую категорию
    v-flex(xs12 md6 lg8)
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      selected: null,
      items: [
        {
          id: 1,
          name: 'Цифровое Телевидение и радио',
          children: [{ id: 2, name: 'Цифровое Телевидение и радио' }],
        },
        {
          id: 3,
          name: 'Беспроводные решения',
          children: [{ id: 4, name: 'Беспроводные решения' }],
        },
        {
          id: 5,
          name: 'Оптико-транспортные решения',
          children: [{ id: 6, name: 'Оптико-транспортные решения' }],
        },
      ],
    };
  },
  methods: {
    activate(items) {
      this.selected = items.length ? items[0] : null;
    },
  },
};
</script>
