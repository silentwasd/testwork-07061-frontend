<template>
    <div class="container px-4 px-lg-5 py-4 py-lg-5">
        <div class="row">
            <div class="col col-lg-6 col-xl-5 mx-auto">
                <div class="bg-white shadow-lg rounded p-3 p-lg-5">
                    <div class="text-center mb-3 mb-lg-4">
                        <p class="m-0 display-5">Авторизация</p>

                        <p v-if="message" class="m-0">{{ message }}</p>
                    </div>

                    <div class="d-flex flex-column gap-2 gap-lg-3 mb-3 mb-lg-4">
                        <ValidationInput placeholder="Электронная почта"
                                         error-key="email"
                                         :errors="errors"
                                         :validated="validated"
                                         v-model="email"></ValidationInput>

                        <ValidationInput placeholder="Пароль"
                                         error-key="password"
                                         type="password"
                                         :errors="errors"
                                         :validated="validated"
                                         v-model="password"></ValidationInput>
                    </div>

                    <button class="btn btn-primary w-100 fs-5 mb-2 mb-lg-3" @click="login">Войти</button>
                    <router-link to="/register" class="btn btn-secondary w-100 fs-5">У меня нет аккаунта</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ValidationInput from "@/components/Form/ValidationInput";
import axios from "axios";
export default {
    name: "LoginPage",
    components: {ValidationInput},
    data() {
        return {
            email: '',
            password: '',
            errors: {},
            validated: false,
            message: ''
        };
    },
    methods: {
        applyQuery(query) {
            this.message = Object.prototype.hasOwnProperty.call(query, 'message') ? query.message : '';
        },

        async login() {
            try {
                const response = await axios.post('http://localhost:8000/api/login', {
                    email: this.email,
                    password: this.password
                });

                this.errors = {};

                if (response.data.success) {
                    this.$root.auth.token = response.data.data.token;
                    await this.$router.push({path: '/'});
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
                    return;
                }

                console.error(e);
            }
        }
    },
    mounted() {
        this.applyQuery(this.$route.query);
    }
}
</script>

<style scoped>

</style>