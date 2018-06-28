import Vue from 'vue'
import VueFire from 'vuefire';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.devtools = true;

Vue.use(VueFire);
Vue.use(Element);

import Main from "./main.vue"

new Vue({
    el: '#app',
    render: h => h(Main)
})