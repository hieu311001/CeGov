import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store';
import clickOutsideEvent from './common/Directive/clickOutside';
import tooltip from './common/Directive/tooltip';

import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App);

app.config.globalProperties.emitter = emitter;


app.directive('clickOutside', clickOutsideEvent);
app.directive('tooltip', tooltip);

app.provide('emitter', emitter);
app.use(router);
app.use(store);

app.mount('#app');
