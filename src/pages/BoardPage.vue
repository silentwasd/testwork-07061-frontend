<template>
    <div class="container px-4 px-lg-5 py-5">
        <div class="row">
            <div class="col d-flex flex-column gap-3">
                <PaginationBar v-if="pagination.total >= pagination.per_page"
                               :data="pagination"
                               @nextPage="nextPage"
                               @previousPage="previousPage"></PaginationBar>

                <div class="row" v-for="(item, index) in sortedItems" :key="index">
                    <div class="col">
                        <BoardItem :title="item.title"
                                   :content="item.content"
                                   :price="item.price"
                                   :type="item.item_type"
                                   :published-at="item.published_at"></BoardItem>
                    </div>
                </div>

                <PaginationBar v-if="pagination.total >= pagination.per_page"
                               :data="pagination"
                               @nextPage="nextPage"
                               @previousPage="previousPage"></PaginationBar>
            </div>

            <div class="col-4 ps-5">
                <div class="p-4 shadow rounded sticky-top bg-white" style="top: 2em;">
                    <h3>Всего {{ pagination.total }} объявлений</h3>

                    <div class="mb-3">
                        <label for="type" class="form-label">Хочу:</label>
                        <select id="type" class="form-control" v-model="type">
                            <option value="">не важно</option>
                            <option value="sell">купить</option>
                            <option value="buy">продать</option>
                            <option value="rent">снять</option>
                            <option value="want-rent">сдать</option>
                            <option value="service">получить услугу</option>
                            <option value="want-service">оказать услугу</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="content" class="form-label">Что:</label>
                        <input id="content" class="form-control" v-model="content"
                               placeholder="iPhone в отличном состоянии">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PaginationBar from "@/components/PaginationBar";
import BoardItem from "@/components/BoardItem";
import _ from "lodash";
import axios from "axios";

export default {
    name: "BoardPage",
    components: {
        PaginationBar,
        BoardItem
    },
    data() {
        return {
            pagination: {},
            type: '',
            content: ''
        };
    },
    computed: {
        items() {
            return Object.prototype.hasOwnProperty.call(this.pagination, 'data') ? this.pagination.data : [];
        },

        sortedItems() {
            const items = this.type ? this.items.filter(x => x.item_type === this.type) : this.items;
            return _.sortBy(items, x => x.publishedAt);
        }
    },
    watch: {
        type() {
            this.updateQuery();
        },

        content() {
            this.updateQuery();
        }
    },
    methods: {
        previousPage() {
            this.pagination.current_page--;
            this.updateQuery();
        },

        nextPage() {
            this.pagination.current_page++;
            this.updateQuery();
        },

        async requestPage() {
            try {
                const query = new URLSearchParams({
                    page: this.pagination.current_page,
                    type: this.type,
                    content: this.content
                });

                const response = await axios.get(`http://localhost:8000/api/board/items?${query}`);
                if (!response.data.success)
                    console.error(response.data);
                this.pagination = response.data.data;
            } catch (e) {
                console.error(e);
            }
        },

        applyQuery(query) {
            this.type = Object.prototype.hasOwnProperty.call(query, 'type') ? query.type : '';
            this.content = Object.prototype.hasOwnProperty.call(query, 'content') ? query.content : '';
            this.pagination.current_page = Object.prototype.hasOwnProperty.call(query, 'page') ? query.page : '';

            this.requestPage();
        },

        updateQuery() {
            this.$router.push({
                path: this.$route.path,
                query: {
                    type: this.type,
                    content: this.content,
                    page: this.pagination.current_page
                }
            });
        }
    },
    mounted() {
        this.applyQuery(this.$route.query);
    },
    created() {
        this.$watch(
            () => this.$route.query,
            (data) => {
                this.applyQuery(data);
            }
        );
    }
}
</script>

<style scoped>

</style>