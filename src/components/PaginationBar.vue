<template>
    <div class="row">
        <div class="col">
            <button class="btn btn-secondary w-100"
                    :class="{ disabled: !data.prev_page_url }"
                    @click="$emit('previousPage')">Назад</button>
        </div>

        <div class="col d-flex">
            <span class="mx-auto my-auto fs-5">{{ data.current_page }} из {{ data.last_page }}</span>
        </div>

        <div class="col">
            <button class="btn btn-secondary w-100"
                    :class="{ disabled: !data.next_page_url }"
                    @click="$emit('nextPage')">Дальше</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationBar",
    props: {
        data: Object
    }
}
</script>

<style scoped>

</style>