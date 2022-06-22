<template>
  <div class="container px-4 px-lg-5 py-5">
      <div class="row">
          <div class="col d-flex flex-column gap-3">
              <PaginationBar :data="pagination" @nextPage="nextPage" @previousPage="previousPage"></PaginationBar>

              <div class="row" v-for="(item, index) in sortedItems" :key="index">
                  <div class="col">
                      <BoardItem :title="item.title"
                                 :content="item.content"
                                 :price="item.price"
                                 :type="item.item_type"
                                 :published-at="item.published_at"></BoardItem>
                  </div>
              </div>

              <PaginationBar :data="pagination" @nextPage="nextPage" @previousPage="previousPage"></PaginationBar>
          </div>

          <div class="col-4 ps-5">
              <div class="p-4 shadow rounded sticky-top bg-white" style="top: 2em;">
                  <h3>Всего {{ pagination.total }} объявлений</h3>

                  <div class="mb-3">
                      <label for="type" class="form-label">Хочу:</label>
                      <select id="type" class="form-control" v-model="type">
                          <option value="">все</option>
                          <option value="sell">купить</option>
                          <option value="buy">продать</option>
                          <option value="rent">снять</option>
                          <option value="want-rent">сдать</option>
                          <option value="service">получить услугу</option>
                          <option value="want-service">оказать услугу</option>
                      </select>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import BoardItem from "@/components/BoardItem";
import _ from "lodash";
import axios from "axios";
import PaginationBar from "@/components/PaginationBar";

export default {
    name: 'App',
    components: {
        PaginationBar,
        BoardItem
    },
    data() {
        return {
            pagination: {},
            type: ''
        };
    },
    computed: {
        items() {
            return this.pagination.data;
        },

        sortedItems() {
            const items = this.type ? this.items.filter(x => x.item_type === this.type) : this.items;
            return _.sortBy(items, x => x.publishedAt);
        }
    },
    watch: {
        type() {
            this.pagination.current_page = 1;
            this.requestPage();
        }
    },
    methods: {
        previousPage() {
            this.pagination.current_page--;
            this.requestPage();
        },

        nextPage() {
            this.pagination.current_page++;
            this.requestPage();
        },

        async requestPage() {
            try {
                const query = new URLSearchParams({
                    page: this.pagination.current_page,
                    type: this.type
                });

                const response = await axios.get(`http://localhost:8000/api/board/items?${query}`);
                if (!response.data.success)
                    console.error(response.data);
                this.pagination = response.data.data;
            } catch (e) {
                console.error(e);
            }
        }
    },
    async mounted() {
        try {
            const response = await axios.get("http://localhost:8000/api/board/items");
            if (!response.data.success)
                console.error(response.data);
            this.pagination = response.data.data;
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

body {
    background-color: #f8f8f8;
}
</style>
