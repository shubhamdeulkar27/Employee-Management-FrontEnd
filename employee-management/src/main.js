import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueRouter from "vue-router";
import Routes from "./routes.js";
import axios from "axios";

axios.defaults.baseURL = "https://localhost:44315/api/employee";
Vue.use(VueMaterial);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: Routes,
});

new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
});
