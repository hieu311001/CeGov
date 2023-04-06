import { createStore } from "vuex";
import app from "./modules/app";
import emulation from '@/store/modules/emulation';
import rewardlevel from '@/store/modules/rewardlevel';

export default createStore({
    modules: {
        app,
        emulation,
        rewardlevel
    }
})