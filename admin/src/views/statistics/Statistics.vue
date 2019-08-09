<template lang="pug">
  v-layout(row wrap)
    template(v-for="(card, index) in cards")
      v-flex(xs12 sm6 md3 :key="index")
        card(:title="card.title" :positive="card.positive" :negative="card.negative")
    v-flex(xs12)
      line-graph(
        title="Количество заказов по дате"
        :labels="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
        :value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]")
    v-flex(xs12)
      line-graph(
        title="Общая стоимость заказов по дате"
        :labels="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
        :value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]")
</template>

<script>
import Card from '@/components/statistics/Card';
import LineGraph from '@/components/statistics/LineGraph';

export default {
  name: 'Statistics',
  components: {
    Card,
    LineGraph,
  },
  data: () => ({
    cards: [
      {
        title: {
          name: 'Всего заказов',
          value: '4,219',
        },
        positive: {
          name: 'Завершенные',
          value: '3,212',
        },
        negative: {
          name: 'В ожидании',
          value: '1,007',
        },
      },
      {
        title: {
          name: 'Общая продажа',
          value: '$12,251',
        },
        positive: {
          name: 'Завершенные',
          value: '$10,241',
        },
        negative: {
          name: 'В ожидании',
          value: '$2,512',
        },
      },
      {
        title: {
          name: 'Всего пользователей',
          value: '1,249',
        },
        positive: {
          name: 'Активные',
          value: '1,112',
        },
        negative: {
          name: 'Пассивные',
          value: '137',
        },
      },
      {
        title: {
          name: 'Всего товаров',
          value: '5,824',
        },
        positive: {
          name: 'Продаваемые',
          value: '4,000',
        },
        negative: {
          name: 'Непродаваемые',
          value: '1,824',
        },
      },
    ],
  }),
};
</script>
