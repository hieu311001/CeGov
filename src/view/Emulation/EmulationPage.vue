<template>
<div>
    <div class="content">
        <div class="content-container">
            <div class="form-list" ref="page">
                <div class="form-title">
                    <div class="form-title__text">Danh hiệu thi đua</div>
                </div>
                <div class="form-toolbar">
                    <div class="toolbar-left">
                        <div class="ms-input filter-input">
                            <input 
                                id="input-search" 
                                type="text" 
                                placeholder="Nhập mã hoặc tên danh hiệu..." 
                                class="input-search"
                                ref="filter"
                                @keyup.enter="handleFilter"
                            >
                            <div class="input-search__icon" title="Tìm kiếm">
                                <icon class="icon icon-search"></icon>
                            </div>
                        </div>
                        <div class="filter" v-clickOutside="handleCloseFilter" @keyup.esc="handleCloseFilter">
                            <BaseButton class="ms-button btn-white" text="Bộ lọc" @click="handleToggleFilter">
                                <div class="add-icon">
                                    <icon class="icon icon-filter"></icon>
                                </div>
                            </BaseButton>
                            <BaseButton class="ms-button btn-unfilter" text="Bỏ lọc" @click="handleUnFilter" v-show="UnFilter"></BaseButton>
                            <div class="form-filter" v-show="showFormFilter" >
                                <span class="filter-arrow"></span>
                                <div class="filter-container">
                                    <div class="filter-header">
                                        <div class="filter-header__text">
                                            Lọc danh hiệu
                                        </div>
                                        <div class="filter-header__icon">
                                            <icon class="icon icon-exit" @click="handleCloseFilter"></icon>
                                        </div>
                                    </div>
                                    <div class="filter-main">
                                        <div class="filter-object">
                                            <label class="m-label">Đối tượng khen thưởng</label>
                                            <div class="filter-object__input">
                                                <BaseCombobox 
                                                    id="rewardobject" 
                                                    class="combobox" 
                                                    placeholder="Chọn hiện vật khen thưởng"  
                                                    :propValue=Resource.PropName.RewardObject
                                                    propText="Data"
                                                    :data=Resource.DataRewardObject
                                                    :errorMsg=Resource.ErrorCombobox.ErrorRewardObject
                                                    @getValueCombobox="getDataCombobox"
                                                />
                                            </div>
                                        </div>
                                        <div class="filter-level">
                                            <label class="m-label">Cấp khen thưởng</label>
                                            <div class="filter-level__input">
                                                <BaseCombobox 
                                                    id="rewardlevel" 
                                                    class="combobox" 
                                                    placeholder="Chọn hiện vật khen thưởng"  
                                                    :propValue=Resource.PropName.RewardLevel
                                                    propText="Data"
                                                    :data=Resource.DataRewardLevel
                                                    refInput="level"
                                                    :errorMsg=Resource.ErrorCombobox.RewardLevel
                                                    @getValueCombobox="getDataCombobox"
                                                />
                                            </div>
                                        </div>
                                        <div class="filter-type">
                                            <label class="m-label">Loại phong trào</label>
                                            <div class="filter-type__input">
                                                <BaseCombobox 
                                                    id="typemovement" 
                                                    class="combobox" 
                                                    placeholder="Chọn hiện vật khen thưởng"  
                                                    :propValue=Resource.PropName.TypeMovement
                                                    propText="Data"
                                                    :data=Resource.DataTypeMovement
                                                    refInput="level"
                                                    :errorMsg=Resource.ErrorCombobox.TypeMovement
                                                    @getValueCombobox="getDataCombobox"
                                                />
                                            </div>
                                        </div>
                                        <div class="filter-status">
                                            <label class="m-label">Trạng thái</label>
                                            <div class="filter-status__input">
                                                <BaseCombobox 
                                                    id="status" 
                                                    class="combobox" 
                                                    placeholder="Chọn hiện vật khen thưởng"  
                                                    :data=Resource.DataStatus
                                                    :propValue=Resource.PropName.Status
                                                    propText="Data"
                                                    refInput="level"
                                                    :errorMsg=Resource.ErrorCombobox.Status
                                                    @getValueCombobox="getDataCombobox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="filter-footer">
                                        <div class="filter-btn__close">
                                            <BaseButton class="m-button btn-white" text="Hủy" @click="handleCloseFilter"></BaseButton>
                                        </div>
                                        <div class="filter-btn__save">
                                            <BaseButton class="m-button btn-blue" text="Áp dụng" @click="handleFilter"></BaseButton>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <div class="nocheck flex" v-show="!showOperation">
                            <BaseButton class="ms-button btn-blue" text="Thêm danh hiệu" @click="handleOpenForm">
                                <div class="add-icon">
                                    <icon class="icon icon-add"></icon>
                                </div>
                            </BaseButton>
                            <BaseButton class="ms-button btn-white btn-option" @click="openExtract">
                                <div class="bonus-icon">
                                    <icon class="icon icon-bonus"></icon>
                                </div>
                            </BaseButton>
                            <div class="toggle-extract" v-show="showExtract">
                                <div class="extract-container">
                                    <div class="extract-option import" @click="importExcel">Nhập khẩu</div>
                                    <div class="extract-option export" @click="exportExcel">Xuất khẩu</div>
                                </div>
                            </div>
                        </div>
                        <div class="check" v-show="showOperation">
                            <div class="check-number">Đã chọn <strong class="number-check">{{ sumCheckbox }}</strong> </div>
                            <div class="check-remove" @click="uncheckbox">Bỏ chọn</div>
                            <BaseButton class="ms-button btn-whiteblue" text="Sử dụng" 
                                @click="updateStatusMultiple(Enum.Status.Use)"></BaseButton>
                            <BaseButton class="ms-button " text="Ngừng sử dụng" 
                                @click="updateStatusMultiple(Enum.Status.StopUsing)"></BaseButton>
                            <BaseButton class="ms-button btn-whitered" text="Xóa" @click="handleDeleteMultiple"></BaseButton>
                        </div>
                    </div>
                </div>
                <div class="form-content">
                    <div class="form-content__container">
                        <div class="content-table" @scroll="onScroll">
                            <table id="emulation-table" ref="row">
                                <thead>
                                    <tr>
                                        <th class="checkbox checkboxAll">
                                            <div class="ip-checkbox">
                                                <input 
                                                    type="checkbox" 
                                                    class="input__checkbox" 
                                                    id="checkboxAll" 
                                                    @click="handleCheckboxAll"
                                                >
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
                                    <tr 
                                        v-for="emp in emulations" 
                                        :key="emp.EmulationID" 
                                        @click="selectedRows" 
                                        @dblclick="handleEdit(emp.EmulationID)"
                                        class="table-row"
                                    >
                                        <td class="checkbox" @dblclick.stop="handle">
                                            <div class="ip-checkbox">
                                                <input 
                                                type="checkbox" 
                                                class="input__checkbox" 
                                                @click="handleCheckbox"
                                                name="selectedRecord"
                                                >
                                            </div>
                                        </td>
                                        <td>{{ emp.EmulationName }}</td>
                                        <td>{{ emp.EmulationCode }}</td>
                                        <td>{{ emp.RewardObject }}</td>
                                        <td>{{ emp.RewardLevelName }}</td>
                                        <td>{{ emp.TypeMovement }}</td>
                                        <td>{{ emp.Status }}</td>
                                        <div class="option" @dblclick.stop="" ref="option" @mouseleave="hoverOutside" :style="{left: `${position}px`}">
                                            <div class="option-edit" @click="handleEdit(emp.EmulationID)" title="Sửa">
                                                <icon class="icon icon-edit"></icon>
                                            </div>
                                            <div class="option-delete" title="Thêm nữa..." @click="handleOpenOption(emp.EmulationID)">
                                                <icon class="icon icon-bonus"></icon>
                                            </div>
                                            <ul class="option-menu">
                                                <li  @click="updateStatusUse(emp.EmulationID)">
                                                    <div class="option-item item-use" 
                                                       >Sử dụng</div>
                                                </li>
                                                <li @click="updateStatusUnUse(emp.EmulationID)">
                                                    <div class="option-item item-stop"
                                                        >Ngừng sử dụng</div>
                                                </li>
                                                <li @click="handleDelete(emp.EmulationID, emp.EmulationCode)">
                                                    <div class="option-item item-delete" 
                                                    >Xóa</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="content-page">
                        <div class="page-left">
                            <div class="page-left__content">
                                Tổng số: <strong>{{ totalRecord }}</strong> bản ghi
                            </div>
                        </div>
                        <div class="page-right">
                            <span>Số bản ghi/trang:</span>
                            <div class="page-size">
                                <div class="combobox-pagesize">
                                    <div>
                                        <input type="text" class="m-input" ref="psize" disabled defaultValue="10">
                                    </div>
                                    <div class="icon-pagesize" @click="openPageSize">
                                        <icon class="icon icon-arrow"></icon>
                                    </div>
                                </div>
                                <div class="paging-list" v-show="showPageSize">
                                    <div class="paging-list__list paging-list_10 paging-selected" @click="handlePagingList" value="10">10</div>
                                    <div class="paging-list__list paging-list_20" @click="handlePagingList" value="20">20</div>
                                    <div class="paging-list__list paging-list_50" @click="handlePagingList" value="50">50</div>
                                    <div class="paging-list__list paging-list_100" @click="handlePagingList" value="100">100</div>
                                </div>
                            </div>
                            <div class="page-fromto">
                                <strong>{{ pageFrom }}</strong> - <strong>{{ pageTo }}</strong> bản ghi
                            </div>
                            <div class="page-move">
                                <div class="move-prev" @click="movePrev">
                                    <icon class="icon icon-prev"></icon>
                                </div>
                                <div class="move-next" @click="moveNext">
                                    <icon class="icon icon-next"></icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="loading" v-show="showLoading"></div>
    </div>
    <FormEmulation />
    <ToastMessage />
    <PopupMessage :data="dataPopup"/>
    <FormExport />
    <div id="over" v-show="showOver"></div>
    
</div>
</template>

<script setup>

import BaseButton from '@/components/base/Button/BaseButton.vue';
import BaseCombobox from '@/components/base/Combobox/BaseCombobox.vue';
import FormEmulation from '@/view/FormEmulation.vue';
import ToastMessage from '@/view/ToastMessage';
import PopupMessage from '@/view/PopupMessage';
import FormExport from '../FormExport.vue';
// import { getAllEmulation } from '@/common/API/emulationAPI';
import { ref, onMounted,  computed, watch, reactive, onBeforeMount, watchEffect } from 'vue';
import { useStore } from 'vuex'
import { getValueEnum, getValueEnumBack } from '@/common/common';
import * as Resource from '@/common/Resource/resource';
import * as Enum from '@/common/Enum/enum';

// var showOver = ref(false);
var showFormFilter = ref(false);
var UnFilter = ref(false);
const showOperation = ref(false);
const showPageSize = ref(false);
const showExtract = ref(false);

const sumCheckbox = ref(0);
const filterData = reactive(
    {
        keyword: "",
        RewardObject: "",
        TypeMovement: "",
        Status: "",
        RewardLevel: ""
    }
);

const dataStatus = reactive([]);
var pagesize = ref(10);
var pagenumber = ref(1);

var dataPopup = [];        // Mảng chứa thông tin của bản ghi cần xóa
var emulationID = ref();

var width, left;
var position = ref(0);

const row = ref('row');  // Đại diện cho table
const page = ref('page'); // Đại diện cho class form-list
const option = ref('option'); // Đại diện cho ô option ở cuối row table
const filter = ref('filter');
const psize = ref('psize');

const store = useStore();

const emulations = computed(() => store.state.emulation.emulations)
const emulation = computed(() => store.state.emulation.emulation)
const showOver = computed(() => store.state.emulation.showOver)
const refresh = computed(() => store.state.emulation.refresh);
const showLoading = computed(() => store.state.emulation.showLoading);
const numberOfPage = computed(() => store.state.emulation.numberOfPage);

// Tổng số bản ghi
const totalRecord = computed(() => store.state.emulation.totalRecord);
// Từ bản ghi thứ 
const pageFrom = computed(() => {
    return (store.state.emulation.pageNumber-1)*store.state.emulation.pageSize + 1;
})
// Đến bản ghi thứ
const pageTo = computed(() => {
    return store.state.emulation.pageNumber*store.state.emulation.pageSize;
})


/**
 * Gán sự kiện scroll table để điều chỉnh nút option
 * CreatedBy VMHieu 28/03/2023
 */
const onScroll = () => {
    // Độ rộng phần tử form-list
    width = page.value.getBoundingClientRect().width;
    // Tọa độ left của table
    left = row.value.getBoundingClientRect().left;

    // // Nút option
    // let option = row.value.querySelector('.option');

    // option.style.left = `${width + 100 - left}px`;
    position.value = width + 105 - left;
}
/**
 * Mở form thêm danh hiệu
 * CreatedBy VMHieu 28/03/2023
 */
const handleOpenForm = () => {  
    store.dispatch('showOver');
    store.dispatch('updateFormMode', Enum.FormMode.Add);
    store.dispatch('showForm');
}
/**
 * Toggle extract
 * CreatedBy VMHieu 13/04/2023
 */
const openExtract = () => {
    showExtract.value = !showExtract.value;
}
/**
 * Lấy dữ liệu combobox trước khi lọc
 * @param {*} value 
 * CreatedBy VMHieu 18/04/2023
 */
const getDataCombobox = (value) => {
    if (value[Resource.PropName.Status]) {
        filterData.Status = value[Resource.PropName.Status];
    } 
    else if (value[Resource.PropName.TypeMovement]) {
        filterData.TypeMovement = value[Resource.PropName.TypeMovement];
    } 
    else if (value[Resource.PropName.RewardObject]) {
        filterData.RewardObject = value[Resource.PropName.RewardObject]
    } 
    else if (value[Resource.PropName.RewardLevel]) {
        filterData.RewardLevel = value[Resource.PropName.RewardLevel];
    }
}

/**
 * Toggle form Filter
 * CreatedBy VMHieu 28/03/2023
 */
const handleToggleFilter = () => {
    showFormFilter.value = !showFormFilter.value;
}
/**
 * Close form Filter
 * CreatedBy VMHieu 28/03/2023
 */
const handleCloseFilter = () => {
    showFormFilter.value = false;
}

/**
 * Call API lấy dữ liệu danh hiệu thi đua
 * CreatedBy VMHieu 28/03/2023
 */
const getAll = () => {
    try {
        store.dispatch('getPaging');
        store.dispatch('showLoading');
    } catch (ex) {
        console.log(ex);
    } 
}

/**
 * Gửi sự kiện mở form xem thông tin và sửa danh mục thi đua
 * CreatedBy VMHieu 28/03/2023
 */
const handleEdit =  (id) => {
    store.dispatch('showOver');
    store.dispatch('updateFormMode', Enum.FormMode.Edit);
    store.dispatch('showForm');
    store.dispatch('getByID', id);
}
/**
 * Gửi sự kiện xóa
 * @param {*} id 
 * CreatedBy VMHieu 06/04/2023
 */
const handleDelete = (id, code) => {
    store.dispatch("updatePopupStatus", Enum.PopupStatus.Delete);
    store.dispatch("showPopup", true);
    store.dispatch('showOver');
    store.dispatch("updateFormMode", Enum.FormMode.Delete);

    let arr = Resource.PopupMessage.Delete.trim().split(" ");
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] == Resource.PopupMessage.Breakpoint) {
            arr[i] = code;
        }
    }
    dataPopup.ID = id;
    dataPopup.Msg =  arr.join(" ");
} 
/**
 * Gửi sự kiện xóa nhiều
 * @param {*} id 
 * CreatedBy VMHieu 06/04/2023
 */
 const handleDeleteMultiple = () => {
    store.dispatch("updatePopupStatus", Enum.PopupStatus.Delete);
    store.dispatch("showPopup", true);
    store.dispatch('showOver');
    store.dispatch("updateFormMode", Enum.FormMode.DeleteMultiple);

    let dataDelete = [];
    // Lấy id của các bản ghi được select
    row.value.querySelectorAll(".selected-row").forEach((select) => {
        dataDelete.push(select.__vnode.key);
    })
    dataPopup.ID = dataDelete.join("/");

    let arr = Resource.PopupMessage.DeleteMultiple.trim().split(" ");
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] == Resource.PopupMessage.Breakpoint) {
            arr[i] = sumCheckbox.value;
        }
    }
    dataPopup.Msg = arr.join(" ");
} 

const updateStatusMultiple = (status) => {
    let dataUpdate = {
        ids: [],
        Status: status
    };
    // Lấy id của các bản ghi được select
    row.value.querySelectorAll(".selected-row").forEach((select) => {
        dataUpdate.ids.push(select.__vnode.key);
    })
    dataUpdate.ids = dataUpdate.ids.join("/");

    store.dispatch("updateStatusMultiple", dataUpdate);
}

/**
 * Thực hiện lọc 
 * CreatedBy VMHieu 04/04/2023
 */
const handleFilter = () => {
    showFormFilter.value = false;
    pagenumber.value = 1;
    
    filterData.keyword = filter.value.value;

    getAll();

    if (filterData.RewardLevel || filterData.RewardObject || filterData.TypeMovement || filterData.Status) {
        UnFilter.value = true;
    }
}
/**
 * Thực hiện bỏ lọc
 * CreatedBy VMHieu 04/04/2023
 */
const handleUnFilter = () => {
    filterData.RewardObject = "";
    filterData.TypeMovement = "";
    filterData.RewardLevel = "";
    filterData.Status = "";

    page.value.querySelector('#rewardobject').value = "";
    page.value.querySelector('#rewardlevel').value = "";
    page.value.querySelector('#typemovement').value = "";
    page.value.querySelector('#status').value = "";


    UnFilter.value = false;
    getAll();
}
/**
 * Xuất dữ liệu ra file excel
 * CreatedBy VMHieu 13/04/2023
 */
const exportExcel = () => {
    try {
        store.dispatch("exportExcel");
        showExtract.value = false;
    } catch (e) {
        console.log(e);
    }
}
/**
 * Mở form import excel
 * CreatedBy VMHieu 14/04/2023
 */
const importExcel = () => {
    store.dispatch('showImport');
    store.dispatch('showOver');
    showExtract.value = false;
}
/**
 * Thay đổi trạng thái thành sử dụng
 * @param {*} id 
 * CreatedBy VMHieu 12/04/2023
 */
const updateStatusUse = (id) => {
    dataStatus.value = emulation.value;
    dataStatus.value.Status = Enum.Status.Use;

    store.dispatch('putEmulation', dataStatus.value);
}
/**
 * Thay đổi trạng thái thành ngừng sử dụng
 * @param {*} id 
 * CreatedBy VMHieu 12/04/2023
 */
const updateStatusUnUse = (id) => {
    dataStatus.value = emulation.value;
    dataStatus.value.Status = Enum.Status.StopUsing;

    store.dispatch('putEmulation', dataStatus.value);
}

/**
 * Event lùi trang
 * CreatedBy VMHieu 04/04/2023
 */
const movePrev = (event) => {
    let btn = event.currentTarget;
    if (pagenumber.value == 1) {
        btn.style.opacity = "0.4";
    } else {
        pagenumber.value--;
        btn.style.opacity = "1";
    }

    if (pagenumber.value < Math.round(numberOfPage.value)){
        page.value.querySelector('.move-next').style.opacity = "1";
    }
}
/**
 * Event tiến trang
 * @param {*} event 
 * CreatedBy VMHieu 04/04/2023
 */
const moveNext = (event) => {
    let btn = event.currentTarget;

    if (pagenumber.value >= Math.round(numberOfPage.value)) {
        btn.style.opacity = "0.4";
    } else {
        pagenumber.value++;
        btn.style.opacity = "1";
    }

    if (pagenumber.value != 1) {
        page.value.querySelector('.move-prev').style.opacity = "1";
    }
}

/**
 * Xử lý sự kiện checkboxAll
 * @param {} event 
 * CreatedBy VMHieu 30/03/2023
 */
const handleCheckboxAll = (event) => {
    let sumFlag = 0;
    // Xét tbody của bảng:
    let tbody = event.target.closest("table").childNodes[1];

    // Xét tất cả các checkbox trừ checkAll:
    let records = tbody.querySelectorAll("[name='selectedRecord']");

    // Chọn tất cả các bản ghi, hiển thị nút xóa hàng loạt
    if (event.target.checked) {
        showOperation.value = true;
        records.forEach((record) => {
            record.checked = event.target.checked;
            record.closest("tr").classList.add("selected-row");
            sumFlag++;
        })
    }
    // Bỏ chọn tất cả các bản ghi, ẩn nút xóa hàng loạt
    else {
        showOperation.value = false;
        records.forEach((record) => {
            record.checked = event.target.checked;
            record.closest("tr").classList.remove("selected-row");
        })
    }

    sumCheckbox.value = sumFlag;
}
/**
 * Xử lý sự kiện checkbox
 * @param {} event 
 * CreatedBy VMHieu 30/03/2023
 */
const handleCheckbox = (event) => {
    // Ngăn sự kiện lan lên parent:
    event.stopPropagation();

    // Xét bảng hiện tại:
    let table = event.target.closest("table");
    let flag = 0;

    // Xét tất cả các checkbox:
    let records = table.querySelectorAll("[name='selectedRecord']");

    if (event.target.checked) {
        showOperation.value = true;
        // Đánh dấu bản ghi:
        event.target.closest("tr").classList.add("selected-row");

        // Đặt checkAll bằng true:
        table.querySelector("#checkboxAll").checked = true;

        // Bỏ checkAll nếu có một checkbox chưa check:
        for (var record of records) {
            if (!record.checked) {
                table.querySelector("#checkboxAll").checked = false;
                break;
            }
        }
    } else {
        // Bỏ đánh dấu bản ghi:
        event.target.closest("tr").classList.remove("selected-row");

        // Đặt checkAll bằng false:
        table.querySelector("#checkboxAll").checked = false;
    }

    let sumFlag = 0;
    // Duyệt tất cả checkbox để kiểm tra có checkbox nào đang được tick hay không
    for (var idx of records) {
        if (idx.checked) {
            flag = 1;
            sumFlag++;
        }
    }

    // Biến đếm tổng checkbox
    sumCheckbox.value = sumFlag;

    // Nếu có checkbox = true thì hiện nút xóa hàng loạt
    if (flag == 1) {
        showOperation.value = true;
    } else {
        showOperation.value = false;
    }
}
/**
 * Ấn nút bỏ chọn tất cả checkbox
 * CreatedBy VMHieu 31/03/2023
 */
const uncheckbox = (event) => {
    // Xét tất cả các checkbox:
    let records = row.value.querySelectorAll("[name='selectedRecord']");
    let checkboxAll = row.value.querySelector("#checkboxAll");

    checkboxAll.checked = false;

    // uncheck
    for (var record of records) {
        record.checked = false;
    }

    sumCheckbox.value = 0;
    showOperation.value = false;
}
/**
 * Mở option menu
 * CreatedBy VMHieu 31/03/2023
 */
const handleOpenOption = (id) => {
    emulationID.value = id;
    let me = event.currentTarget.parentNode,
        item = me.querySelector('.option-menu');

    option.value.forEach((element) => {
        element.querySelector('.option-menu').style.display = 'none';
    })

    item.classList.toggle('toggle-option');
}
/**
 * Ẩn hiện combobox chọn page number
 * CreatedBy VMHieu 04/04/2023
 */
const openPageSize = () => {
    showPageSize.value = !showPageSize.value;
}

/**
 * Click chọn số bản ghi / trang
 * CreatedBy VMHIEU 04/04/2023
 */
const handlePagingList = (event) => {
    let menu = page.value.querySelectorAll(".paging-list__list"),
        item = event.currentTarget;

    if (menu) {
        menu.forEach(function (items) {
            items.classList.remove("paging-selected");
        })

        // Style cho số bản ghi được chọn
        item.classList.add('paging-selected');
        psize.value.value = item.innerHTML;

        pagesize.value = item.getAttribute("value");
    }

    showPageSize.value = false;
}

/**
 * Ẩn option menu khi hover ra ngoài
 * CreatedBy VMHieu 31/03/2023
 */
const hoverOutside = () => {
    option.value.forEach((element) => {
        element.querySelector('.option-menu').classList.remove('toggle-option')
    })
}
/**
 * Kiểm tra sự thay đổi của data lọc để cập nhật state
 * CreatedBy VMHieu 03/04/2023
 */
watch((filterData), () => {
    store.dispatch("updateFilter", filterData);
})
/**
 * Kiểm tra sự thay đổi của 2 tham số để cập nhật lại danh sách
 */
watch([pagesize, pagenumber], () => {
    store.dispatch("updatePageSize", pagesize.value);
    store.dispatch("updatePageNumber", pagenumber.value);
    numberOfPage.value = totalRecord.value/pagesize.value;
    getAll();
})
/**
 * Quan sát việc refresh để tải lại trang
 * CreatedBy VMHieu 06/04/2023
 */
watch((refresh), () => {
    sumCheckbox.value = 0;
    uncheckbox();
    showOperation.value = false;
    try {
        getAll();
    } catch (e) {
        console.log(e);
    }
})
/**
 * Theo dõi sự thay đổi ID để lấy dữ liệu danh hiệu được chọn
 * CreatedBy VMHieu 12/04/2023
 */
watch((emulationID), () => {
    store.dispatch('getByID', emulationID.value);
})

onMounted(() => {
    /**
     * Thực hiện lấy dữ liệu
     * CreatedBy VMHieu 22/03/2023
     */
    try{
        store.dispatch("updateFilter", filterData);
        store.dispatch("updatePageSize", pagesize.value);
        store.dispatch("updatePageNumber", pagenumber.value);
        getAll();
    } catch(ex){
        console.error(ex);
    }

    /**
     * Gán sự kiện resize màn hình để điều chỉnh nút option
     * CreatedBy VMHieu 28/03/2023
     */
    window.addEventListener('resize', function(event) {
        onScroll(event);
    }, true);

    // Độ rộng phần tử form-list
    width = page.value.getBoundingClientRect().width;
    // Tọa độ left của table
    left = row.value.getBoundingClientRect().left;

    position.value = width + 105 - left;

})



</script>

<style scoped>
.content{
    position: relative;
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
    display: inline-flex;
    align-items: center;
    margin-left: 0;
    margin-right: auto;
}

.filter-input{
    width: 265px;
    margin-right: 10px;
    border-radius: 3.5px;
    border: 1px solid #e0e0e0;
    background: #fff;
}

.filter-input:hover{
    outline: 1px solid #1a73e8 ;
}

.filter-input:focus-within{
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
    position: relative;
}

.filter{
    position: relative;
    display: flex;
}

.filter button{
    margin-right: 10px;
}

.btn-unfilter{
    border: none;
    background: none;
    color: #2979ff;
    padding: 0;
    margin: 0 4px;
    min-width: none;
}

.btn-unfilter:hover{
    text-decoration: underline;
}

.form-filter{
    right: 24px;
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

.page-move{
    display: flex;
    align-items: center;
    justify-content: center;
}

.move-prev{
    opacity: 0.4;
    transform: rotate(-180deg);
    padding-left: 8px;
}

.move-prev, .move-next{
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.move-prev:hover, .move-next:hover{
    cursor: pointer;
    background-color: #f3f3f3;
    border-radius: 3.5px;
}

.page-fromto{
    margin-right: 24px;
}
.nocheck{
    position: relative;
}
.check{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: 0;
}

.check > .ms-button{
    margin-left: 9px;
}

.number-check{
    padding: 0 !important;
}
.check-remove{
    margin: 0 10px 0 20px;
    cursor: pointer;
    color: #2979ff!important;
}

.option-menu{
    background: #fff;
    background-clip: padding-box;
    border-radius: 4px;
    box-shadow: 0 0 16px rgba(23,27,42,.24);
    display: none;
    margin: 0;
    padding: 4px 0;
    z-index: 100000;
    position: absolute;
    list-style: none;
    box-sizing: border-box;
    min-width: 200px;
    left: -100px;
}

.option-menu > li {
    margin: 0;
    position: relative;
    max-height: 36px;
    display: flex;
    align-items: center;
}

.option-menu > li:hover {
    background: #e0ebff;
    cursor: pointer;
}
.option-item{
    display: flex;
    align-items: center;
    padding: 12px 4px 12px 24px;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    margin: 0;
    border-radius: 0;
    min-width: 80px;
    min-height: 35px;
    height: 35px;
    position: relative;
    font-size: 14px;
    font-weight: 400;
}

.item-delete{
    color: #e54848;
}

.toggle-option{
    display: block !important;
}

.paging-list {
    position: absolute;
    top: -350%;
    left: 0;
    background-color: #fff;
    z-index: 1000;
    width: inherit;
}

.paging-list__list {
    flex: 1;
    padding: 0 14px 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    min-height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.paging-list__list:hover {
    background-color: #ebedf0;
}

.paging-selected {
    background-color: #e0ebff !important;
    color: #000 !important;
}

.combobox-pagesize{
    position: relative;
    border-radius: 4px;
}

.icon-pagesize{
    position: absolute;
    top: 0;
    right: 0;
    width: 36px;
    height: 36px;
    cursor: pointer;
}

.btn-option{
    width: 36px;
    min-width: 40px;
    height: 36px;
    margin-left: 8px;
}

.bonus-icon{
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-extract{
    position: absolute;
    top: 100%;
    right: 5%;
    background: #fff;
    z-index: 10;
    width: 200px;
    height: 80px;
    box-shadow: 0 0 16px rgba(23,27,42,.24);
    border-radius: 4px;
}
.extract-option {
    padding: 0 14px 0 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    min-height: 36px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: GoogleSans;
}

.extract-option:hover{
    background-color: #e0ebff !important;
    color: #000 !important;
}

.extract-container .import {
    margin-top: 4px;
}

.extract-container .export {
    margin-bottom: 4px;
}

</style>