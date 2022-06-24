<template>
    <div class="container px-4 px-lg-5 py-4 py-lg-5">
        <div class="mb-3">
            <h1 class="m-0">Изменить объявление</h1>
            <p class="m-0" v-if="message">{{ message }}</p>
        </div>

        <div class="row row-cols-1 row-cols-lg-2">
            <div class="col order-1 order-lg-0">
                <div class="mb-3">
                    <label for="type" class="form-label">Хочу</label>
                    <select id="type" v-model="type" class="form-control">
                        <option value="buy">купить</option>
                        <option value="sell">продать</option>
                        <option value="want-rent">снять</option>
                        <option value="rent">сдать</option>
                        <option value="want-service">получить услугу</option>
                        <option value="service">оказать услугу</option>
                    </select>
                </div>

                <div class="mb-3">
                    <ValidationInput :validated="validated" :errors="errors"
                                     error-key="title"
                                     label="Что" v-model="title"
                                     placeholder="Книги советских и российских писателей"></ValidationInput>
                </div>

                <div class="mb-3">
                    <ValidationInput :validated="validated" :errors="errors"
                                     error-key="price" type="number"
                                     label="Цена" v-model="price.value"
                                     placeholder="1000"></ValidationInput>
                </div>

                <template v-if="priceDetails">
                    <div class="mb-3">
                        <label for="priceType" class="form-label">Тип цены</label>
                        <select id="priceType" v-model="price.type" class="form-control">
                            <option value="simple">обычный</option>
                            <option value="weight">весовой</option>
                            <option value="monthly">месячный</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="priceRange" class="form-label">Ценовой диапазон</label>
                        <select id="priceRange" v-model="price.range" class="form-control">
                            <option value="exact">точный</option>
                            <option value="from">от</option>
                            <option value="to">до</option>
                        </select>
                    </div>
                </template>

                <button class="btn btn-secondary w-100 mb-3" @click="priceDetails =! priceDetails">
                    {{ priceDetails ? 'Скрыть' : 'Детальнее' }}
                </button>

                <div class="mb-3">
                    <ValidationArea :validated="validated" :errors="errors"
                                    error-key="content"
                                    label="Описание" v-model="content"
                                    placeholder="..." rows="5"></ValidationArea>
                </div>

                <button class="btn btn-success w-100" @click="send">Сохранить</button>
            </div>

            <div class="col order-0 order-lg-1 mb-3 mb-lg-0">
                <BoardItem :title="title ? title : 'Что-нибудь'"
                           :content="content ? content : 'Очень особенное и красивое.'"
                           :type="type"
                           :price="price"></BoardItem>
            </div>
        </div>
    </div>
</template>

<script>
import ValidationInput from "@/components/Form/ValidationInput";
import ValidationArea from "@/components/Form/ValidationArea";
import BoardItem from "@/components/BoardItem";
import axios from "axios";
export default {
    name: "BoardEditPage",
    components: {BoardItem, ValidationArea, ValidationInput},
    props: ['item'],
    data() {
        return {
            validated: false,
            errors: {},
            title: '',
            content: '',
            type: 'sell',
            price: {
                value: 0,
                range: 'exact',
                type: 'simple'
            },
            priceDetails: false,
            message: ''
        };
    },
    methods: {
        async send() {
            try {
                const response = await axios.post(`http://localhost:8000/api/board/item/${this.item}/update`, {
                    title: this.title,
                    content: this.content,
                    item_type: this.type,
                    price_value: this.price.value,
                    price_range: this.price.range,
                    price_type: this.price.type
                }, {
                    headers: {
                        Authorization: 'Bearer ' + this.$root.auth.token
                    }
                });

                this.errors = {};

                if (response.data.success) {
                    await this.$router.push({name: 'board.item', params: { item: this.item }});
                } else
                    this.message = 'Произошла непредвиденная ошибка.';
            } catch (e) {
                if (e.response.status === 422) {
                    this.errors = e.response.data.errors;
                    this.validated = true;
                    return;
                }

                if (e.response.status === 401) {
                    this.message = e.response.data.error.message;
                    await this.$router.push({path: '/login'});
                    return;
                }

                console.error(e);
            }
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
                this.message = 'Произошла непредвиденная ошибка.';
            else {
                const data = response.data.data;
                this.title = data.title;
                this.content = data.content;
                this.type = data.item_type;
                this.price.value = data.price.value;
                this.price.range = data.price.range;
                this.price.type = data.price.type;
            }
        } catch (e) {
            this.message = 'Произошла непредвиденная ошибка.';
            console.error(e);
        }
    }
}
</script>

<style scoped>

</style>