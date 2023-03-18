<template>
    <button :class="str">
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
        str: String
    }
}
</script>

<style scoped>

</style>
