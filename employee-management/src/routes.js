import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";

export default [
  { path: "/register", component: Register },
  { path: "/", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [{ path: "/", component: Home }],
  },
];
