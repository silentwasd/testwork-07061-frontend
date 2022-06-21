<template>
    <div class="rounded shadow-sm p-4" :style="{ 'background-color': bgColor }">
        <div class="row">
            <div class="col-12 col-sm">
                <p class="text-uppercase m-0 lh-1">{{ leadText }}</p>
                <h3 class="lh-1 my-2">{{ title }}</h3>
                <p class="m-0">{{ content }}</p>
            </div>
            <div class="col-12 col-sm-auto text-sm-end">
                <hr class="d-block d-sm-none">
                <p class="h3 m-0 fw-bold">{{ priceText }}</p>
                <p v-if="publishedAtFormatted" class="m-0">{{ publishedAtFormatted }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {DateTime, Interval} from "luxon";

export default {
    name: "BoardItem",
    props: {
        title: String,
        content: String,
        publishedAt: String,
        type: String,
        price: Object
    },
    computed: {
        bgColor() {
            return {
                service: "#c1defa",
                'want-service': "#87a0b9",
                rent: "#f5d886",
                'want-rent': "#b9a582",
                sell: "#a7e7a3",
                buy: "#ffa1a1"
            }[this.type];
        },

        leadText() {
            return {
                service: "выполню",
                'want-service': "оплачу",
                rent: "сдам",
                'want-rent': "хочу снять",
                sell: "продам",
                buy: "куплю"
            }[this.type];
        },

        priceText() {
            const priceTypes = {
                weight: (value) => value + ' ₽/кг',
                monthly: (value) => value + ' ₽/мес'
            };

            const ranges = {
                from: (value) => 'от ' + value,
                to: (value) => 'до ' + value
            };

            let formatted = this.format(this.price.value);

            if (Object.prototype.hasOwnProperty.call(this.price, 'range'))
                formatted = ranges[this.price.range](formatted);

            if (Object.prototype.hasOwnProperty.call(this.price, 'type'))
                return priceTypes[this.price.type](formatted);

            return formatted + ' ₽';
        },

        publishedAtFormatted() {
            if (!this.publishedAt)
                return null;

            const i = Interval.fromDateTimes(DateTime.fromISO(this.publishedAt), DateTime.now());

            if (i.length('minutes') < 60)
                return Math.round(i.length('minutes')) + ' мин назад';

            if (i.length('hours') < 24)
                return Math.round(i.length('hours')) + ' ч назад';

            if (i.length('days') < 30)
                return Math.round(i.length('days')) + ' дн назад';

            return Math.round(i.length('months')) + ' мес назад';
        }
    },
    methods: {
        format(val) {
            return parseInt(val).toLocaleString('en').replaceAll(',', ' ');
        }
    }
}
</script>

<style scoped>

</style>