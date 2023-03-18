<template>
    <div class="content-area">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'ContentArea',
    props: {

    },
    components: {
        // EmployeePage,
    }
}
</script>

<style scoped>
.content-area {
    flex: 1;
    min-height: 0;
    min-width: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
}

.content-area>div{
    padding-left: 204px;
}
</style>
    