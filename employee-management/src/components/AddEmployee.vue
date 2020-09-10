<template>
  <div id="container">
    <div id="container-header">Add Employee</div>
    <div id="form-container">
      <form novalidate class="md-layout" @submit.prevent="validateEmployee">
        <md-field :class="getValidationClass('FirstName')">
          <label for="FirstName">Firstname</label>
          <md-input
            name="FirstName"
            id="FirstName"
            v-model="form.FirstName"
            :disabled="sending"
          ></md-input>
          <span class="md-helper-text">You can use letters only.</span>

          <span class="md-error" v-if="!$v.form.FirstName.required"
            >Firstname is required</span
          >
          <span class="md-error" v-else-if="!$v.form.FirstName.minlength"
            >Lastname should have at least three characters</span
          >
        </md-field>

        <md-field :class="getValidationClass('LastName')">
          <label for="LastName">Lastname</label>
          <md-input
            name="LastName"
            id="LastName"
            v-model="form.LastName"
            :disabled="sending"
          ></md-input>
          <span class="md-helper-text">You can use letters only.</span>

          <span class="md-error" v-if="!$v.form.LastName.required"
            >Lastname is required</span
          >
          <span class="md-error" v-else-if="!$v.form.LastName.minlength"
            >Lastname should have at least three characters</span
          >
        </md-field>

        <md-field :class="getValidationClass('EmailId')">
          <label for="EmailId">Email</label>
          <md-input
            name="EmailId"
            id="EmailId"
            v-model="form.EmailId"
            :disabled="sending"
          ></md-input>
          <span class="md-error" v-if="!$v.form.EmailId.required"
            >Email is required</span
          >
        </md-field>

        <md-field :class="getValidationClass('Mobile')">
          <label for="Mobile">Mobile</label>
          <md-input
            name="Mobile"
            id="Mobile"
            v-model="form.Mobile"
            :disabled="sending"
          ></md-input>
          <span class="md-helper-text">You can use numbers only.</span>

          <span class="md-error" v-if="!$v.form.Mobile.required"
            >Mobile number is required</span
          >
          <span class="md-error" v-else-if="!$v.form.Mobile.minlength"
            >Should have at least 10 digits</span
          >
        </md-field>

        <md-field :class="getValidationClass('Address')">
          <label for="Address">Address</label>
          <md-input
            name="Address"
            id="Address"
            v-model="form.Address"
            :disabled="sending"
          ></md-input>

          <span class="md-error" v-if="!$v.form.Address.required"
            >Address is required</span
          >
          <span class="md-error" v-else-if="!$v.form.Address.minlength"
            >Address should have at least ten characters</span
          >
        </md-field>

        <md-field :class="getValidationClass('BirthDate')">
          <label for="BirthDate">Birthdate</label>
          <md-input
            name="BirthDate"
            id="BirthDate"
            v-model="form.BirthDate"
            :disabled="sending"
          ></md-input>
          <span class="md-helper-text">DD/MM/YYYY</span>

          <span class="md-error" v-if="!$v.form.BirthDate.required"
            >Birthdate is required</span
          >
          <span class="md-error" v-else-if="!$v.form.BirthDate.minlength"
            >Invalid Birthdate</span
          >
        </md-field>
        <md-field :class="getValidationClass('Employment')">
          <label for="Employment">Employment</label>
          <md-input
            name="Employment"
            id="Employment"
            v-model="form.Employment"
            :disabled="sending"
          ></md-input>
          <span class="md-helper-text">Full-Time/Part-Time</span>

          <span class="md-error" v-if="!$v.form.Employment.required"
            >Employment is required</span
          >
        </md-field>

        <md-button
          type="submit"
          class="md-raised md-primary"
          :disabled="sending"
          >Add Employee</md-button
        >
      </form>
    </div>
    <md-snackbar
      :md-position="position"
      :md-active.sync="isAdded"
      md-persistent
    >
      <span>Employee Added!</span>
      <md-button class="md-primary" @click="isAdded = false">Ok</md-button>
    </md-snackbar>

    <md-snackbar
      :md-position="position"
      :md-active.sync="employeeExists"
      md-persistent
    >
      <span>User Already Exists !</span>
      <md-button class="md-primary" @click="employeeExists = false"
        >Ok</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import service from "../services/employee-service.js";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "AddEmployee",
  mixins: [validationMixin],
  data() {
    return {
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
      position: "center",
      sending: false,
      isAdded: false,
      employeeExists: false,
      isError: false,
    };
  },
  validations: {
    form: {
      FirstName: {
        required,
        minLength: minLength(3),
      },
      LastName: {
        required,
        minLength: minLength(3),
      },
      EmailId: {
        required,
      },
      Mobile: {
        required,
        minLength: minLength(10),
      },
      Address: {
        required,
        minLength: minLength(10),
      },
      BirthDate: {
        required,
        minLength: minLength(10),
      },
      Employment: {
        required,
      },
    },
  },
  methods: {
    addEmployee() {
      this.sending = true;
      let employee = {
        FirstName: this.form.FirstName,
        LastName: this.form.LastName,
        EmailId: this.form.EmailId,
        Mobile: this.form.Mobile,
        Address: this.form.Address,
        BirthDate: this.form.BirthDate,
        Employment: this.form.Employment,
      };
      service
        .addEmployee(employee)
        .then((result) => {
          if (result.data.success) {
            this.isAdded = true;
          }
        })
        .catch((error) => {
          if (error.response.status == "409") {
            this.employeeExists = true;
            this.sending = false;
          } else if (error.response.status == "400") {
            this.isError = true;
            this.sending = false;
          }
        });
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    validateEmployee() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.addEmployee();
      }
    },
    clearForm() {
      this.form.Id = 0;
      this.form.FirstName = null;
      this.form.LastName = null;
      this.form.EmailId = null;
      this.form.Mobile = null;
      this.form.Address = null;
      this.form.BirthDate = null;
      this.form.Employment = null;
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  border: solid 1px rgba($color: gray, $alpha: 0.4);
  border-radius: 5px;

  width: 50vw;
  position: relative;
  top: 3vh;
  left: 25vw;
}
#container-header {
  font-size: 20px;
  text-align: left;
  margin-top: 5vh;
  margin-left: 5vw;
}
#form-container {
  margin-top: 1vh;
  margin-left: 5vw;
  width: 40vw;
}
.md-button {
  margin-left: 15vw;
}
.md-field {
  margin-bottom: 15px;
}
</style>
