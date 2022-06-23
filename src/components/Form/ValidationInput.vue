<template>
    <div class="input-group has-validation">
        <input class="form-control fs-5"
               :class="{
                    'is-valid': validated && !Object.prototype.hasOwnProperty.call(errors, errorKey),
                    'is-invalid': validated && Object.prototype.hasOwnProperty.call(errors, errorKey)
               }"
               :placeholder="placeholder"
               :value="modelValue"
               :type="type"
               @change="$emit('update:modelValue', $event.target.value)">

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
        modelValue: String
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>

</style>