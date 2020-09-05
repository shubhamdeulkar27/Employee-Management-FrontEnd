import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import Dashboard from "./components/Dashboard.vue";

export default [
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "", component: Home },
      { path: "home", component: Home },
      { path: "register", component: Register }
    ]
  }
];
