<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 md6 lg4)
      .border.pa-4.radius
        .title.mb-4 Все категории
        v-treeview(
          activatable
          hoverable
          expand-icon="keyboard_arrow_down"
          :items="categories"
          @update:active="activate")
          template(v-slot:prepend="{ item }")
            v-icon bookmark_outline
          template(v-slot:append="{ active }")
            v-icon(v-if="active") check

        v-btn.mt-2(
          v-if="selected"
          block outlined color="#707070"
          @click="add()"
        ) Добавить подкатегорию
        v-btn.mt-2(
          v-if="selected"
          block outlined color="red"
          @click="removeCategory()"
        ) Удалить категорию
        v-btn.mt-2(
          v-if="!selected"
          block outlined color="#707070"
          :to="{ name: 'categories.add' }"
        ) Добавить корневую категорию
    v-flex(xs12 md6 lg8)
      router-view
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Categories',
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapState('categories', { findCategoriesLoading: 'isFindPending' }),
    ...mapGetters('categories', { findCategoriesInStore: 'find' }),
    query() { return { }; },
    categories() {
      const categories = this.findCategoriesInStore({ query: this.query }).data
        .map(item => ({
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          children: [],
        }));

      categories.filter(category => category.parentId !== null)
        .forEach((category) => {
          const parent = categories.find(item => item.id === category.parentId);
          if (parent) parent.children.push(category);
          else category.parentId = null; // eslint-disable-line no-param-reassign
        });

      return categories.filter(category => category.parentId === null);
    },
  },
  methods: {
    ...mapActions('categories', ['remove']),
    ...mapActions('categories', { findCategories: 'find' }),
    async activate(items) {
      if (items.length) {
        if (this.selected !== items[0]) this.$router.push({ name: 'categories' });
        await new Promise(resolve => setTimeout(resolve, 50));
        [this.selected] = items;
        this.$router.push({ name: 'categories.edit', params: { id: this.selected } });
      } else {
        this.selected = null;
        this.$router.push({ name: 'categories' });
      }
    },
    async add() {
      this.$router.push({ name: 'categories' });
      await new Promise(resolve => setTimeout(resolve, 50));
      this.$router.push({ name: 'categories.add', query: { parentId: this.selected } });
    },
    removeCategory() {
      // eslint-disable-next-line no-alert, no-restricted-globals
      if (confirm('Do you really want to remove a category?')) {
        this.remove(this.selected).then(() => {
          this.selected = null;
          this.$router.push({ name: 'categories' });
        });
      }
    },
  },
  created() {
    this.findCategories({ query: this.query });
  },
};
</script>
