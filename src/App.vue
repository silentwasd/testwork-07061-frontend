<template>
  <div class="container px-4 py-5">
      <div class="d-flex flex-column" style="gap: 1em;">
          <div class="row" v-for="(item, index) in sortedItems" :key="index">
              <BoardItem :title="item.title"
                         :content="item.content"
                         :price="item.price"
                         :type="item.type"
                         :published-at="item.publishedAt"></BoardItem>
          </div>
      </div>
  </div>
</template>

<script>
import BoardItem from "@/components/BoardItem";
import _ from "lodash";

export default {
    name: 'App',
    components: {
        BoardItem
    },
    data() {
        return {
            items: [
                {
                    title: "iPhone 8",
                    content: "Продаю в отличном состоянии, ни разу не падал, в воде не купался.",
                    price: {
                        value: "20000"
                    },
                    type: "sell",
                    publishedAt: "2022-06-21T12:00:00"
                },
                {
                    title: "Hyundai Grandeur (2013 года)",
                    content: "Обслуживается у официального дилера сервисная книга с отметками имеется. Пробег 100% оригинальный.",
                    price: {
                        value: "1295000"
                    },
                    type: "sell",
                    publishedAt: "2022-06-05T09:53:22"
                },
                {
                    title: "1-к. квартира, 32 м², 3/5 эт.",
                    content: "Сдается однокомнатная квартира с отличным ремонтом в своем сегменте!",
                    price: {
                        type: "monthly",
                        value: "15000"
                    },
                    type: "rent",
                    publishedAt: "2022-01-01T00:00:00"
                },
                {
                    title: "Ремонт смартфонов Android и iPhone",
                    content: "Высококачественный ремонт мобильной техники по низким ценам.",
                    price: {
                        range: "from",
                        value: "1000"
                    },
                    type: "service",
                    publishedAt: "2022-06-21T15:15:21"
                },
                {
                    title: "Медь",
                    content: "Куплю медь дорого.",
                    publishedAt: "2022-05-25T09:00:00",
                    type: "buy",
                    price: {
                        type: "weight",
                        value: "450"
                    }
                },
                {
                    title: "2-к. квартира, от 50 м²",
                    content: "Ищу квартиру в аренду от 50 м², двухкомнатную со стиральной машиной.",
                    type: "want-rent",
                    price: {
                        range: "to",
                        value: "60000"
                    },
                    publishedAt: "2022-06-19T15:30:01"
                },
                {
                    title: "Доставка товара из Беларуси",
                    content: "Заказал товар в Минске, и нужно доставить его в Москву.",
                    price: {
                        value: "10000"
                    },
                    type: "want-service",
                    publishedAt: "2022-06-21T18:00:00"
                },
            ]
        };
    },
    computed: {
        sortedItems() {
            return _.sortBy(this.items, x => x.publishedAt).reverse();
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
