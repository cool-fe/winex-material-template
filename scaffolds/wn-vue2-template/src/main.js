import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
const dsx = 8;
console.log(dsx);

new Vue({
  render: h => h(App),
}).$mount('#app')
