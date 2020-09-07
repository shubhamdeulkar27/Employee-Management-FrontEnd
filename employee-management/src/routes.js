import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";

export default [
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "home", component: Home },
      { path: "register", component: Register },
      { path: "", component: Login }
    ]
  }
];
