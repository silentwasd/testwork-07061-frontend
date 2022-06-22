<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-white">
            <div class="container px-4 px-lg-5">
                <router-link to="/" class="navbar-brand fs-3">Bulletin Board</router-link>

                <button class="navbar-toggler" type="button" @click="collapsed =! collapsed">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" :class="{ 'show': !collapsed }">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Доска</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/hello-world" class="nav-link">Hello, world!</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    data() {
        return {
            collapsed: true
        };
    }
}
</script>

<style scoped>

</style>