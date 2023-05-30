import axios from "axios";
import { constants } from "@/config";
import * as Enum from '@/common/Enum/enum';
import * as Resource from '@/common/Resource/resource';
import { getValueEnum, getValueEnumText, handleError, handleShowToast } from "@/common/common";
 
const state = {
    showOver: false, // Hiệu ứng over
    showForm: false,    // Hiển thị form thêm sửa
    showImport: false, // Hiển thị form xuất khẩu
    emulations: [],     // Tất cả bản ghi danh hiệu thi đua
    emulation: [],      // Bản ghi danh hiệu thi đua lấy theo id
    filterDatas: [],    // Mảng chứa dữ liệu lọc
    pageSize: 10,       // Số bản ghi / trang
    pageNumber: 1,      // Trang thứ
    totalRecord: 0,     // Tổng số bản ghi lấy được
    formMode: 0,        // mode của form
    formGet: 0,         // 
    refresh: false,     // refresh lại trang
    errorMsg: [],       // Mảng lỗi trả về từ BE
    showLoading: false, // ẩn hiện loading
    numberOfPage: 0,
    loadFail: false,
    resultCheckFile: {
        Total: 0,
        TotalSuccess: 0,
        TotalFail: 0
    }
}

const mutations = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    getAll(state, payload) {
        state.emulations = payload;
        state.showLoading = false;
    },

    /**
     * Lấy bản ghi danh hiệu thi đua theo id
     * @param {*} context 
     * @param {*} id 
     * CreatedBy VMHieu 28/03/2023
     */
    getByID(state, payload) {
        state.emulation = payload;
    },

    /**
     * Lấy dữ liệu theo phân trang và tìm kiếm
     * @param {*} context 
     * CreatedBy VMHieu 03/04/2023
     */
    getPaging(state, payload) {
        state.emulations = payload.Data;
        state.emulations.map((emulation) => {
            emulation.Status = getValueEnum(emulation.Status, Resource.PropName.Status);
            emulation.RewardObject = getValueEnumText(emulation.RewardObject, Resource.PropName.RewardObject);
            emulation.TypeMovement = getValueEnumText(emulation.TypeMovement, Resource.PropName.TypeMovement);
        })

        state.totalRecord = payload.TotalCount;
        state.showLoading = false;
        //state.showOver = false;
        state.numberOfPage = state.totalRecord / state.pageSize;
    },

    /**
     * Thêm mới danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    postEmulation(state) {
        state.refresh = !state.refresh;
        state.totalRecord++;

        if (state.formMode == Enum.FormMode.AddSave) {
            state.showForm = true;
            state.showOver = true;
        } else {
            state.showForm = false;
            state.showOver = false;
        }
    },
    /**
     * Cập nhật mới danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    putEmulation(state) {
        state.refresh = !state.refresh;
        
        if (state.formMode == Enum.FormMode.AddSave) {
            state.showForm = true;
            state.showOver = true;
        } else {
            state.showForm = false;
            state.showOver = false;
        }
    },
    /**
     * Cập nhật nhiều trạng thái danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    updateStatusMultiple(state) {
        state.refresh = !state.refresh;
    },
    /**
     * Xóa danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    deleteEmulation(state) {
        state.refresh = !state.refresh;
        state.totalRecord--;
        state.showOver = false;
    },

    /**
     * Xóa nhiều danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    deleteMultipleEmulation(state) {
        state.refresh = !state.refresh;
        state.showOver = false;
    },

    /**
     * Thực hiện kiểm tra các bản ghi trong file  
     * @param {*} context 
     * @param {*} data 
     *  CreatedBy VMHieu 20/04/2023
     */
    checkFile(state, payload) {
        state.resultCheckFile = payload;
    },
    /**
     * Đóng form sau khi import
     * @param {*} state 
     * CreatedBy VMHieu 20/04/2023
     */
    importExcel(state) {
        state.showImport = false;
        state.showOver = false;
    },

    /**
     * Cập nhật lại mảng dữ liệu lọc
     * @param {} context 
     * @param {*} filterData 
     * CreatedBy VMHieu 03/04/2023
     */
    updateFilter(state, payload) {
        state.filterDatas = payload;
    },

    /**
     * Cập nhật formMode
     * @param {*} context 
     * @param {*} formModel 
     * CreatedBy VMHieu 03/04/2023
     */
    updateFormMode(state, payload) {
        state.formMode = payload;
    },
    /**
     * Cập nhật formGet
     * @param {*} context 
     * @param {*} formModel 
     * CreatedBy VMHieu 25/04/2023
     */
    updateFormGet(state, payload) {
        state.formGet = payload;
    },
    /**
     * Cập nhật giá trị của errorMsg
     * @param {} state 
     * @param {*} payload 
     */
    updateErrorMsg(state, payload) {
        state.errorMsg = payload;
    },
    
    /**
     * Cập nhật page size
     * @param {*} context 
     * CreatedBy VMHieu 03/04/2023
     */
    updatePageSize(state, payload) {
        state.pageSize = payload;
    },
    /**
     * Cập nhật page number
     * @param {} context 
     * CreatedBy VMHieu 03/04/2023
     */
    updatePageNumber(state, payload) {
        state.pageNumber = payload;
    },

    /**
     * Ẩn hiện form thêm sửa
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    showForm(state) {
        state.showForm = !state.showForm;
    },

    /**
     * Ẩn hiện form xuất khẩu
     * CreatedBy VMHieu 14/04/2023
     */
    showImport(state) {
        state.showImport = !state.showImport;
    },
    /**
     * Ẩn hiện hiệu ứng xám màn hình
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    showOver(state) {
        state.showOver = !state.showOver;
    },

    /**
     * Ẩn hiện loading
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 28/03/2023
     */
    showLoading(state) {
        state.showLoading = !state.showLoading;
    },

    /**
     * Thay đổi state loadfail
     * @param {*} state 
     * @param {*} payload 
     * CreatedBy VMHieu 10/05/2023
     */
    updateLoadFail(state) {
        state.loadFail = !state.loadFail;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async getAllEmulation(context) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/emulations`)
            if(res.data) {
                context.commit("getAll", res.data)
            } else {
                // Hiện toast thất bại
                context.commit('updateToastMsg', Resource.ToastFail.InvalidDataResponse);

                handleShowToast(context);
            }
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.LoadFail);

            handleShowToast(context);
        }
        
    },
    /**
     * Lấy bản ghi danh hiệu thi đua theo id
     * @param {*} context 
     * @param {*} id 
     * CreatedBy VMHieu 28/03/2023
     */
    async getByID(context, id) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/${id}`)
            if (res.data) {
                context.commit("getByID", res.data)
            }  else {
                // Hiện toast thất bại
                context.commit('updateToastMsg', Resource.ToastFail.InvalidDataResponse);

                handleShowToast(context);
            }
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.LoadFail);

            handleShowToast(context);
        }
    },
    /**
     * Lấy dữ liệu theo phân trang và tìm kiếm
     * @param {*} context 
     * CreatedBy VMHieu 03/04/2023
     */
    async getPaging(context) {       
        try {
            const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/` + 
                `paging?keyword=${state.filterDatas.keyword}&RewardObject=${state.filterDatas.RewardObject}&TypeMovement=${state.filterDatas.TypeMovement}&` +
                `Status=${state.filterDatas.Status}&RewardLevel=${state.filterDatas.RewardLevel}&pageSize=${state.pageSize}&pageNumber=${state.pageNumber}`);
            if (res.data) {
                context.commit("getPaging", res.data);
            }  else {
                // Hiện toast thất bại
                context.commit('updateToastMsg', Resource.ToastFail.InvalidDataResponse);

                handleShowToast(context);
            }
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.LoadFail);
            context.commit('showLoading');

            handleShowToast(context);
        }
    },
    /**
     * Thêm mới danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async postEmulation(context, data) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/emulations`, data)
            context.commit('postEmulation', res.data);
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.AddSuccess);

            handleShowToast(context);
        } catch (error) {
            // hiện toast thất bại
            handleError(context, error.response.data.errorMsg, data.EmulationCode);
        }

    },
    /**
     * Cập nhật mới danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async putEmulation(context, data) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/${data.EmulationID}`, data)
            context.commit('putEmulation', res.data)
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.EditSuccess);

            handleShowToast(context);
        } catch (error) {
            // // hiện toast thất bại
            // context.commit('updateToastMsg', Resource.ToastFail.EditFail);
            handleError(context, error.response.data.errorMsg, data.EmulationCode);
        }
    },
    /**
     * Cập nhật nhiều trạng thái danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async updateStatusMultiple(context, data) {
        try {
            const res = await axios.put(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/multipleStatus`, data)
            context.commit('updateStatusMultiple');
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.EditSuccess);

            handleShowToast(context);
        } catch (error) {
            // hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.EditFail);
        }

    },
    /**
     * Xóa danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async deleteEmulation(context, id) {
        try {
            const res = await axios.delete(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/${id}`)

            context.commit('deleteEmulation', res.data);
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.DeleteSuccess);

            handleShowToast(context);
        } catch (error) {
            // hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.DeleteFail);
        }

    },
    /**
     * Xóa danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async deleteMultipleEmulation(context, id) {
        try {
            const res = await axios.delete(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/multiple?ids=${id}`)

            context.commit('deleteMultipleEmulation', res.data);
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.DeleteSuccess);

            handleShowToast(context);
        } catch (error) {
            // hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.DeleteFail);
        }
    },
    /**
     * Xuất file Excel
     * CreatedBy VMHieu 13/04/2023
     */
     exportExcel(context) {
        try {
             window.open(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/` + 
                `export?keyword=${state.filterDatas.keyword}&RewardObject=${state.filterDatas.RewardObject}&TypeMovement=${state.filterDatas.TypeMovement}&` +
                `Status=${state.filterDatas.Status}&RewardLevel=${state.filterDatas.RewardLevel}&pageSize=${state.totalRecord}&pageNumber=${state.pageNumber}`, 'Download');     
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.ExportFail);

            handleShowToast(context);
        }
    },
    /**
     * Tải file excel mẫu
     * @param {} context 
     * CreatedBy VMHieu 20/04/2023
     */
    downloadFileSample(context) {
        try {
            window.open(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/sampleFile`, 'Download');   
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.DownloadFileFail);

            handleShowToast(context);
        }
    },
    /**
     * Tải file excel sau khi check
     * @param {} context 
     * CreatedBy VMHieu 28/04/2023
     */
    downloadFileCheck(context, data) {
        try {
            window.open(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/fileCheckResult?statusCheck=${data}`, 'Download');   
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.DownloadFileFail);

            handleShowToast(context);
        }
    },
    /**
     * Thực hiện kiểm tra các bản ghi trong file  
     * @param {*} context 
     * @param {*} data 
     *  CreatedBy VMHieu 20/04/2023
     */
    async checkFile(context, data) {
        try {          
            const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/fileCheck`, data, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            );
            if (res) {
                context.commit("checkFile", res.data);
            }  else {
                // Hiện toast thất bại
                context.commit('updateToastMsg', Resource.ToastFail.InvalidDataResponse);
                context.commit('updateLoadFail');

                handleShowToast(context);
            }
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.CheckFail);
            context.commit('updateLoadFail');

            handleShowToast(context);
        }
    },
    /**
     * Thực hiện import sau khi check
     * @param {*} context 
     * CreatedBy VMHieu 20/04/2023
     */
    async importExcel(context) {
        try {
            const res = await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/emulations/import`);
            if (res) {
                context.commit('importExcel');
                context.commit('updateToastMsg', Resource.ToastSuccess.AddSuccess);
    
                handleShowToast(context);
            }  else {
                // Hiện toast thất bại
                context.commit('updateToastMsg', Resource.ToastFail.InvalidDataResponse);

                handleShowToast(context);
            }     
        } catch (error) {
            // Hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.ImportFail);

            handleShowToast(context);
        }
    },
    /**
     * Cập nhật lại mảng dữ liệu lọc
     * @param {} context 
     * @param {*} filterData 
     * CreatedBy VMHieu 03/04/2023
     */
    updateFilter(context, filterData) {
        context.commit("updateFilter", filterData);
    },
    /**
     * Cập nhật page size
     * @param {*} context 
     * CreatedBy VMHieu 03/04/2023
     */
    updatePageSize(context, pageSize) {
        context.commit("updatePageSize", pageSize);
    },
    /**
     * Cập nhật page number
     * @param {} context 
     * CreatedBy VMHieu 03/04/2023
     */
    updatePageNumber(context, pageNumber) {
        context.commit("updatePageNumber", pageNumber);
    },
    /**
     * Cập nhật formMode
     * @param {*} context 
     * @param {*} formModel 
     * CreatedBy VMHieu 03/04/2023
     */
    updateFormMode(context, formMode) {
        context.commit("updateFormMode", formMode);
    },
    /**
     * Cập nhật formGet
     * @param {*} context 
     * @param {*} formGet 
     * CreatedBy VMHieu 25/04/2023
     */
    updateFormGet(context, formGet) {
        context.commit("updateFormGet", formGet);
    },
    /**
     * Ẩn hiện form thêm sửa
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    showForm(context) {
        context.commit("showForm");
    },
    /**
     * Ẩn hiện form xuất khẩu
     * CreatedBy VMHieu 14/04/2023
     */
    showImport(context) {
        context.commit("showImport");
    },
    /**
     * Ẩn hiện hiệu ứng xám màn hình
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    showOver(context) {
        context.commit("showOver");
    },
    /**
     * Ẩn hiện loading
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 28/03/2023
     */
    showLoading(context) {
        context.commit("showLoading");
    }
}

export default {
    state,
    mutations,
    actions
}