import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// vendor
import "./vendor/elementui";
import "./vendor/highlight";
import i18n from "./vendor/i18n";
import store from "./vendor/vuex";
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount("#app");
