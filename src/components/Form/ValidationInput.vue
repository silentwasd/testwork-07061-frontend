<template>
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <div class="input-group has-validation">
        <input class="form-control"
               :id="id"
               :class="[
                    validated && !Object.prototype.hasOwnProperty.call(errors, errorKey) ? 'is-valid' : '',
                    validated && Object.prototype.hasOwnProperty.call(errors, errorKey) ? 'is-invalid' : '',
                    customClass ? customClass : ''
               ]"
               :placeholder="placeholder"
               :value="modelValue"
               :type="type"
               @input="$emit('update:modelValue', $event.target.value)">

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
    name: "ValidationInput",
    props: {
        errors: Object,
        validated: Boolean,
        errorKey: String,
        placeholder: String,
        type: {
            type: String,
            default: 'text'
        },
        modelValue: String,
        label: String,
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