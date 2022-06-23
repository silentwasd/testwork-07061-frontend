import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import BoardPage from "@/pages/BoardPage";
import HelloWorld from "@/components/HelloWorld";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

const routes = [
    {
        path: '/',
        component: BoardPage
    },
    { path: '/hello-world', component: HelloWorld },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app');
