<template>
    <div class="">
        <div class="checkbox-input" ref="type">
            <div v-for="(data, index) in dataCheckbox.Data" :key="index" class="checkbox-loop">
                <div>
                    <input 
                        type="checkbox" 
                        :value=data.Value 
                        @input="handleCheckbox"
                        @keyup.enter="checkFocus(index)" 
                        @keydown.enter="checkFocus(index)" 
                        ref="check" 
                        :tabindex=tabindex>
                    <label for="type1" class="checkbox-label">{{ data.Text }}</label>
                </div>
            </div>
        </div>
        <div class="label-error name-error" ref="label" v-show="errorCheckbox">{{ dataCheckbox.ErrorMsg }}</div>
    </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref, watch, defineEmits, toRef, onUnmounted } from "vue";
import { useStore } from 'vuex';

const store = useStore();

const emulation = computed(() => store.state.emulation.emulation);
const showForm = computed(() => store.state.emulation.showForm);

const props = defineProps({
    dataCheckbox: [],
    valueCheckbox: [],
    parentGetValue: {
        type: Boolean,
        default: null,
    },
    tabindex: {
        type: Number,
        default: null,
    }
})

const emit = defineEmits(['getDataCheckbox', 'update:modelValue']);

const check = ref("check");
const label = ref("label");

const messageRef = toRef(props, 'valueCheckbox');

const errorCheckbox = ref(false);
/**
 * Thực hiện kiếm tra checkbox và hiển thị lỗi khi có sự thay đổi checkbox
 * CreatedBy VMHieu 10/05/2023
 */
const handleCheckbox = () => {
    let sumCheck = check.value.length;

    for (let prop in check.value) {
        if (!check.value[prop].checked) {
            sumCheck--;
        } 
    }

    if (sumCheck == 0) {
        errorCheckbox.value = true;
    } else {
        errorCheckbox.value = false;
    }
    getDataCheckbox();
}
/**
 * Nút enter để chọn checkbox
 * CreatedBy VMHieu 10/05/2023
 */
const checkFocus = (index) => {
    check.value[index].checked = !check.value[index].checked;

    handleCheckbox();
}
/**
 * Lấy giá trị của các checkbox
 * CreatedBy VMHieu 10/05/2023
 */
const getDataCheckbox = () => {
    let value = "";
    for (let prop in check.value) {
        if (check.value[prop].checked) {
            value += check.value[prop].value;
        } 
    } 
    emit("update:modelValue", value);
}
/**
 * Đổ dữ liệu có sẵn vào checkbox
 * CreatedBy VMHieu 10/05/2023
 */
const bidingData = () => {
    for (let i=0; i<check.value.length; i++) {
        for (let j=0; j<props.valueCheckbox.length; j++) {
            if (check.value[i].value == props.valueCheckbox[j]) {
                check.value[i].checked = true;
                break;
            } else {
                check.value[i].checked = false;
            }
        }
    }
}

onMounted(() => {
    check.value[0].checked = true;
})
/**
 * Quan sát sự thay đổi của props
 * CreatedBy VMHieu 10/05/2023
 */
watch((props), () => {
    bidingData();
    getDataCheckbox();
})
/**
 * Quan sát sự thay đổi của trạng thái form
 * CreatedBy VMHieu 10/05/2023
 */
watch((showForm), () => {
    if (showForm.value) {
        getDataCheckbox();
    }
})



</script>

<style scoped>
.checkbox-input{
    display: flex;
    align-items: center;
    min-height: 36px;
}

.checkbox-loop{
    flex: 1;
    display: flex;
    align-items: center;
}

.checkbox-loop>div{
    flex: 1;
    display: flex;
    align-items: center;
}

.checkbox-label{
    padding-left: 4px;
    display: inline-block;
    cursor: pointer;
}

.label-error{
    color: #ef5350;
    margin-top: 6px;
    display: block;
}

label:last-child{
    width: max-content;
}
</style>