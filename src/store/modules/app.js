const state = {
    showPopup: 0,
    showToast: false,
    toastMsg: "",
    popupMsg: "",
    popupStatus: 1
}

const mutations = {
    /**
     * Mở popup cảnh báo
     * @param {*} state 
     * @param {*} payload
     * CreatedBy VMHieu 05/04/2023 
     */
    showPopup(state, payload) {
        state.showPopup = payload;
    },
    /**
     * Mở toast thông báo
     * @param {*} state 
     * @param {*} payload
     * CreatedBy VMHieu 05/04/2023 
     */
    showToast(state, payload) {
        state.showToast = payload;
    },
        /**
     * Update nội dung toast
     * @param {*} state 
     * @param {*} payload 
     * CreatedBy VMHieu 05/04/2023 
     */
    updateToastMsg(state, payload) {
        state.toastMsg = payload;
    },
    /**
     * Update nội dung popup
     * @param {*} state 
     * @param {*} payload 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupMsg(state, payload) {
        state.popupMsg = payload;
    },
    /**
     * Update trạng thái popup
     * @param {*} state 
     * @param {*} payload 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupStatus(state, payload) {
        state.popupStatus = payload;
    }
}

const actions = {
    /**
     * Mở popup cảnh báo
     * @param {*} state 
     * @param {*} data
     * CreatedBy VMHieu 05/04/2023 
     */
    showPopup(context, data) {
        context.commit('showPopup', data);
    },
    /**
     * Mở toast thông báo
     * @param {*} state 
     * @param {*} data
     * CreatedBy VMHieu 05/04/2023 
     */
    showToast(context, data) {
        context.commit('showToast', data);
    },
    /**
     * Update nội dung toast
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023 
     */
    updateToastMsg(context, data) {
        context.commit('updateToastMsg', data);
    },
    /**
     * Update nội dung popup
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupMsg(context, data) {
        context.commit('updatePopupMsg', data);
    },
    /**
     * Update trạng thái popup
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupStatus(context, data) {
        context.commit('updatePopupStatus', data);
    }

}

export default {
    state,
    mutations,
    actions
}