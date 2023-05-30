<template>
    <button :class="str" :disabled="disabled" ref="btn">
        <slot></slot>
        <div class="btn-text">
            {{ text }}
        </div>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        text: String,
        str: String,
        disabled: {
            type: Boolean,
            default: false
        }
    }, 
    method: {
        getRef() {
            console.log(111);
        }
    }
}
</script>

<style scoped>

</style>
