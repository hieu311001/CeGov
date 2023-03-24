<template>
    <div class="form-detail" v-show="showForm">
        <div class="form-container">
            <div class="form-header">
                <div class="header-text">
                    Thêm danh hiệu thi đua
                </div>
                <div class="header-option">
                    <div class="option-help">
                        <icon class="icon icon-help"></icon>
                    </div>
                    <div class="option-exit form-exit" @click="handleCloseForm">
                        <icon class="icon icon-exit"></icon>
                    </div>
                </div>
            </div>
            <div class="form-content" ref="form">
                <div class="form-name">
                    <label for="" class="name-text m-label">
                        Tên danh hiệu thi đua
                        <span class="asterik">*</span>
                    </label>
                    <div class="form-input name-input" Required="true">
                        <input type="text" class="m-input" ref="name" placeholder="Nhập tên danh hiệu thi đua" >
                        <div class="label-error name-error">Tên danh hiệu thi đua không được để trống.</div>
                    </div>
                    
                </div>
                <div class="form-code">
                    <div class="code-title">
                        <label for="" class="name-text m-label">
                            Mã danh hiệu
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input code-input" Required="true">
                            <input type="text" class="m-input" ref="code" placeholder="Nhập mã danh hiệu">
                            <div class="label-error name-error">Mã danh hiệu không được để trống.</div>
                        </div>
                    </div>
                    <div class="code-object" RequiredCheckbox="true">
                        <label for="" class="name-text m-label">
                            Đối tượng khen thưởng
                            <span class="asterik">*</span>
                        </label>
                        <div class="checkbox-input" ref="object">
                            <div>
                                <input type="checkbox" checked="true" value="1">
                                <label for="" class="checkbox-label">Cá nhân</label>
                            </div>
                            <div>
                                <input type="checkbox" value="2">
                                <label for="" class="checkbox-label">Tập thể</label>
                            </div>
                            <div>
                                <input type="checkbox" value="4">
                                <label for="" class="checkbox-label">Hộ gia đình</label>
                            </div>
                        </div>
                        <div class="label-error name-error">Đối tượng khen thưởng không được để trống.</div>
                    </div>
                </div>
                <div class="form-level">
                    <div class="level-title">
                        <label for="" class="level-text m-label">
                            Cấp khen thưởng
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input level-input" Required="true">
                            <input type="text" class="m-input" placeholder="Chọn hiện vật khen thưởng" ref="level">
                            <div class="label-error name-error">Cấp khen thưởng không được để trống.</div>
                        </div>
                    </div>
                    <div class="level-type" RequiredCheckbox="true">
                        <label for="" class="type-text m-label">
                            Loại phong trào áp dụng
                            <span class="asterik">*</span>
                        </label>
                        <div class="checkbox-input" ref="type">
                            <div>
                                <input type="checkbox" checked="true" value="1">
                                <label for="" class="checkbox-label">Thường xuyên</label>
                            </div>
                            <div>
                                <input type="checkbox" value="2">
                                <label for="" class="checkbox-label">Theo đợt</label>
                            </div>
                        </div>
                        <div class="label-error name-error">Loại phong trào không được để trống.</div>
                    </div>
                </div>
                <div class="form-note">
                    <div class="note-title">
                        <label for="" class="note-text m-label">
                            Ghi chú
                        </label>
                        <div class="note-input">
                            <textarea class="note-area" placeholder="Nhập ghi chú" ref="note"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-footer">
                <div class="btn-close">
                    <BaseButton class="m-button btn-white" text="Hủy"></BaseButton>
                </div>
                <div class="btn-saveadd">
                    <BaseButton class="m-button" text="Lưu & thêm mới"></BaseButton>
                </div>
                <div class="btn-save">
                    <BaseButton class="m-button btn-blue" text="Lưu" @click="handleSave"></BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '@//components/base/Button/BaseButton.vue';
// import BaseCombobox from '../base/Combobox/BaseCombobox.vue';
import { defineComponent , ref, inject, onMounted } from 'vue';
import { getByID } from '@/common/API/emulationAPI';

export default defineComponent ({
    components: {
        BaseButton
    },
    setup() {
        const emitter = inject('emitter');
        const form = ref(null);

        var showForm = ref(false);
        const name = ref("name");
        const code = ref("code");
        const object = ref("object");
        const level = ref("level");
        const type = ref("type");
        const note = ref("note");


        /**
         * Đóng form thêm mới danh hiệu
         * CreatedBy: VMHieu 21/03/2023
         */
        const handleCloseForm = () => {
            showForm.value = false;
            emitter.emit("closeForm");
            resetForm();
        }

        /**
         * Thực hiện reset form sau khi đóng form
         */
        const resetForm = () => {
            // Xóa text input
            form.value.querySelectorAll('input[type="text"]').forEach(element => {
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

                if (input.value == "") {
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
                    if (input[i].checked == false){
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
            return isValid;
        }

        /**
         * 2. Lấy dữ liệu của emudation đã nhập từ form
         * CreatedBy VMHieu 21/03/2023
         */

         /**
         * 3.1 Lưu dữ liệu
         * CreatedBy VMHieu 21/03/2023
         */
        const handleSave = () => {
            if (validateForm() == true) {
                showForm.value = false;
            }
        }
        /**
         * 3.2 Lưu và thêm mới dữ liệu
         * CreatedBy VMHieu 21/03/2023
         */

        /**
         * Thực hiện biding data ra form sửa
         */
        const bidingData = (data) => {
            name.value.value = data.EmulationName;
            code.value.value = data.EmulationCode;
            level.value.value = data.RewardLevelName;
            note.value.value = data.Note;

            object.value.querySelectorAll('input[type="checkbox"]').forEach(element => {
                if (element.value == data.RewardObject && data.RewardObject != 3) {
                    element.checked = true;
                } else if (data.RewardObject == 3) {
                    if (element.value == 1 || element.value == 2) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                } 
                else {
                    element.checked = false;
                }
            })

            type.value.querySelectorAll('input[type="checkbox"]').forEach(element => {
                if (element.value == data.TypeMovement) {
                    element.checked = true;
                } 
                else {
                    element.checked = false;
                }
            })
            
            showForm.value = true;
        }

        onMounted(() => {
            /**
             * Mở form thêm mới danh hiệu
             * CreatedBy: VMHieu 21/03/2023
             */
            emitter.on('openAddForm', () => {
                showForm.value = true;
            })

            /**
             * Mở form sửa danh hiệu thi đua
             * CreatedBy: VMHieu 24/03/2023
             */
            emitter.on('openEditForm', async (id) => {
                let emulation = await getByID(id);
                // Thực hiện biding dữ liệu vào form
                bidingData(emulation);
            })
        });

        return {
            form,
            showForm,
            name,
            code,
            level,
            object,
            type,
            note,
            handleCloseForm,
            validateForm,
            handleSave,
            bidingData,
            resetForm
        }
    }
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

</style>