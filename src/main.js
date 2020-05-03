import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import TestPlatform from './components/TestPlatform';
import Pembahasan from './components/Pembahasan';

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/', component: TestPlatform, props: { testId: 1 } },
  { path: '/pembahasan/:testId', component: Pembahasan, props: true }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
