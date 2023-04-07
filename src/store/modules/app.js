const state = {
    showPopup: false,
    showToast: false,
    toastMsg: "",
    popupMsg: "",
    popupStatus: 0
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
     * Update trạng thái popup
     * @param {*} state 
     * @param {*} payload 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupStatus(state, payload) {
        state.popupStatus = payload;
    },
    /**
     * Update msg popup
     * @param {*} state 
     * @param {*} payload 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupMsg(state, payload) {
        state.popupMsg = payload;
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
     * Update trạng thái popup
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupStatus(context, data) {
        context.commit('updatePopupStatus', data);
    },

    /**
     * Update msg popup
     * @param {*} context 
     * @param {*} data 
     * CreatedBy VMHieu 05/04/2023 
     */
    updatePopupMsg(context, data) {
        context.commit('updatePopupMsg', data);
    }

}

export default {
    state,
    mutations,
    actions
}