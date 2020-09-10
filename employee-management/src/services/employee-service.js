import axios from "axios";
axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
export default {
  fetchEmployees() {
    return axios.get("");
  },
  fetchEmployee(Id) {
    return axios.get("/" + Id);
  },
  deleteEmployee(Id) {
    return axios.delete("/" + Id);
  },
  addEmployee(Employee) {
    return axios.post("", Employee);
  },
  editEmployee(Employee) {
    return axios.put("/" + Employee.Id, Employee);
  },
};
