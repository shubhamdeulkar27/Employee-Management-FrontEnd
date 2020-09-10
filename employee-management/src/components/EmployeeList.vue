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
          <md-button class="md-primary" @click="fetchEmployee(employee.id)"
            >Edit</md-button
          >
          <md-button class="md-accent" @click="deleteEmployee(employee.id)"
            >Delete</md-button
          >
        </md-card-actions>
      </md-ripple>
    </md-card>
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Edit Employee Details</md-dialog-title>
        <md-content>
          <div id="form-container">
            <form>
              <md-field md-clearable>
                <label>Firstname</label>
                <md-input v-model="form.FirstName"></md-input>
              </md-field>
              <md-field md-clearable>
                <label>Lastname</label>
                <md-input v-model="form.LastName"></md-input>
              </md-field>
              <md-field md-clearable>
                <label>Email</label>
                <md-input v-model="form.EmailId"></md-input>
              </md-field>
              <md-field md-clearable>
                <label>Mobile</label>
                <md-input v-model="form.Mobile"></md-input>
              </md-field>
              <md-field md-clearable>
                <label>Address</label>
                <md-input v-model="form.Address"></md-input>
              </md-field>
              <md-field md-clearable>
                <label>Birthdate</label>
                <md-input v-model="form.BirthDate"></md-input>
              </md-field>
              <md-field md-clearable>
                <label>Employment</label>
                <md-input v-model="form.Employment"></md-input>
              </md-field>
            </form>
          </div>
        </md-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false"
            >Close</md-button
          >
          <md-button
            type="submit"
            class="md-raised md-primary"
            @click="updateEmployee()"
            >Save</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>
<script>
import service from "../services/employee-service.js";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "EmployeeList",
  mixins: [validationMixin],
  data() {
    return {
      isListEmpty: true,
      employees: [],
      employee: null,
      showDialog: false,
      isUpdated: false,
      isError: false,
      form: {
        Id: 0,
        FirstName: null,
        LastName: null,
        EmailId: null,
        Mobile: null,
        Address: null,
        BirthDate: null,
        Employment: null,
      },
    };
  },

  beforeMount() {
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
</style>
