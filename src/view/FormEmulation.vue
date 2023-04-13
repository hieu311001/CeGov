<template>
    <div class="form-detail" v-show="showForm" @keyup.esc="handleCloseForm">
        <div class="form-container">
            <div class="form-header">
                <div class="header-text">
                    {{ TitleForm }}
                </div>
                <div class="header-option">
                    <div class="option-help" title="Trợ giúp">
                        <icon class="icon icon-help"></icon>
                    </div>
                    <div class="option-exit form-exit" @click="handleCloseForm" title="Đóng">
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
                            @keyup="autoCode"
                            name="reset" 
                            placeholder="Nhập tên danh hiệu thi đua" 
                            tabindex="1">
                        <div class="label-error name-error">{{ Resource.ValidateError.ErrorName }}</div>
                    </div>
                    
                </div>
                <div class="form-code">
                    <div class="code-title">
                        <label for="" class="name-text m-label">
                            {{ Resource.LabelForm.EmulationCode }}
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input code-input" Required="true">
                            <input type="text" class="m-input" ref="code" name="reset" placeholder="Nhập mã danh hiệu" tabindex="2">
                            <div class="label-error name-error">{{ Resource.ValidateError.ErrorCode }}</div>
                        </div>
                    </div>
                    <div class="code-object" RequiredCheckbox="true">
                        <label for="" class="name-text m-label">
                            {{ Resource.LabelForm.RewardObject }}
                            <span class="asterik">*</span>
                        </label>
                        <div class="checkbox-input" ref="object">
                            <div>
                                <input type="checkbox" checked="true" value="1" id="object1" tabindex="3">
                                <label for="object1" class="checkbox-label">Cá nhân</label>
                            </div>
                            <div>
                                <input type="checkbox" value="2" id="object2" tabindex="4">
                                <label for="object2" class="checkbox-label">Tập thể</label>
                            </div>
                            <div>
                                <input type="checkbox" value="3" id="object3" tabindex="5">
                                <label for="object3" class="checkbox-label">Hộ gia đình</label>
                            </div>
                        </div>
                        <div class="label-error name-error">{{ Resource.ValidateError.ErrorObject }}</div>
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
                                class="combobox" 
                                placeholder="Chọn cấp khen thưởng"  
                                :data=dataCombobox
                                refInput="level"
                                :errorMsg=Resource.ErrorCombobox.ErrorRewardLevel
                                :tabidx="6"
                            />
                            <div class="label-error name-error">{{ Resource.ValidateError.ErrorRewardLevel }}</div>
                        </div>
                    </div>
                    <div class="level-type" RequiredCheckbox="true">
                        <label for="" class="type-text m-label">
                            {{ Resource.LabelForm.TypeMovement }}
                            <span class="asterik">*</span>
                        </label>
                        <div class="checkbox-input" ref="type">
                            <div>
                                <input type="checkbox" checked="true" value="1" id="type1" tabindex="7">
                                <label for="type1" class="checkbox-label">Thường xuyên</label>
                            </div>
                            <div>
                                <input type="checkbox" value="2" id="type2" tabindex="8">
                                <label for="type2" class="checkbox-label">Theo đợt</label>
                            </div>
                        </div>
                        <div class="label-error name-error">{{ Resource.ValidateError.ErrorTypeMovement }}</div>
                    </div>
                </div>
                <div class="form-note">
                    <div class="note-title">
                        <label for="" class="note-text m-label">
                            {{ Resource.LabelForm.Note }}
                        </label>
                        <div class="note-input">
                            <textarea class="note-area" placeholder="Nhập ghi chú" ref="note" tabindex="9"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-status" ref="status" v-show="showStatus">
                    <div class="status-title">
                        <label for="" class="note-text m-label">
                            {{ Resource.LabelForm.Status }}
                        </label>
                        <div class="status-input flex">
                            <div class="status-use flex">
                                <input type="radio" class="use-status" name="status" value="1" checked>
                                <label for="">Sử dụng</label>
                            </div>
                            <div class="status-unuse flex">
                                <input type="radio" class="unuse-status" name="status" value="2">
                                <label for="">Ngừng sử dụng</label>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-footer">
                <div class="btn-close">
                    <BaseButton class="m-button btn-white" text="Hủy" tabindex="10" @click="handleCloseForm"></BaseButton>
                </div>
                <div class="btn-saveadd">
                    <BaseButton class="m-button" text="Lưu & thêm mới" tabindex="11" @click="handleSaveAdd"></BaseButton>
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

const name = ref("name");
const code = ref("code");
const object = ref("object");
const type = ref("type");
const note = ref("note");
const status = ref("status");

const combobox = ref("combobox");
const showForm = computed(() => store.state.emulation.showForm);
const emulation = computed(() => store.state.emulation.emulation);
const rewardlevels = computed(() => store.state.rewardlevel.rewardlevels);
const formMode = computed(() => store.state.emulation.formMode);
const errorMsg = computed(() => store.state.emulation.errorMsg);
const refresh = computed(() => store.state.emulation.refresh);
/**
 * Đóng form thêm mới danh hiệu
 * CreatedBy: VMHieu 21/03/2023
 */
const handleCloseForm = () => {
    store.dispatch('showForm');
    store.dispatch('showOver');
    resetForm();
}
/**
 * Thực hiện reset form sau khi đóng form
 * CreatedBy: VMHieu 21/03/2023
 */
const resetForm = () => {
    // Xóa text input
    form.value.querySelectorAll('input[name="reset"]').forEach(element => {
        element.value = "";
    })
    // Đặt checkbox về mặc định
    form.value.querySelectorAll('input[type="checkbox"]').forEach(element => {
        if (element.value == 1) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })
    // Xóa text area
    form.value.querySelector('textarea').value = "";
    // Xóa thông báo lỗi
    form.value.querySelectorAll(".label-error").forEach(element => {
        element.style.display = "none";
    })
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
            isValid = false;
            error.style.display = "block";
        } else {
            error.style.display = "none";
        }
    });
    // Validate các ô input checkbox
    form.value.querySelectorAll('[RequiredCheckbox]').forEach(element => {
        let input = element.querySelectorAll('input[type="checkbox"]');
        let error = element.querySelector('.label-error');
        let len = input.length;
        let k = 0;
        for (let i = 0; i < len; i++) {
            if (!input[i].checked){
                k++;
            }
        }
        if (k == len) {
            isValid = false;
            error.style.display = "block";
        } else {
            error.style.display = "none";
        }
    })
    let err = form.value.querySelector(".combobox-error").style.display == 'none';
    if (!err) {
        isValid = false;
    }
    return isValid;
}
/**
 * 2. Lấy dữ liệu của emudation đã nhập từ form
 * CreatedBy VMHieu 21/03/2023
 */
const getFormData = () => {
    let emulation = {};

    emulation.EmulationName = name.value.value;
    emulation.EmulationCode = code.value.value;
    emulation.RewardObject = '';
    emulation.TypeMovement = '';
    emulation.Note = note.value.value;
    emulation.RewardLevelCode = getValueEnumBack(combobox.value.querySelector('input').value, "RewardLevel");
    
    let obj = object.value.querySelectorAll('input[type="checkbox"]');
    let enumeration = Enum[Resource.PropName.RewardObject];

    obj.forEach((element) => {
        for (const prop in enumeration) {
            if (element.checked && element.value == enumeration[prop] && enumeration[prop]) {
                emulation.RewardObject += enumeration[prop]; 
            }
        }
    })
    let mov = type.value.querySelectorAll('input[type="checkbox"]');
    enumeration = Enum[Resource.PropName.TypeMovement];

    mov.forEach((element) => {
        for (const prop in enumeration) {
            if (element.checked && element.value == enumeration[prop] && enumeration[prop]) {
                emulation.TypeMovement += enumeration[prop]; 
            }
        }
    })

    if (formMode.value == Enum.FormMode.Edit) {
        status.value.querySelectorAll('input[type="radio"]').forEach(element => {
            if (element.checked) {
                emulation.Status = Number(element.value);
            }
        })
    } else {
        emulation.Status = Enum.Status.Use;
    }

    return emulation;
}
    /**
 * 3.1 Lưu dữ liệu
 * CreatedBy VMHieu 21/03/2023
 */
const handleSave = () => {
    let dataForm = getFormData();

    if (validateForm() == true) {
        if (formMode.value == Enum.FormMode.Add || formMode.value == Enum.FormMode.AddSave) {
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
            store.dispatch('postEmulation', dataForm);
        } else if (formMode.value == Enum.FormMode.Edit) {
            dataForm.EmulationID = emulation.value.EmulationID;
            store.dispatch('putEmulation', dataForm);
        }
        // Thực hiện xong thì chuyển mode về add
        store.dispatch('updateFormMode', Enum.FormMode.AddSave);

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
    name.value.value = emulation.value.EmulationName;
    code.value.value = emulation.value.EmulationCode;
    level.value = emulation.value.RewardLevelName;
    note.value.value = emulation.value.Note;
    // biding các ô input checkbox
    object.value.querySelectorAll('input[type="checkbox"]').forEach(element => {
        if (emulation.value.RewardObject.includes(element.value)) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })
    type.value.querySelectorAll('input[type="checkbox"]').forEach(element => {
        if (emulation.value.TypeMovement.includes(element.value)) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })
    status.value.querySelectorAll('input[type="radio"]').forEach(element => {
        if (emulation.value.Status == Number(element.value)) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })
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
            str = str + arr[i][0];
        }
        code.value.value = str.toUpperCase();
    } else {
        code.value.value = "";
    }
}
/**
 * Theo dõi sự thay đổi của emulation để biding dữ liệu form sửa
 * CreatedBy: VMHieu 28/03/2023
 */
watch(
    emulation, () => {
        bidingData();
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

onMounted(async () => {
    /**
     * Lấy dữ liệu các cấp khen thưởng và biding ra combobox
     * CreatedBy VMHieu 29/03/2023
     */
    try {
        await store.dispatch('getAllRewardLevel');
        rewardlevels.value.forEach((element) => {
            dataCombobox.push(element.RewardLevelName);
        })
    } catch (e) {
        console.log(e);
    }    
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
    width: 600px;
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
    padding: 0 8px;
}
.option-exit{
    padding: 0 0 0 8px;
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
    outline: 1px solid #1a73e8 ;
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