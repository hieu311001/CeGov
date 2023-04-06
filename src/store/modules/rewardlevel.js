import axios from "axios";
import { constants } from "@/config";

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
        const res = await axios.get(`${constants.API_URL}/api/${constants.API_VERSION}/rewardlevel`)
        if (res.data) {
            context.commit('getAllRewardLevel', res.data);
        }
    }
}

export default {
    state,
    mutations,
    actions
}