<template>
    <div class="import-container" v-if="showImport" ref="ipexcel">
        <div class="import-header flex">
            <div class="import-header__title">
                Nhập khẩu
            </div>
            <div class="import-header__close" v-tooltip="'Đóng'" @click="handleCloseImport">
                <icon class="icon icon-exit"></icon>
            </div>
        </div>
        <div class="import-content">
            <div class="status-bar flex">
                <div class="status-start flex status-process">
                    <input type="radio" checked="true">
                    <label class="">Chọn tệp nhập khẩu</label>
                </div>
                <div class="status-mid">-----------------------</div>
                <div class="status-end flex status-notprocess">
                    <input type="radio" checked="true" ref="rcheck">
                    <label class="">Nhập khẩu</label>
                </div>
            </div>
            <div class="content-box" v-show="!showFormCheck">
                <div class="ip-import" 
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="drop">
                    <div class="import-box">
                        <label for="upload-file" v-show="!showFile">
                            <div class="file-default" >
                                <div class="upload-icon">
                                    <icon class="icon icon-import"></icon>
                                </div>
                                <div class="upload-text text-center">
                                    Kéo thả tệp vào đây hoặc nhấn để chọn tệp
                                </div>
                                <div class="upload-text text-center">
                                    Hỗ trợ định dạng *.xls, *.xlsx và kích thước tối đa 5MB
                                </div>
                            </div>
                        </label>
                        <div class="file-upload" v-show="showFile">
                            <div class="row-file flex">
                                <div class="file-icon">
                                    <icon class="icon icon-file"></icon>
                                </div>
                                <div class="file-name">
                                    {{ file.FileName }}
                                </div>
                                <div class="file-size">
                                    {{ file.FileSize }} MB
                                </div>
                                <div class="file-status">
                                    <div class="file-success flex" v-show="fileSuccess">
                                        <div class="success-icon">
                                            <icon class="icon icon-success"></icon>
                                        </div>
                                        <div class="success-text">Hợp lệ</div>
                                    </div>
                                    <div class="file-fail flex" v-show="!fileSuccess">
                                        <div class="fail-icon">
                                            <icon class="icon icon-fail"></icon>
                                        </div>
                                        <div class="fail-text">Không hợp lệ</div>
                                    </div>
                                </div>
                                <div class="file-change">
                                    <label for="upload-file">Đổi tệp khác</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="file" id="upload-file" ref="upload" @input="handleUploadFile" accept=".xls, .xlsx">
                </div>
                <div class="import-option" v-if="showFile">
                    <div class="import-sheet">
                        <label for="" class="name-text m-label">
                            Sheet nhập khẩu
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input code-input" Required="true">
                            <input type="text" class="m-input" name="reset" placeholder="Sheet 1" tabindex="2">
                        </div>
                    </div>
                    <div class="import-line">
                        <label for="" class="name-text m-label">
                            Dòng tiêu đề
                            <span class="asterik">*</span>
                        </label>
                        <div class="form-input code-input" Required="true">
                            <input type="text" class="m-input" name="reset" placeholder="3" tabindex="2">
                        </div>
                    </div>
                </div>
            </div>
            <div class="check-form" v-if="showFormCheck">
                <div class="check-container">
                    <div class="check-result  result-total">
                        <div class="result-text center">
                            Số bản ghi
                        </div>
                        <div class="result-number center">
                            {{ resultCheckFile.Total || 0 }}
                        </div>
                    </div>
                    <div class="check-result result-success">
                        <div class="result-text center">
                            Hợp lệ
                        </div>
                        <div class="result-number center">
                            {{ resultCheckFile.TotalSuccess || 0 }}
                        </div>
                    </div>
                    <div class="check-result result-fail">
                        <div class="result-text center">
                            Không hợp lệ
                        </div>
                        <div class="result-number center">
                            {{ resultCheckFile.TotalFail || 0}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="import-footer flex">
            <div class="footer-left">
                <BaseButton text="Tải tệp mẫu" class="m-button btn-whiteblue" @click="downloadFileSample" v-show="!showFormCheck"></BaseButton>
                <BaseButton text="Tải tệp đầy đủ" class="m-button btn-whiteblue" @click="downloadFileCheck(true)" v-show="showFormCheck"></BaseButton>
                <BaseButton text="Tải tệp lỗi" class="m-button btn-whiteblue" @click="downloadFileCheck(false)" v-show="showFormCheck"></BaseButton>
            </div>
            <div class="footer-right">
                <BaseButton text="Hủy" class="m-button btn-white btn-left" @click="handleCloseImport"></BaseButton>
                <BaseButton text="Quay lại" class="m-button btn-white btn-left" v-show="showFormCheck" @click="backPrev"></BaseButton>
                <BaseButton text="Tiếp tục" class="m-button btn-blue btn-continue" v-show="!showFormCheck" @click="openFormCheck" disabled="true"></BaseButton>
                <BaseButton text="Nhập khẩu" class="m-button btn-blue" v-show="showFormCheck" @click="handleImport"></BaseButton>
            </div>
        </div>
        <div id="loading" v-show="excelLoading"></div>
        <div id="over" v-show="excelOver"></div>
    </div>
</template>

<script setup>
import BaseButton from '@/components/base/Button/BaseButton.vue';
import { computed, onMounted, reactive, ref, watch, defineEmits } from 'vue';
import { useStore } from 'vuex';
import * as Enum from '@/common/Enum/enum';
import * as Resource from '@/common/Resource/resource';

const store = useStore();
const emit = defineEmits(['deleteSuccess']);

const ipexcel = ref("ipexcel");
const upload = ref("upload");
const rcheck = ref("rcheck");
const showFile = ref(false);
const fileSuccess = ref(false);
const showFormCheck = ref(false);
const file = reactive({
    FileSize: "",
    FileName: "",
})

const excelLoading = ref(false);
const excelOver = ref(false);

const fileUpload = ref();

const showImport = computed(() => store.state.emulation.showImport);
const resultCheckFile = computed(() => store.state.emulation.resultCheckFile);
/**
 * Thực hiện upload File
 * CreatedBy VMHieu 14/04/2023
 */
const handleUploadFile = () => {
    const files = upload.value.files[0];
    const btnContinue = ipexcel.value.querySelector(".btn-continue");
    const ipImport = ipexcel.value.querySelector('.ip-import');

    if (files) {
        showFile.value = true;

        file.FileSize = (files.size/1024/1024).toFixed(3);
        file.FileName = files.name;

        var extension = files.name.split('.').pop().toLowerCase();
        if (Resource.FileFormat.includes(extension)) {
            fileSuccess.value = true;
            // Xét hiệu ứng và undisabled nút tiếp tục
            btnContinue.style.opacity = 1;
            btnContinue.style.cursor = "pointer";
            btnContinue.disabled = false;
        } else {
            fileSuccess.value = false;
            //Xét hiệu ứng và disabled nút tiếp tục
            btnContinue.style.opacity = 0.4;
            btnContinue.style.cursor = "auto";
            btnContinue.disabled = true;
        }   
        // Set border khi chọn được file
        ipImport.classList.add("import-success");
        ipImport.style.height = `${285}px`
    } else {
        ipImport.style.height = `${360}px`
    }
}
/**
 * Thực hiện đóng form import
 * CreatedBy VMHieu 14/04/2023
 */
const handleCloseImport = () => {
    store.dispatch('showImport');
    store.dispatch('showOver');
    showFile.value = false;
    showFormCheck.value = false;
    upload.value.files = null;
}
/**
 * Mở form check bản ghi sau khi ấn nút tiếp tục
 * CreatedBy VMHieu 15/04/2023
 */
const openFormCheck = () => {
    let me = ipexcel.value
    const fileExcel = upload.value.files[0];
    var formData = new FormData();
    formData.append("excelFile", fileExcel);

    store.dispatch("checkFile", formData);
    //showFormCheck.value = true;
    excelOver.value = true;
    excelLoading.value = true;
}
/**
 * Ấn nút quay lại form xem file
 * CreatedBy VMHieu 15/04/2023
 */
const backPrev = () => {
    showFormCheck.value = false;
    handleUploadFile();
}
/**
 * Thực hiện tải file mẫu
 * CreatedBy VMHieu 20/04/2023
 */
const downloadFileSample = () => {
    store.dispatch("downloadFileSample");
}
/**
 * Thực hiện tải file mẫu check
 * Value: true - file đầy đủ, false - file lỗi
 * CreatedBy VMHieu 28/04/2023
 */
const downloadFileCheck = (value) => {
    if (value) {
        store.dispatch("downloadFileCheck", true);
    } else {
        if (resultCheckFile.value.TotalFail !== 0) {
            store.dispatch("downloadFileCheck", false);
        } else {
            store.dispatch("showPopup", true);
            store.dispatch("updatePopupStatus", Enum.PopupStatus.Error);
            store.dispatch("updatePopupMsg", Resource.PopupMessage.NotValidFileFali);
        }
    }
}
/**
 * Thực hiện import các bản ghi hợp lệ
 * CreatedBy VMHieu 20/04/2023
 */
const handleImport = () => {
    if (resultCheckFile.value.TotalSuccess > 0){
        store.dispatch("importExcel");
        // import thành công thì tắt form và reset form 
        showFile.value = false;
        showFormCheck.value = false;
        upload.value.files = null;
    } else {
        store.dispatch("showPopup", true);
        store.dispatch("updatePopupStatus", Enum.PopupStatus.Error);
        store.dispatch("updatePopupMsg", Resource.PopupMessage.NotValidFileSuccess);
    }
}
/**
 * Sự kiện drag file
 * CreatedBy VMHieu 21/04/2023
 */
const dragover = (e) => {
    e.preventDefault();
}
/**
 * Sự kiện dropfile
 * @param {*} e
 * CreatedBy VMHieu 21/04/2023 
 */
const drop = (e) => {
    e.preventDefault();
    upload.value.files = e.dataTransfer.files;
    handleUploadFile();
}
/**
 * Xem sự thay đổi của kết quả check file để hiển thị
 * CreatedBy VMHieu 25/04/2023
 */
watch((resultCheckFile), () => {
    showFormCheck.value = true;
    excelOver.value = false;
    excelLoading.value = false;
})
/**
 * Xem sự thay đổi của form check để disabled nút input radio nhập khẩu
 * CreatedBy VMHieu 28/04/2023
 */
watch((showFormCheck), () => {
    if (showFormCheck.value) {
        rcheck.value.style.cursor = "pointer";
        rcheck.value.style.opacity = '1';
        rcheck.value.style.color = '#2979ff';
    } else {
        rcheck.value.style.cursor = "not-allowed";
        rcheck.value.style.opacity = '0.4';
    }
})


</script>

<style scoped>
.import-container{
    position: fixed;
    background-color: #fff;
    z-index: 9999;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    width: 700px;
    resize: both;
    border-radius: 4px;
    box-shadow: 0 0 16px rgba(23,27,42,.24);
    transition: all 1s;
}

.import-header{
    justify-content: space-between;
    padding: 24px 24px 6px 24px;
}

.import-header__title{
    font-size: 20px;
    font-weight: 700;
    min-height: 24px;
}

.import-content{
    padding: 24px 24px 0;
}

.status-bar{
    justify-content:center;
}

.status-mid{
    margin: 0 8px;
}

.status-bar input[type="radio"]{
    margin: 0 4px 0 0;
}

.status-end>input{
    cursor: not-allowed;
}
.ip-import{
    border: 1px dashed #000;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    margin: 24px 0;
    position: relative;
}

.ip-import:hover{
    border: 1px dashed #2979ff;
}

.import-box{
    width: 100%;
    height: 360px;
}

.ip-import label{
    width: 100%;
    height: 100%;
    display: inline-block;
    cursor: pointer;
}

.ip-import label>div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 360px;
}

#upload-file{
   opacity: 0;
   position: absolute;
   z-index: -1;
}

.upload-icon{
    margin-bottom: 12px;
}

.upload-icon icon{
    margin: auto;
}

.upload-text:nth-child(3) {
    opacity: 0.8;
}

.import-footer{
    border-top: 1px solid #e0e0e0;
    padding: 12px 24px;
    justify-content: space-between;
}

.footer-right .btn-left{
    margin-right: 12px;
}

.file-change label{
    cursor: pointer;
    color: #2979ff;

}
.row-file{
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
}

.row-file>div{
    margin-left: 12px;
}

.file-status{
    padding: 0 20px 0 12px;
    margin-right: 12px;
}

.file-status icon{
    margin-right: 4px;
}

.file-name{
    width: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.import-success{
    border: 1px solid #e0e0e0;
}

.status-process{
    color: #2979ff;
    font-weight: 700;
}

.status-notprocess>input{
    color: #000;
    font-weight: 500;
    opacity: 0.2;
}

.status-mid{
    color: #2979ff;
}

.import-option{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.import-sheet, .import-line{
    flex: 1;
}

.import-sheet{
    margin-right: 12px;
}

.btn-continue{
    opacity: 0.4;
    cursor: none;
}

.check-form{
    height: 360px;
}

.check-container{
    display: flex;
    justify-content: center;
    height: 100%;
    margin-top:48px;
}

.check-result{
    flex: 1;
    border-radius:4px;
    width: 33%;
    height: 40%;
    color: #fff;
}

.check-result .result-text {
    width: 100%;
    height: 32px;
    margin: 20px 0 0 0;
}   

.check-result .result-number {
    width: 100%;
    height: calc(100% - 52px);
}   

.result-total{
    border: 1px solid #000;
}

.result-total>.result-text{
    background: #000;
}

.result-total>.result-number{
    color: #000;
    font-size: 40px;
    font-weight: 1000;
}

.result-success{
    margin: 0 24px;
    border: 1px solid #2979ff;
}

.result-success>.result-text{
    background: #2979ff;
}

.result-success>.result-number{
    color: #2979ff;
    font-size: 40px;
    font-weight: 1000;
}

.result-fail{
    border: 1px solid #ef5350;
}

.result-fail>.result-text{
    background: #ef5350;
}

.result-fail>.result-number{
    color: #ef5350;
    font-size: 40px;
    font-weight: 1000;
}

.footer-left button{
    margin-right: 8px;
}
</style>