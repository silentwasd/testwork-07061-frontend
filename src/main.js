import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import Cookie from 'js-cookie';
import App from './App.vue'
import BoardPage from "@/pages/BoardPage";
import HelloWorld from "@/components/HelloWorld";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import BoardCreatePage from "@/pages/BoardCreatePage";
import BoardItemPage from "@/pages/BoardItemPage";

const routes = [
    {
        path: '/',
        component: BoardPage
    },
    { path: '/hello-world', component: HelloWorld },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/board/create', component: BoardCreatePage, meta: { auth: true } },
    { path: '/board/item/:item', name: 'board.item', component: BoardItemPage, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    if (to.meta.auth && !Cookie.get('auth_token')) {
        return {
            path: '/login'
        }
    }
})

createApp(App)
    .use(router)
    .mount('#app');
