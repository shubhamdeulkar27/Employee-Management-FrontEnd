<template>
  <div>
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
      <md-button class="md-primary" @click="close">Close</md-button>
      <md-button type="submit" class="md-raised md-primary" @click="updateEmployee()">Save</md-button>
    </md-dialog-actions>
  </div>
</template>
<script>
import service from "../services/employee-service.js";
export default {
  name: "UpdateEmployee",
  props: {
    employee: Object,
  },
  data() {
    return {
      form: {
        Id: this.employee["id"],
        FirstName: this.employee["firstName"],
        LastName: this.employee["lastName"],
        EmailId: this.employee["emailId"],
        Mobile: this.employee["mobile"],
        Address: this.employee["address"],
        BirthDate: this.employee["birthDate"],
        Employment: this.employee["employment"],
      },
    };
  },
  methods: {
    updateEmployee() {
      let employeeData = {
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
        .updateEmployee(employeeData)
        .then((result) => {
          if (result.data.success) {
            this.close();
            this.$emit("fetchEmployees");
          }
        })
        .catch((error) => {
          if (error.response.status == "409") {
            this.employeeExists = true;
          } else if (error.response.status == "400") {
            this.isError = true;
          }
        });
    },
    close() {
      this.$emit("closeUpdate");
    },
  },
};
</script>
<style lang="scss" scoped>
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