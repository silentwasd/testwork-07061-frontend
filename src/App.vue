<template>
    <div>
        <AppHeader></AppHeader>

        <router-view></router-view>
    </div>
</template>

<script>
import Cookie from "js-cookie";
import AppHeader from "@/components/AppHeader";
import axios from "axios";
export default {
    name: 'App',
    components: {AppHeader},
    data() {
        return {
            auth: {
                token: ''
            }
        };
    },
    methods: {
        async logout() {
            try {
                const response = await axios.post('http://localhost:8000/api/logout', {}, {
                    headers: {
                        Authorization: 'Bearer ' + this.auth.token
                    }
                });

                if (response.data.success) {
                    this.auth.token = '';
                    Cookie.remove('auth_token');
                    await this.$router.push({ path: '/' });
                } else {
                    console.error("Server responded with false success field (logout).")
                }
            } catch (e) {
                console.error(e);
            }
        }
    },
    mounted() {
        const token = Cookie.get('auth_token');
        if (token)
            this.auth.token = token;
    },
    created() {
        this.$watch(
            () => this.auth.token,
            (val) => Cookie.set('auth_token', val)
        )
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
