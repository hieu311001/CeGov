<template>
    <div class="popup">
        <div class="popup-container">
            <div class="popup-head">
                <div class="popup-top">
                    <div class="popup-text" >
                        <slot name="slotTitle"></slot>
                    </div>
                    <div class="popup-icon" @click="handleClosePopup">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
                <div class="popup-content">
                    <slot name="slotContent"></slot>
                </div>
            </div>
            <div class="popup-btn">
                <slot name="slotButton"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const showPopup = computed(() => store.state.app.showPopup);

const handleClosePopup = () => {
    store.dispatch('showPopup', false);
}
</script>

<style scoped>
.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    border-radius: 4px;
    background-color: #fff;
    z-index: 10001;
    box-shadow: 0 0 16px rgba(23,27,42,.24);
}
/* 
.popup-container {
    padding: 24px;
} */

.popup-head{
    min-height: 108px;
    padding: 20px 16px 16px 16px;
}

.popup-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
}

.popup-icon {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.popup-text{
    font-size: 20px;
    font-weight: 700;
}

.popup-btn{
    position: relative;
    height: 30px;
    padding: 0 24px 24px 16px;
    border-radius: 3px;
}
</style>
    