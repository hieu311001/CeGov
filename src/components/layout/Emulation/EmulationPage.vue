<template>
<div>
    <div class="content">
        <div class="content-container">
            <div class="form-list">
                <div class="form-title">
                    <div class="form-title__text">Danh hiệu thi đua</div>
                </div>
                <div class="form-toolbar">
                    <div class="toolbar-left">
                        <div class="ms-input filter-input">
                            <input id="input-search" type="text" placeholder="Nhập mã hoặc tên danh hiệu..." class="input-search">
                            <div class="input-search__icon"></div>
                        </div>
                        <div class="filter">
                            <BaseButtonIcon class="ms-button btn-white" text="Bộ lọc" @click="handleToggleFilter">
                                <div class="add-icon">
                                    <icon class="icon icon-filter"></icon>
                                </div>
                            </BaseButtonIcon>
                            <div class="form-filter" v-if="showFormFilter">
                                <span class="filter-arrow"></span>
                                <div class="filter-container">
                                    <div class="filter-header">
                                        <div class="filter-header__text">
                                            Lọc danh hiệu
                                        </div>
                                        <div class="filter-header__icon">
                                            <icon class="icon icon-exit" @click="handleToggleFilter"></icon>
                                        </div>
                                    </div>
                                    <div class="filter-main">
                                        <div class="filter-object">
                                            <label class="m-label">Đối tượng khen thưởng</label>
                                            <div class="filter-object__input">
                                                <input type="text" class="m-input">
                                            </div>
                                        </div>
                                        <div class="filter-level">
                                            <label class="m-label">Cấp khen thưởng</label>
                                            <div class="filter-level__input">
                                                <input type="text" class="m-input">
                                            </div>
                                        </div>
                                        <div class="filter-type">
                                            <label class="m-label">Loại phong trào</label>
                                            <div class="filter-type__input">
                                                <input type="text" class="m-input">
                                            </div>
                                        </div>
                                        <div class="filter-status">
                                            <label class="m-label">Trạng thái</label>
                                            <div class="filter-status__input">
                                                <input type="text" class="m-input">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="filter-footer">
                                        <div class="filter-btn__close">
                                            <BaseButton class="m-button btn-white" text="Hủy"></BaseButton>
                                        </div>
                                        <div class="filter-btn__save">
                                            <BaseButton class="m-button btn-blue" text="Áp dụng"></BaseButton>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <BaseButtonIcon class="ms-button btn-blue" text="Thêm danh hiệu" @click="handleOpenForm">
                            <div class="add-icon">
                                <icon class="icon icon-add"></icon>
                            </div>
                        </BaseButtonIcon>
                    </div>
                </div>
                <div class="form-content">
                    <div class="form-content__container">
                        <div class="content-table">
                            <table id="emulation-table">
                                <thead>
                                    <tr>
                                        <th class="checkbox checkboxAll">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </th>
                                        <th style="min-width: 280px;">Tên danh hiệu thi đua</th>
                                        <th>Mã danh hiệu</th>
                                        <th>Đối tượng khen thưởng</th>
                                        <th>Cấp khen thưởng</th>
                                        <th>Loại phong trào</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="selectedRows">
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <!-- <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr>
                                    <tr>
                                        <td class="checkbox">
                                            <div class="ip-checkbox">
                                                <input type="checkbox" class="input__checkbox" id="checkboxAll">
                                            </div>
                                        </td>
                                        <td>Lao động tiên tiến</td>
                                        <td>LĐTTCX</td>
                                        <td>Cá nhân</td>
                                        <td>Cấp xã/tương đương</td>
                                        <td>Thường xuyên</td>
                                        <td>Sử dụng</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="content-page">
                        <div class="page-left">
                            <div class="page-left__content">
                                Tổng số: <strong>11</strong> bản ghi
                            </div>
                        </div>
                        <div class="page-right">
                            <span>Số bản ghi/trang:</span>
                            <div class="page-size">
                                <div class="combobox-pagesize">
                                    <select name="" id="">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div class="page-fromto">
                                <strong>1</strong> - <strong>11</strong> bản ghi
                            </div>
                            <div class="page-move">
                                <div class="move-prev"></div>
                                <div class="move-next"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FormEmulation />
    <div id="over" v-show="showOver"></div>
</div>
</template>

<script>
import BaseButtonIcon from '../../base/Button/BaseButtonIcon.vue';
import BaseButton from '../../base/Button/BaseButton.vue';
import FormEmulation from '../../view/FormEmulation.vue';

export default {
    name: 'TheContent',
    props: {

    },
    components: {
        BaseButtonIcon,
        FormEmulation,
        BaseButton     
    },
    data() {
        return {
            showOver: false,        // Hiệu ứng tối màn hình
            showFormFilter: false, //Ẩn hiện form lọc dữ liệu
        }
    },
    methods: {
        // Thực hiện mở form thêm danh hiệu
        handleOpenForm() {
            this.showOver = true;
            this.emitter.emit("openAddForm");
        },
        // Toggle form filter
        handleToggleFilter() {
            this.showFormFilter = !this.showFormFilter;
        },
        selectedRows() {
            
        }
    },
    mounted() {
        this.emitter.on("closeAddForm", () => {
            this.showOver = false;
        })
    }
}
</script>

<style scoped>
.content{
    transition: padding .2s;
    height: calc(100vh - 56px);
    display: flex;
    flex-direction: column ;
}
.content-container{
    padding: 16px;
    min-width: 500px;
    min-height: 500px;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column ;
    box-shadow: inset 0 1.5px 2px 0 rgba(0,0,0,.1);
    z-index: 2;
    background: #f4f5f8;
}

.form-list{
    flex: 1;
    min-width: 0;
    min-height: 0;
    position: relative;
    display: flex;
    flex-direction: column;
}

.form-title{
    margin: 0 0 16px 0;
}

.form-title__text{
    font-size: 20px;
    font-weight: 700;
    line-height: 35px;
}

.form-toolbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 16px 0;
}

.toolbar-left{
    display: flex;
    align-items: center;
}

.filter-input{
    width: 265px;
    margin-right: 10px;
    border-radius: 3.5px;
}

.filter-input:hover{
    outline: 1px solid #1a73e8 ;
}

.form-content{
    background-color: #fff;
    border-radius: 4px;
    /* box-shadow: 0 0 11px rgba(0,0,0,.08); */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.form-content__container{
    background-color: #fff;
    position: relative;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    overflow: auto;
    max-height: calc(100vh - 240px);
}

.content-table{
    position: relative;
    overflow: auto;
    border-bottom: 1px solid #ddd;
    height: 100%;
    box-sizing: border-box;
}
.mr-2{
    margin-right: 10px; 
}

.content-page{
    padding: 0 16px;
    height: 40px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    bottom: 20px;
    z-index: 2;
    background: #fff;
}

.page-left div{
    height: 20px;
    padding-right: 12px;
}

.page-right{
    height: 40px;
    display: flex;
    align-items: center;
}

.page-size{
    width: 85px;
    margin: 4px 16px;
    line-height: 32px;
}

.filter{
    position: relative;
}

.form-filter{
    right: 0px;
    width: 360px;
    margin-top: 12px;
    position: absolute;
    top: 100%;

    display: block;
    z-index: 15;
    border-radius: 4px;
    box-shadow: 0 0 16px rgba(23,27,42,.24);
}

.filter-container{
    background: #fff;
    z-index: 5;
}
.filter-arrow{
    border-color: transparent transparent #fff transparent;
    border-style: solid;
    border-width: 0px 8px 8px 8px;
    height: 0px;
    width: 0px;
    position: absolute;
    top: -8px;
    right: 57px;
    transition: border-color .2s linear;
    box-shadow: 0 -20px 20px 0 rgba(0,0,0,.08);
}

.filter-main label{
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
}

.filter-header{
    padding: 12px 24px 8px 24px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
}

.filter-header__text{
    font-size: 18px;
    font-weight: 700;
    font-weight: 500;
}
.filter-header__icon{
    display: flex;
    align-items: center;
    justify-content: center;
}

.filter-header__icon>icon{
    min-height: 20px;
    min-width: 20px;
    height: 20px;
    width: 20px;
}

.filter-main{
    padding: 12px 24px 10px 24px;
    display: flex;
    flex-direction: column;
}

.filter-main>div{
    margin-bottom: 14px;
}

.filter-footer{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: 1px solid #e0e0e0;
    padding: 12px 24px;
}

.filter-btn__close{
    margin-right: 10px;
}
</style>