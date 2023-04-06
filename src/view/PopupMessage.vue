<template>
    <BasePopup v-show="showPopup == 1">
        <template v-slot:slotTitle>Xóa Danh hiệu thi đua</template>
        <template v-slot:slotContent>
            <div class="content">{{ data.Msg }}</div>
        </template>
        <template v-slot:slotButton>
            <div class="btn btn-warning">
                <BaseButton text="Không" class="ms-button" @click="handleClose"/>
                <BaseButton text="Xóa danh hiệu" class="ms-button btn-red btn-right" @click="handleSaveDelete"/>
            </div>
        </template>
    </BasePopup>
    <BasePopup v-show="showPopup == 2">
        <template v-slot:slotTitle>MISA CeGov</template>
        <template v-slot:slotContent>
            <div class="content">{{ data.Msg }}</div>
        </template>
        <template v-slot:slotButton>
            <div class="btn btn-warning">
                <BaseButton text="Đóng" class="ms-button btn-red btn-right" @click="handleClose"/>
            </div>
        </template>
    </BasePopup>
</template>

<script setup>
import BasePopup from "@/components/base/Popup/BasePopup.vue";
import BaseButton from "@/components/base/Button/BaseButton.vue";
import { computed, defineProps, ref } from "vue";
import { useStore } from "vuex";
import * as Resource from '@/common/Resource/resource';
import * as Enum from '@/common/Enum/enum';

const props = defineProps({
    data: []
})

const store = useStore();

const showPopup = computed(() => store.state.app.showPopup);
const formMode = computed(() => store.state.emulation.formMode);
/**
 * Xác nhận xóa các bản ghi đã chọn
 * CreatedBy VMHieu 06/04/2023
 */
const handleSaveDelete = () => {
    if (formMode.value == Enum.FormMode.Delete) {
        store.dispatch("deleteEmulation", props.data.ID);
    } else if (formMode.value == Enum.FormMode.DeleteMultiple) {
        store.dispatch("deleteMultipleEmulation", props.data.ID);
    }

    store.dispatch('showPopup', false);
    // Hiển thị toast thông báo kết quả
    store.dispatch('showToast', true);
    setTimeout(() => {
        store.dispatch('showToast', false);
    }, 2000);
}
</script>

<style scoped>
.btn {
    display: flex;
}

.btn-error {
    justify-content: center;
}

.btn-warning,
.btn-question {
    justify-content: flex-end;
}

.btn-required {
    justify-content: flex-end;
}

.error-validate{
    padding: 4px 0;
}

.btn-right{
    margin-left: 8px;
}
</style>