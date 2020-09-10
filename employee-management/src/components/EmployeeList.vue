<template>
  <div id="list-container">
    <div id="empty-list" v-if="isListEmpty">
      Employee Details Appear Here.
    </div>
    <md-card
      md-with-hover
      v-if="!isListEmpty"
      v-for="employee in employees"
      :key="employee.id"
    >
      <md-ripple>
        <md-card-header>
          <div class="md-title">
            {{ employee.firstName + " " + employee.lastName }}
          </div>
        </md-card-header>

        <md-card-content>
          <div class="employee-data">Email: {{ employee.emailId }}</div>
          <div class="employee-data">Mobile: {{ employee.mobile }}</div>
          <div class="employee-data">Address: {{ employee.address }}</div>
          <div class="employee-data">Birthdat: {{ employee.birthDate }}</div>
          <div class="employee-data">Employment: {{ employee.employment }}</div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary">Edit</md-button>
          <md-button class="md-accent" @click="deleteEmployee(employee.id)"
            >Delete</md-button
          >
        </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>
<script>
import service from "../services/employee-service.js";
export default {
  name: "EmployeeList",
  data() {
    return {
      isListEmpty: true,
      employees: [],
      employee: null,
    };
  },
  beforeMount() {
    this.fetchEmployees();
    this.fetchEmployee(8);
  },
  methods: {
    fetchEmployees() {
      service
        .fetchEmployees()
        .then((result) => {
          this.employees = result.data.data;
          console.log(this.employees);
          if (this.employees.length > 0) {
            this.isListEmpty = false;
          }
        })
        .catch((error) => {
          alert("Error Occured While Fetching Employees");
        });
    },
    fetchEmployee(id) {
      service.fetchEmployee(id).then((result) => {
        this.employee = result.data.data;
        console.log(this.employee);
      });
    },
    deleteEmployee(id) {
      service
        .deleteEmployee(id)
        .then(() => {
          this.fetchEmployees();
        })
        .catch((error) => {
          alert("Error Occured While Deleting Employee");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#list-container {
  position: relative;
  padding: 5vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1vh;
  row-gap: 1vw;
}
#empty-list {
  position: relative;
  top: 35vh;
  font-size: 40px;
}
.employee-data {
  text-align: left;
}
</style>
