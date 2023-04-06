import axios from "axios";
import { constants } from "@/config";
import * as Enum from '@/common/Enum/enum';
import * as Resource from '@/common/Resource/resource';
 
const state = {
    showOver: false, // Hiệu ứng over
    emulations: [],     // Tất cả bản ghi danh hiệu thi đua
    emulation: [],      // Bản ghi danh hiệu thi đua lấy theo id
    showForm: false,    // Hiển thị form thêm sửa
    filterDatas: [],    // Mảng chứa dữ liệu lọc
    pageSize: 20,
    pageNumber: 1,
    totalRecord: 0,
    formMode: 0,
    refresh: false,
}

const mutations = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    getAll(state, payload) {
        state.emulations = payload;
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
        state.totalRecord = payload.TotalCount;
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
    },
    /**
     * Cập nhật mới danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    putEmulation(state) {
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
    },

    /**
     * Xóa nhiều danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    deleteMultipleEmulation(state) {
        state.refresh = !state.refresh;
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
     * Ẩn hiện hiệu ứng xám màn hình
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    showOver(state) {
        state.showOver = !state.showOver;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi danh hiệu thi đua
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async getAllEmulation(context) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/emulation`)
        if(res.data) {
            context.commit("getAll", res.data)
        }
    },
    /**
     * Lấy bản ghi danh hiệu thi đua theo id
     * @param {*} context 
     * @param {*} id 
     * CreatedBy VMHieu 28/03/2023
     */
    async getByID(context, id) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/emulation/${id}`)
        if (res.data) {
            context.commit("getByID", res.data)
        }
    },
    /**
     * Lấy dữ liệu theo phân trang và tìm kiếm
     * @param {*} context 
     * CreatedBy VMHieu 03/04/2023
     */
    async getPaging(context) {
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/emulation/` + 
            `paging?keyword=${state.filterDatas.keyword}&RewardObject=${state.filterDatas.RewardObject}&TypeMovement=${state.filterDatas.TypeMovement}&` +
            `Status=${state.filterDatas.Status}&RewardLevel=${state.filterDatas.RewardLevel}&pageSize=${state.pageSize}&pageNumber=${state.pageNumber}`);
        if (res.data) {
            context.commit("getPaging", res.data);
        }
    },
    /**
     * Thêm mới danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async postEmulation(context, data) {
        await axios.post(`${constants.API_URL}/api/${constants.API_VERSION}/emulation`, data)
        .then(function (res) {
            context.commit('postEmulation', res.data);
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.AddSuccess);
        })
        .catch(function (error) {
            // hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.AddFail);
        })
    },
    /**
     * Cập nhật mới danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async putEmulation(context, data) {
        await axios.put(`${constants.API_URL}/api/${constants.API_VERSION}/emulation/${data.EmulationID}`, data)
        .then(function (res) {
            context.commit('putEmulation', res.data)
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.EditSuccess);
        })
        .catch(function (error) {
            // hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.EditFail);
        })
    },
    /**
     * Xóa danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async deleteEmulation(context, id) {
        await axios.delete(`${constants.API_URL}/api/${constants.API_VERSION}/emulation/${id}`,)
        .then(function (res) {
            context.commit('deleteEmulation', res.data);
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.DeleteSuccess);
        })
        .catch(function (error) {
            // hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.DeleteFail);
        })
    },
    /**
     * Xóa danh hiệu thi đua
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023
     */
    async deleteMultipleEmulation(context, id) {
        await axios.delete(`${constants.API_URL}/api/${constants.API_VERSION}/emulation/deleteMultiple?ids=${id}`,)
        .then(function (res) {
            context.commit('deleteMultipleEmulation', res.data);
            // Hiện toast thành công
            context.commit('updateToastMsg', Resource.ToastSuccess.DeleteSuccess);
        })
        .catch(function (error) {
            // hiện toast thất bại
            context.commit('updateToastMsg', Resource.ToastFail.DeleteFail);
        })
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
     * Ẩn hiện form thêm sửa
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    showForm(context) {
        context.commit("showForm");
    },
    /**
     * Ẩn hiện hiệu ứng xám màn hình
     * @param {*} context 
     * CreatedBy VMHieu 28/03/2023
     */
    showOver(context) {
        context.commit("showOver");
    }
}

export default {
    state,
    mutations,
    actions
}