<template>
    <div class="container px-4 px-lg-5 py-4 py-lg-5">
        <div class="row">
            <div class="col col-lg-6 col-xl-5 mx-auto">
                <div class="bg-white shadow-lg rounded p-3 p-lg-5">
                    <div class="text-center mb-3 mb-lg-4">
                        <p class="m-0 display-5">Регистрация</p>

                        <p v-if="message" class="m-0">{{ message }}</p>
                    </div>

                    <div class="d-flex flex-column gap-2 gap-lg-3 mb-3 mb-lg-4">
                        <ValidationInput placeholder="Имя"
                                         error-key="name"
                                         :errors="errors"
                                         :validated="validated"
                                         custom-class="fs-5"
                                         v-model="name"></ValidationInput>

                        <ValidationInput placeholder="Электронная почта"
                                         type="email"
                                         error-key="email"
                                         :errors="errors"
                                         :validated="validated"
                                         custom-class="fs-5"
                                         v-model="email"></ValidationInput>

                        <ValidationInput placeholder="Пароль"
                                         type="password"
                                         error-key="password"
                                         :errors="errors"
                                         :validated="validated"
                                         custom-class="fs-5"
                                         v-model="password"></ValidationInput>

                        <input type="password" class="form-control fs-5"
                               placeholder="Подтвердите пароль"
                               v-model="confirmPassword">
                    </div>

                    <button class="btn btn-primary w-100 fs-5 mb-2 mb-lg-3" @click="register">Зарегистрироваться</button>
                    <router-link to="/login" class="btn btn-secondary w-100 fs-5">У меня уже есть аккаунт</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ValidationInput from "@/components/Form/ValidationInput";

export default {
    name: "RegisterPage",
    components: {ValidationInput},
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {},
            validated: false,
            message: ''
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('http://localhost:8000/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword
                });

                this.errors = {};

                if (response.data.success)
                    await this.$router.push({ path: '/login', query: { message: 'Вы успешно зарегистрированы!' } });
                else
                    this.message = 'Произошла непредвиденная ошибка.';
            } catch (e) {
                if (e.response.status === 422) {
                    this.errors = e.response.data.errors;
                    return;
                }

                console.error(e);
            } finally {
                this.validated = true;
            }
        }
    }
}
</script>

<style scoped>

</style>