import Vue from 'vue/dist/vue.js';
import Vuetify from 'vuetify';
import css from '../scss/app.scss';

Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    data: {
        mobileNav: false
    },
    methods: {
        toggleMobileNav() {
            this.mobileNav =!this.mobileNav
        }
    }
});