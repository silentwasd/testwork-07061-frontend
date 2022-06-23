<template>
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <div class="input-group has-validation">
        <textarea class="form-control"
               :id="id"
               :class="[
                    validated && !Object.prototype.hasOwnProperty.call(errors, errorKey) ? 'is-valid' : '',
                    validated && Object.prototype.hasOwnProperty.call(errors, errorKey) ? 'is-invalid' : '',
                    customClass ? customClass : ''
               ]"
               :placeholder="placeholder"
               :value="modelValue"
               :rows="rows"
               @input="$emit('update:modelValue', $event.target.value)"></textarea>

        <div v-if="validated && !Object.prototype.hasOwnProperty.call(errors, errorKey)" class="valid-feedback">
            Все отлично!
        </div>

        <div v-if="validated && Object.prototype.hasOwnProperty.call(errors, errorKey)" class="invalid-feedback">
            {{ errors[errorKey].join(' ') }}
        </div>
    </div>
</template>

<script>
export default {
    name: "ValidationArea",
    props: {
        errors: Object,
        validated: Boolean,
        errorKey: String,
        placeholder: String,
        modelValue: String,
        label: String,
        rows: String,
        customClass: String
    },
    data() {
        return {
            id: ''
        };
    },
    emits: ['update:modelValue'],
    mounted() {
        this.id = this._uid;
    }
}
</script>

<style scoped>

</style>