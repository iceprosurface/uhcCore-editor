import Vue from "vue";
import Router from "vue-router";
import Config from "./views/config";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "config",
      component: Config
    },
    {
      path: "/config",
      name: "config",
      component: Config
    }
  ]
});
