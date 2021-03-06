import Register from "./components/Register.vue";
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";
import EmployeeList from "./components/EmployeeList.vue";
import AddEmployee from "./components/AddEmployee.vue";

export default [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "/", component: EmployeeList },
      { path: "/add", component: AddEmployee },
    ],
  },
];
