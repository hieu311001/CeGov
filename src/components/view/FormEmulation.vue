<template>
    <div class="form-detail" v-show="showForm" @keyup.esc="handleCloseForm">
        <div class="form-container">
            <div class="form-header">
                <div class="header-text">
                    {{ TitleForm }}
                </div>
                <div class="header-option">
                    <div class="option-help" v-tooltip="'Trợ giúp'" tabindex="16">
                        <icon class="icon icon-help"></icon>
                    </div>
                    <div class="option-exit form-exit" @click="handleCloseForm" v-tooltip="'Đóng'" tabindex="15">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>
            <div class="form-content" ref="form">
                <div class="form-name">
                    <label for="" class="name-text m-label">
                        {{  Resource.LabelForm.EmulationName }}
                        <span class="asterik">*</span>
                    </label>
                    <div class="form-input name-input" Required="true">
                        <input 
                            type="text" 
                            class="m-input" 
                            ref="name"
                            v-model="dataForm.EmulationName" 
                            @keyup="autoCode"
                            name="reset" 
                            placeholder="Nhập tên danh hiệu thi đua" 
                            tabindex="1">
                        <div class="label-error name-error" ref="lberror">{{ Resource.ValidateError.ErrorName }}</div>
                    </div>
                    
                </div>
                <div class="form-code">
                    <div class="code-title">
                        <label for="" class="name-text m-label">
                            {{ Resource.LabelForm.EmulationCode }}
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input code-input" Required="true">
                            <input 
                                type="text" 
                                class="m-input" 
                                ref="code" 
                                v-model="dataForm.EmulationCode"
                                name="reset" 
                                placeholder="Nhập mã danh hiệu" 
                                tabindex="2">
                            <div class="label-error name-error" >{{ Resource.ValidateError.ErrorCode }}</div>
                        </div>
                    </div>
                    <div class="code-object" RequiredCheckbox="true">
                        <label for="" class="name-text m-label">
                            {{ Resource.LabelForm.RewardObject }}
                            <span class="asterik">*</span>
                        </label>
                        <BaseCheckbox 
                            :dataCheckbox=Resource.DataCheckBox.RewardObject
                            :valueCheckbox=dataForm.RewardObject
                            :parentGetValue=getValueCheckbox
                            v-model="dataForm.RewardObject"
                            :tabindex="3"
                        />
                    </div>
                </div>
                <div class="form-level">
                    <div class="level-title">
                        <label for="" class="level-text m-label">
                            {{ Resource.LabelForm.RewardLevelName }}
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input level-input" ref="combobox" Required="true">
                            <BaseCombobox 
                                id="rewardlevel" 
                                placeholder="Chọn cấp khen thưởng"  
                                :data=dataCombobox
                                propText="Data"
                                :propValue=Resource.PropName.RewardLevel
                                refInput="level"
                                :errorMsg=Resource.ErrorCombobox.ErrorRewardLevel
                                :tabidx="6"
                                :resetValue="resetValue"
                                @getValueCombobox="getValueCombobox"
                            />
                            <div class="label-error name-error">{{ Resource.ValidateError.ErrorRewardLevel }}</div>
                        </div>
                    </div>
                    <div class="level-type" RequiredCheckbox="true">
                        <label for="" class="type-text m-label">
                            {{ Resource.LabelForm.TypeMovement }}
                            <span class="asterik">*</span>
                        </label>
                        <BaseCheckbox 
                            :dataCheckbox=Resource.DataCheckBox.TypeMovement
                            :valueCheckbox=dataForm.TypeMovement
                            :parentGetValue=getValueCheckbox
                            v-model="dataForm.TypeMovement"
                            :tabindex="7"
                        />
                    </div>
                </div>
                <div class="form-note">
                    <div class="note-title">
                        <label for="" class="note-text m-label">
                            {{ Resource.LabelForm.Note }}
                        </label>
                        <div class="note-input">
                            <textarea class="note-area" placeholder="Nhập ghi chú" ref="note" v-model="dataForm.Note" tabindex="9"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-status" ref="status" v-if="showStatus">
                    <div class="status-title">
                        <label for="" class="note-text m-label">
                            {{ Resource.LabelForm.Status }}
                        </label>
                        <div class="status-input flex">
                            <div class="status-use flex">
                                <input type="radio" class="use-status" name="status" value="1" v-model="dataForm.Status" checked tabindex="10">
                                <label for="">Sử dụng</label>
                            </div>
                            <div class="status-unuse flex">
                                <input type="radio" class="unuse-status" name="status" value="2" v-model="dataForm.Status" tabindex="11">
                                <label for="">Ngừng sử dụng</label>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-footer">
                <div class="btn-close">
                    <BaseButton class="m-button btn-white" text="Hủy" tabindex="14" @click="handleCloseForm"></BaseButton>
                </div>
                <div class="btn-saveadd">
                    <BaseButton class="m-button" text="Lưu & thêm mới" tabindex="13" @click="handleSaveAdd"></BaseButton>
                </div>
                <div class="btn-save">
                    <BaseButton class="m-button btn-blue" text="Lưu" @click="handleSave" tabindex="12"></BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseButton from '@//components/base/Button/BaseButton.vue';
import BaseCombobox from '@//components/base/Combobox/BaseCombobox';
import BaseCheckbox from '@//components/base/ListCheckBox/BaseCheckBox';
import PopupMessage from './PopupMessage.vue';
import { ref, inject, onMounted, computed, watch, reactive, watchEffect } from 'vue';
import { useStore } from 'vuex';
import * as Resource from '@/common/Resource/resource';
import * as Enum from '@/common/Enum/enum';
import { getValueEnum, getValueEnumBack } from '@/common/common';
const store = useStore();
const form = ref(null); 
var dataCombobox = [];
var dataPopup = [];
const TitleForm = ref("");
const showStatus = ref(false);
const resetValue = ref(true);
const getValueCheckbox = ref(false);

const name = ref("name");
const code = ref("code");
const object = ref("object");
const type = ref("type");
const note = ref("note");
const status = ref("status");
const lberror = ref("lberror");
const inp = ref("input");

let dataForm = reactive({
    EmulationName: "",
    EmulationCode: "",
    RewardObject: "",
    TypeMovement: "",
    RewardLevelCode: "",
    Note: "",
    Status: 1,
})

const combobox = ref("combobox");
const showForm = computed(() => store.state.emulation.showForm);
const emulation = computed(() => store.state.emulation.emulation);
const rewardlevels = computed(() => store.state.rewardlevel.rewardlevels);
const formMode = computed(() => store.state.emulation.formMode);
const formGet = computed(() => store.state.emulation.formGet);
const errorMsg = computed(() => store.state.emulation.errorMsg);
const refresh = computed(() => store.state.emulation.refresh);

const handleCloseForm = () => {
    resetForm();
    store.dispatch('showForm');
    store.dispatch('showOver');
    resetValue.value = !resetValue.value;

}
/**
 * Thực hiện reset form sau khi đóng form
 * CreatedBy: VMHieu 21/03/2023
 */
const resetForm = () => {
    // Xóa text input
    for(let prop in dataForm) {
        dataForm[prop] = "";
    }

    form.value.querySelectorAll('[Required]').forEach(element => {
        let input = element.querySelector('input');
        input.classList.remove("input-error");
    });
    dataForm.RewardObject = [Resource.DataCheckBox.RewardObject.Data[0].Value];
    dataForm.TypeMovement = [Resource.DataCheckBox.TypeMovement.Data[0].Value];
    // Xóa text area
    note.value.value = "";
    // Xóa thông báo lỗi
    form.value.querySelectorAll(".label-error").forEach(element => {
        element.style.display = "none";
    })
}
/**
 * Lấy dữ liệu value từ combobox
 * @param {} value 
 * CreatedBy VMHieu 18/04/2023
 */
const getValueCombobox = (value) => {
    if (value) {
        dataForm.RewardLevelCode = value.Code.trim();
    }
}
/**
 * 1. Validate dữ liệu trước khi gửi lên server
 * CreatedBy VMHieu 21/03/2023
 */
const validateForm = () => {
    // validate trường bắt buộc nhập
    let isValid = true;
    // Validate các ô input text
    form.value.querySelectorAll('[Required]').forEach(element => {
        let input = element.querySelector('input');
        let error = element.querySelector('.label-error');
        if (!input.value) {
            if (isValid) {
                input.focus();
            }
            isValid = false;
            error.style.display = "block";
            input.classList.add('input-error');
        } else {
            error.style.display = "none";
            input.classList.remove('input-error');
        }
    });

    if (dataForm.RewardObject == "" || dataForm.TypeMovement == "") {
        isValid = false;
    }

    return isValid;
}
/**
 * 2. Lấy dữ liệu của emudation đã nhập từ form
 * CreatedBy VMHieu 21/03/2023
 */
const getFormData = () => {    
    if (formMode.value == Enum.FormMode.Edit) {
        dataForm.Status = Number(dataForm.Status);
    } else {
        dataForm.Status = Enum.Status.Use;
    }

    return dataForm;
}
    /**
 * 3.1 Lưu dữ liệu
 * CreatedBy VMHieu 21/03/2023
 */
const handleSave = () => {
    getValueCheckbox.value = !getValueCheckbox.value;
    let dataForm = getFormData();

    if (validateForm() == true) {
        if (formMode.value == Enum.FormMode.Add || formMode.value == Enum.FormMode.AddSave) {
            store.dispatch('updateFormMode', Enum.FormMode.Add);
            dataForm.EmulationID = emulation.value.EmulationID;
            store.dispatch('postEmulation', dataForm);
        } else if (formMode.value == Enum.FormMode.Edit) {
            dataForm.EmulationID = emulation.value.EmulationID;
            store.dispatch('putEmulation', dataForm);
        }
    }
}
/**
 * 3.2 Lưu và thêm mới dữ liệu
 * CreatedBy VMHieu 21/03/2023
 */
 const handleSaveAdd = () => {
    let dataForm = getFormData();
    if (validateForm() == true) {
        if (formMode.value == Enum.FormMode.Add || formMode.value == Enum.FormMode.AddSave) {
            dataForm.EmulationID = emulation.value.EmulationID;
            store.dispatch('postEmulation', dataForm);
        } else if (formMode.value == Enum.FormMode.Edit) {
            dataForm.EmulationID = emulation.value.EmulationID;
            store.dispatch('putEmulation', dataForm);
        }
        // Thực hiện xong thì chuyển mode về add
        store.dispatch('updateFormMode', Enum.FormMode.AddSave);

        resetValue.value = !resetValue.value;

        name.value.focus();
    }
    
}
/**
 * Thực hiện biding data ra form sửa
 * CreatedBy: VMHieu 21/03/2023
 */
const bidingData = () => {
    let level = combobox.value.querySelector('input');
    // biding các ô input text
    dataForm.EmulationName = emulation.value.EmulationName;
    dataForm.EmulationCode = emulation.value.EmulationCode;
    level.value = emulation.value.RewardLevelName;
    dataForm.RewardLevelCode = emulation.value.RewardLevelCode;
    dataForm.Note = emulation.value.Note;
    dataForm.Status = emulation.value.Status;

    dataForm.RewardObject = emulation.value.RewardObject.split("");
    dataForm.TypeMovement = emulation.value.TypeMovement.split("");
}
/**
 * Tự động sinh mã danh hiệu thi đua
 * @param {} event 
 * CreatedBy VMHieu 04/04/2023
 */
const autoCode = (event) => {
    if (formMode.value == Enum.FormMode.Edit) {
        event.preventDefault();
        return;
    }
    let value = event.currentTarget.value;
    let arr = value.trim().split(' ');
    let str = "";
    if(value) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                str = str + arr[i][0];
            }
        }
        dataForm.EmulationCode = str.toUpperCase();
    } else {
        dataForm.EmulationCode = "";
    }
}
/**
 * Theo dõi sự thay đổi của emulation để biding dữ liệu form sửa
 * CreatedBy: VMHieu 28/03/2023
 */
watch(
    emulation, () => {
        if (formGet.value == Enum.GetEmulationForm.Edit) {
            bidingData();
        }
    }
)
/**
 * Theo dõi sự kiện mở form để đặt focus vào ô input đầu tiên 
 * CreatedBy VMHieu 30/03/2023
 */
watch(
    showForm, () => {
        setTimeout(() => {
            name.value.focus();
        }, 10);
    }
)
/**
 * Theo dõi formMode để thay đổi tiêu đề 
 * CreatedBy VMHieu 30/03/2023
 */
watch((formMode), () => {
    if (formMode.value == Enum.FormMode.Edit) {
        TitleForm.value = Resource.LabelForm.TitleEdit;
        showStatus.value = true;
    } else {
        TitleForm.value = Resource.LabelForm.TitleAdd;
        showStatus.value = false;
    }
})

/**
 * Quan sát errorMsg để hiển thị popup cảnh báo
 * CreatedBy VMHieu 06/04/2023
 */
watch((errorMsg), () => {
    store.dispatch("showPopup", true);
    dataPopup.Msg = errorMsg.value;
})

/**
 * Quan sát state refresh để resetForm
 * CreatedBy VMHieu 06/04/2023
 */
watch((refresh), () => {
    resetForm();
})
/**
 * Lấy dữ liệu của rewardlevel biding ra combobox
 * CreatedBy VMHieu 10/05/2023
 */
watch((rewardlevels), () => {
    rewardlevels.value.forEach((element) => {
        let obj = {
            Data: element.RewardLevelName,
            Code: element.RewardLevelCode
        }
        dataCombobox.push(obj);
    }) 
})

onMounted(() => {
    /**
     * Lấy dữ liệu các cấp khen thưởng và biding ra combobox
     * CreatedBy VMHieu 29/03/2023
     */
    store.dispatch('getAllRewardLevel');

    /**
     * Gán sự kiện ấn enter để chọn checkbox
     * CreatedBy VMHieu 30/03/2023
     */
    form.value.querySelectorAll('input[type="checkbox"]').forEach((element) => {
        element.addEventListener('keypress', function(event) {
            if (event.which === 13) {
            this.checked = !this.checked;
            }
        })
    })
})
</script>

<style scoped>
.form-detail{
    position: fixed;
    background-color: #fff;
    z-index: 9999;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    width: 640px;
    resize: both;
    border-radius: 4px;
    transition: all 1s;
}
.form-container{
    position: relative;
    height: 100%;
}
.form-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 24px 6px 24px;
}
.header-text{
    font-size: 20px;
    font-weight: 700;
    min-height: 24px;
}
.header-option{
    display: flex;
    align-items: center;
}
.option-help{
    cursor: pointer;
    margin: 0 8px;
}
.option-exit{
    margin: 0 0 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.option-exit icon{
    min-height: 20px;
    min-width: 20px;
    height: 20px;
    width: 20px;
}
.form-content{
    padding: 24px 24px 0;
    display: flex;
    flex-direction: column ;
}
.form-content>div{
    margin-bottom: 16px;
}
/* .form-name{
    margin-bottom: 16px;
} */
.form-input>input{
    border-radius: 3.5px;
}
.form-input>input:hover{
    border: 1px solid #1a73e8 ;
}
.form-code, .form-level{
    display: flex;
    justify-content: center;
}
.form-code>div, .form-level>div{
    flex: 1;
    margin-right: 10px;
}
.checkbox-input{
    display: flex;
    align-items: center;
    min-height: 36px;
}

.checkbox-input>div{
    flex: 1;
    display: flex;
    align-items: center;
}
#label-long{
    width: max-content;
}
.checkbox-label{
    padding-left: 4px;
    display: inline-block;
    cursor: pointer;
}
.form-note{
    margin-bottom: 20px;
}
.note-input{
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 3.5px;
    display: flex;
}
.note-area{
    border: none;
    padding: 6px 12px;
    resize: none;
    background: transparent;
    width: 100%;
    height: 76px;
    border-radius: 3.5px;
    font-family: GoogleSans;
    font-size: 14px;
}
.note-area:hover{
    outline: 1px solid #1a73e8 ;
}
.note-area:focus-within{
    outline: 1px solid #1a73e8 ;
}
.form-footer{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 12px 24px;
    border-top: 1px solid #e0e0e0;
}
.btn-close, .btn-saveadd{
    margin-right: 10px;
}
.btn-saveadd>button{
    border: 1px solid #2979ff;
    color: #2979ff;
}
.btn-saveadd>button:hover{
    background: #f4f5f8;
    color: #2979ff;
}
.btn-saveadd>button:focus{
    background: #0062cc;
    color: #fff!important;
}
.label-error{
    color: #ef5350;
    margin-top: 6px;
    display: none;
}

.status-input input{
    margin: 0 4px 0 0;
    cursor: pointer;
    color: #0062cc;
}

.status-input label {
    padding-left: 4px;
    margin-bottom: 3px;
    padding-bottom: 0;
    display: inline-block;
    color: #000;
    font-weight: 400;
}

.status-use{
    margin-right: 20px;
}
</style>