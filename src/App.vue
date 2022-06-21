<template>
  <div class="container px-4 py-5">
      <div class="d-flex flex-column" style="gap: 1em;">
          <div class="row" v-for="(item, index) in sortedItems" :key="index">
              <BoardItem :title="item.title"
                         :content="item.content"
                         :price="item.price"
                         :type="item.item_type"
                         :published-at="item.published_at"></BoardItem>
          </div>
      </div>
  </div>
</template>

<script>
import BoardItem from "@/components/BoardItem";
import _ from "lodash";
import axios from "axios";

export default {
    name: 'App',
    components: {
        BoardItem
    },
    data() {
        return {
            items: []
        };
    },
    computed: {
        sortedItems() {
            return _.sortBy(this.items, x => x.publishedAt);
        }
    },
    async mounted() {
        try {
            const response = await axios.get("http://localhost:8000/api/board/items");
            if (!response.data.success)
                console.error(response.data);
            this.items = response.data.data;
        } catch (e) {
            console.error(e);
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
