import axios from "axios";
import { constants } from "@/config";
import * as Resource from '@/common/Resource/resource';
import { handleShowToast } from "@/common/common";

const state = {
    rewardlevels: [], // tất cả bản ghi cấp khen thưởng
}

const mutations = {
    /**
     * Lấy tất cả bản ghi cấp khen thưởng
     * @param {} context 
     * CreatedBy VMHieu 28/03/2023
     */
    getAllRewardLevel(state, payload) {
        state.rewardlevels = payload;
    }
}

const actions = {
    /**
     * Lấy tất cả bản ghi cấp khen thưởng
     * @param {} context 
     * CreatedBy VMHieu 28/03/2023
     */
    async getAllRewardLevel(context) {
        try {
            const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/rewardlevels`)
            if (res.data) {
                context.commit('getAllRewardLevel', res.data);
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
    }
}

export default {
    state,
    mutations,
    actions
}