import Vue from 'vue'
import VueFire from 'vuefire';

Vue.config.devtools = true;

Vue.use(VueFire);

import Main from "./main.vue"

new Vue({
    el: '#app',
    render: h => h(Main)
})