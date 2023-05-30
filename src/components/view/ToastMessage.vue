<template>
    <div class="toast-container" v-show="showToast">
        <BaseToastMessage toastClass="icon icon-success" v-show="toastStatus == 1">
            <div>{{ toastMsg }}</div>
        </BaseToastMessage>
        <BaseToastMessage toastClass="icon icon-fail" v-show="toastStatus == 2">
            <div>{{ toastMsg }}</div>
        </BaseToastMessage>
    </div>
</template>

<script setup>
import BaseToastMessage from '@/components/base/ToastMessage/BaseToastMessage.vue';
import { computed, watch, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import * as Resource from '@/common/Resource/resource';
import * as Enum from '@/common/Enum/enum';

const store = useStore();
const showToast = computed(() => store.state.app.showToast);
const toastMsg = computed(() => store.state.app.toastMsg);
const toastStatus = ref(1);

/**
 * Kiểm tra toastMsg để hiển thị icon phù hợp
 * CreatedBy VMHieu 05/03/2023
 */
watch((showToast), () => {
    if (Object.values(Resource.ToastSuccess).includes(toastMsg.value)) {
        toastStatus.value = 1;
    } else {
        toastStatus.value = 2;
    }
})
</script>

<style scoped>

</style>