import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: () => import( /* webpackPrefetch: true */ '../components/Weather.vue'),
    }, 
    ],
})


export default router;