<template>
    <div @keyup.esc="handleClose" ref="modal" tabindex="0">
        <BasePopup v-if="popupStatus == 1 && showPopup">
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
        <BasePopup v-if="popupStatus == 2 && showPopup">
            <template v-slot:slotTitle>MISA CeGov</template>
            <template v-slot:slotContent>
                <div class="content"> {{ popupMsg }} </div>
            </template>
            <template v-slot:slotButton>
                <div class="btn btn-warning">
                    <BaseButton text="Đóng" class="ms-button btn-red btn-right" @click="handleClose"/>
                </div>
            </template>
        </BasePopup>
        <BasePopup v-if="popupStatus == 3 && showPopup">
            <template v-slot:slotTitle>MISA CeGov</template>
            <template v-slot:slotContent>
                <div v-for="msg in popupMsg" :key="msg">
                    <div class="content"> - {{ msg }}</div>
                </div>
            </template>
            <template v-slot:slotButton>
                <div class="btn btn-warning">
                    <BaseButton text="Đóng" class="ms-button btn-red btn-right" @click="handleClose"/>
                </div>
            </template>
        </BasePopup>
    </div>
</template>

<script setup>
import BasePopup from "@/components/base/Popup/BasePopup.vue";
import BaseButton from "@/components/base/Button/BaseButton.vue";
import { computed, defineProps, onMounted, ref, watch, defineEmits, onUpdated } from "vue";
import { useStore } from "vuex";
import * as Resource from '@/common/Resource/resource';
import * as Enum from '@/common/Enum/enum';

const emit = defineEmits(['deleteSuccess']);

const props = defineProps({
    data: [],
})

const modal = ref("modal");

const store = useStore();

const showPopup = computed(() => store.state.app.showPopup);
const formMode = computed(() => store.state.emulation.formMode);
const popupStatus = computed(() => store.state.app.popupStatus);
const popupMsg = computed(() => store.state.app.popupMsg);
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
    emit("deleteSuccess", props.data.ID);
}
/**
 * Đóng popup
 * CreatedBy VMHieu 06/04/2023
 */
const handleClose = () => {
    store.dispatch('showPopup', false);
    if (popupStatus.value == 1) {
        store.dispatch('showOver');
    }
}

onUpdated(() => {
    modal.value.focus();
})

// watch((popupMsg), () => {
//     props.data.Msg = popupMsg.value;
// })
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