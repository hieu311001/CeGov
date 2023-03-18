<template>
    <div class="form-detail" v-if="showForm">
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
            <div class="form-content">
                <div class="form-name">
                    <label for="" class="name-text m-label">
                        Tên danh hiệu thi đua
                        <span class="asterik">*</span>
                    </label>
                    <div class="form-input name-input">
                        <input type="text" class="m-input" placeholder="Nhập tên danh hiệu thi đua">
                    </div>
                </div>
                <div class="form-code">
                    <div class="code-title">
                        <label for="" class="name-text m-label">
                            Mã danh hiệu
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input code-input">
                            <input type="text" class="m-input" placeholder="Nhập mã danh hiệu">
                        </div>
                    </div>
                    <div class="code-object">
                        <label for="" class="name-text m-label">
                            Đối tượng khen thưởng
                            <span class="asterik">*</span>
                        </label>
                        <div class="checkbox-input">
                            <div>
                                <input type="checkbox">
                                <label for="" class="checkbox-label">Cá nhân</label>
                            </div>
                            <div>
                                <input type="checkbox">
                                <label for="" class="checkbox-label">Tập thể</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-level">
                    <div class="level-title">
                        <label for="" class="level-text m-label">
                            Cấp khen thưởng
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input level-input">
                            <input type="text" class="m-input" placeholder="Chọn hiện vật khen thưởng">
                        </div>
                    </div>
                    <div class="level-type">
                        <label for="" class="type-text m-label">
                            Loại phong trào áp dụng
                            <span class="asterik">*</span>
                        </label>
                        <div class="checkbox-input">
                            <div>
                                <input type="checkbox">
                                <label for="" class="checkbox-label">Thường xuyên</label>
                            </div>
                            <div>
                                <input type="checkbox">
                                <label for="" class="checkbox-label">Theo đợt</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-note">
                    <div class="note-title">
                        <label for="" class="note-text m-label">
                            Ghi chú
                        </label>
                        <div class="note-input">
                            <textarea class="note-area" placeholder="Nhập ghi chú"></textarea>
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
                    <BaseButton class="m-button btn-blue" text="Lưu"></BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '../base/Button/BaseButton.vue';
// import BaseCombobox from '../base/Combobox/BaseCombobox.vue';

export default {
    props: {

    },
    components: {
        BaseButton,
        //BaseCombobox
    },
    data() {
        return {
            showForm: false,       // Ẩn hiện popup
        }
    },
    methods: {
        // Hàm đóng form
        handleCloseForm() {
            this.showForm = false;
            this.emitter.emit("closeAddForm");
        }
    },
    mounted() {
        this.emitter.on("openAddForm", () => {
            this.showForm = true;
        })
    }
}
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

.form-input{
    border-radius: 3.5px;
}
.form-input:hover{
    outline: 1px solid #1a73e8 ;
}

.form-code, .form-level{
    display: flex;
    align-items: center;
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

</style>