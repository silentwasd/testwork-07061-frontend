<template>
    <div class="container px-4 px-lg-5 py-4 py-lg-5">
        <div v-if="errors">
            <h1 class="display-1">Упс!</h1>
            <p class="fs-3">Что-то пошло не так.</p>
            <router-link to="/" class="btn btn-primary fs-5">Вернуться на доску</router-link>
        </div>

        <template v-if="!errors && Object.keys(data).length > 0">
            <div class="row">
                <div class="col order-1 order-lg-0 d-flex flex-column gap-3">
                    <p class="text-uppercase m-0 fs-5">{{ leadText }}</p>
                    <h1 class="display-5 fw-bold m-0 lh-1">{{ data.title }}</h1>
                    <hr>
                    <p class="m-0 fs-5">{{ data.content }}</p>
                    <p v-if="publishedAtFormatted" class="m-0">Опубликовано: {{ publishedAtFormatted }}</p>
                    <p v-else class="m-0">Еще не опубликовано</p>
                </div>

                <div class="col-12 order-0 order-lg-1 col-lg-4 ps-lg-3 ps-xl-5 mb-4 mb-lg-0">
                    <div class="p-4 shadow rounded sticky-top bg-white text-center" style="top: 3em;">
                        <h3>{{ priceText }}</h3>
                        <button v-if="!data.own" class="btn btn-primary w-100">Откликнуться</button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import {DateTime, Interval} from "luxon";

export default {
    name: "BoardItemPage",
    props: ['item'],
    data() {
        return {
            errors: false,
            data: {}
        };
    },
    computed: {
        leadText() {
            return {
                service: "выполню",
                'want-service': "оплачу",
                rent: "сдам",
                'want-rent': "хочу снять",
                sell: "продам",
                buy: "куплю"
            }[this.data.item_type];
        },

        publishedAtFormatted() {
            if (!this.data.published_at)
                return null;

            const i = Interval.fromDateTimes(DateTime.fromISO(this.data.published_at), DateTime.now());

            if (i.length('minutes') < 60)
                return Math.round(i.length('minutes')) + ' мин назад';

            if (i.length('hours') < 24)
                return Math.round(i.length('hours')) + ' ч назад';

            if (i.length('days') < 30)
                return Math.round(i.length('days')) + ' дн назад';

            if (i.length('months') < 12)
                return Math.round(i.length('months')) + ' мес назад';

            return Math.round(i.length('years')) + ' лет назад';
        },

        priceText() {
            const priceTypes = {
                simple: (value) => value + ' ₽',
                weight: (value) => value + ' ₽/кг',
                monthly: (value) => value + ' ₽/мес'
            };

            const ranges = {
                from: (value) => 'от ' + value,
                to: (value) => 'до ' + value,
                exact: (value) => value
            };

            if (!this.data.price)
                return null;

            let formatted = this.format(this.data.price.value);
            formatted = ranges[this.data.price.range](formatted);
            return priceTypes[this.data.price.type](formatted);
        },
    },
    methods: {
        format(val) {
            return parseInt(val).toLocaleString('en').replaceAll(',', ' ');
        }
    },
    async mounted() {
        try {
            const response = await axios.get(`http://localhost:8000/api/board/item/${this.item}`, {
                headers: {
                    Authorization: 'Bearer ' + this.$root.auth.token
                }
            });
            if (!response.data.success)
                this.errors = true;
            else
                this.data = response.data.data;
        } catch (e) {
            this.errors = true;
            console.error(e);
        }
    }
}
</script>

<style scoped>

</style>