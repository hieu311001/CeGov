<template>
    <div class="toast-container">
        <div class="toast-message">
            <div class="toast-icon">
                <icon :class="toastClass"></icon>
            </div>
            <div class="toast-content">
                <slot></slot>
            </div>
            <div class="toast-close" @click="handleCloseToast">
                <icon class="icon icon-exit"></icon>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';

const store = useStore();

const props = defineProps({
  toastClass: {
      type: String,
      default: ''
  }
})

const handleCloseToast = () => {
    store.dispatch('showToast', false);
}
</script>

<style scoped>
.toast-container{
    min-width: 400px;
    width: 400px;
    height: 56px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
    z-index: 5;
    border-radius: 4px;
    box-shadow: 0 0 16px rgba(23,27,42,.24);
}

.toast-message{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.toast-content{
    width: 386px;
}

.toast-icon{
    padding: 2px 8px 0 16px;
}

.toast-close{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 16px;
}

.toast-close icon{
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
}
</style>