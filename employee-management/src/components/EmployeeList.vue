<template>
  <div id="list-container">
    <div id="empty-list" v-if="isListEmpty">Employee Details Appear Here.</div>
    <md-card md-with-hover v-if="!isListEmpty" v-for="employee in employees" :key="employee.id">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ employee.firstName + " " + employee.lastName }}</div>
        </md-card-header>

        <md-card-content @click.native="callUpdate(employee)">
          <div class="employee-data">Email: {{ employee.emailId }}</div>
          <div class="employee-data">Mobile: {{ employee.mobile }}</div>
          <div class="employee-data">Address: {{ employee.address }}</div>
          <div class="employee-data">Birthdate: {{ employee.birthDate }}</div>
          <div class="employee-data">Employment: {{ employee.employment }}</div>
        </md-card-content>

        <md-card-actions>
          <Delete v-bind:employeeId="employee.id" @fetchEmployees="fetchEmployees()" />
        </md-card-actions>
      </md-ripple>
    </md-card>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Edit Employee Details</md-dialog-title>
      <UpdateEmployee
        v-bind:employee="employee"
        @fetchEmployees="fetchEmployees()"
        @closeUpdate="closeUpdate()"
      />
    </md-dialog>
  </div>
</template>
<script>
import Delete from "./Delete.vue";
import UpdateEmployee from "./UpdateEmployee.vue";
import service from "../services/employee-service.js";

export default {
  name: "EmployeeList",
  components: {
    Delete,
    UpdateEmployee,
  },
  data() {
    return {
      isListEmpty: true,
      employees: [],
      employee: null,
      showDialog: false,
      isUpdated: false,
      isError: false,
    };
  },

  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      service
        .fetchEmployees()
        .then((result) => {
          this.employees = result.data.data;

          if (this.employees.length > 0) {
            this.isListEmpty = false;
          }
        })
        .catch((error) => {
          alert("Error Occured While Fetching Employees");
        });
    },
    callUpdate(employee) {
      this.employee = employee;
      this.showDialog = true;
    },
    closeUpdate() {
      this.showDialog = false;
    },
    fetchEmployee(id) {
      this.showDialog = true;
      service
        .fetchEmployee(id)
        .then((result) => {
          this.employee = result.data.data;
        })
        .then(() => {
          this.form.Id = this.employee["id"];
          this.form.FirstName = this.employee["firstName"];
          this.form.LastName = this.employee["lastName"];
          this.form.EmailId = this.employee["emailId"];
          this.form.Mobile = this.employee["mobile"];
          this.form.Address = this.employee["address"];
          this.form.BirthDate = this.employee["birthDate"];
          this.form.Employment = this.employee["employment"];
        });
    },

    updateEmployee() {
      this.showDialog = false;
      let employee = {
        Id: this.form.Id,
        FirstName: this.form.FirstName,
        LastName: this.form.LastName,
        EmailId: this.form.EmailId,
        Mobile: this.form.Mobile,
        Address: this.form.Address,
        BirthDate: this.form.BirthDate,
        Employment: this.form.Employment,
      };
      service
        .updateEmployee(employee)
        .then((result) => {
          if (result.data.success) {
            this.isAdded = true;
          }
        })
        .then(() => {
          this.fetchEmployees();
        })
        .catch((error) => {
          if (error.response.status == "409") {
            this.employeeExists = true;
          } else if (error.response.status == "400") {
            this.isError = true;
          }
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
  column-gap: 1vw;
  row-gap: 5vh;
}
#empty-list {
  position: relative;
  top: 35vh;
  font-size: 40px;
  width: 100vw;
}
.employee-data {
  text-align: left;
}
#form-container {
  padding-right: 2vw;
  padding-left: 2vw;
}
.md-dialog {
  height: 100vh;
  min-width: 550px;
}
.md-field {
  margin-bottom: 10px;
}
.md-dialog-actions {
  padding: 0px 18px 8px 17px;
}
.md-card-actions {
  position: relative;
  bottom: 1vh;
}
.md-overlay {
  background: rgba(0, 0, 0, 0.3);
}
@media (min-width: 320px) and (max-width: 360px) {
  #list-container {
    position: relative;
    padding: 1vh;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1vw;
    row-gap: 5vh;
  }
  #empty-list {
    position: relative;
    top: 35vh;
    font-size: 30px;
    line-height: 25px;
    width: 90vw;
  }
  .employee-data {
    text-align: left;
  }
  #form-container {
    padding-right: 2vw;
    padding-left: 2vw;
  }
  .md-dialog {
    height: 100vh;
    min-width: 550px;
  }
  .md-field {
    margin-bottom: 10px;
  }
  .md-dialog-actions {
    padding: 0px 18px 8px 17px;
  }
  .md-card-actions {
    position: relative;
    bottom: 1vh;
  }
  .md-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .md-card {
    width: 80vw;
  }
  .md-dialog-title {
    font-size: 25px;
    position: relative;
    left: 10vw;
    top: 5vh;
  }
}

@media (min-width: 570px) and (max-width: 640px) {
  #list-container {
    position: relative;
    padding: 1vh;
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1vw;
    row-gap: 5vh;
  }
  #empty-list {
    position: relative;
    top: 28vh;
    font-size: 30px;
  }
  .employee-data {
    text-align: left;
  }
  #form-container {
    padding-right: 2vw;
    padding-left: 2vw;
  }
  .md-dialog {
    height: 100vh;
    min-width: 550px;
  }
  .md-field {
    margin-bottom: 10px;
  }
  .md-dialog-actions {
    padding: 0px 18px 8px 17px;
  }
  .md-card-actions {
    position: relative;
    bottom: 1vh;
  }
  .md-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  .md-card {
    width: 60vw;
    position: relative;
    left: 15vw;
  }
  .md-dialog-title {
    font-size: 25px;
    position: relative;
    left: 10vw;
    top: 5vh;
  }
}
</style>
