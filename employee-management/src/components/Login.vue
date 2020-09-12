<template>
  <div id="login-main">
    <div id="container">
      <md-icon>login</md-icon>
      <div id="container-title">Log in</div>
      <div id="form-container">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-field :class="getValidationClass('UserName')">
            <label for="UserName">Username</label>
            <md-input name="UserName" id="UserName" v-model="form.UserName" :disabled="sending"></md-input>
            <span class="md-helper-text">You can use letters,numbers,period and @.</span>
            <span class="md-error" v-if="!$v.form.UserName.required">Username is required</span>
            <span
              class="md-error"
              v-else-if="!$v.form.UserName.minlength"
            >Username should have at least six characters</span>
            <span
              class="md-error"
              v-else-if="!$v.form.UserName.userNameRegex(this.UserName)"
            >Username Is Invalid (Eg. asdfg@123)</span>
          </md-field>
          <md-field :class="getValidationClass('Password')">
            <label for="Password">Password</label>
            <md-input
              name="Password"
              id="Password"
              v-model="form.Password"
              type="password"
              :disabled="sending"
            ></md-input>
            <span class="md-helper-text">Should Be Alphanumeric and At least One special character.</span>
            <span class="md-error" v-if="!$v.form.Password.required">The Password is required</span>
            <span class="md-error" v-else-if="!$v.form.Password.minlength">Invalid Password</span>
          </md-field>

          <md-card-actions>
            <md-button class="md-dense md-primary" href="/register">Create Account</md-button>
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Log In</md-button>
          </md-card-actions>
        </form>
      </div>
    </div>
    <md-snackbar :md-position="position" :md-active.sync="invalidCredentials" md-persistent>
      <span>Invalid Credentials!</span>
      <md-button class="md-primary" @click="invalidCredentials = false">Ok</md-button>
    </md-snackbar>
    <md-snackbar :md-position="position" :md-active.sync="isLogin" md-persistent>
      <span>Login Successful!</span>
      <md-button type="submit" class="md-primary" :disabled="sending">Ok</md-button>
    </md-snackbar>
    <md-snackbar :md-position="position" :md-active.sync="isError" md-persistent>
      <span>Credential Error!</span>
      <md-button type="submit" class="md-primary" :disabled="sending" @click="clearForm">Ok</md-button>
    </md-snackbar>
  </div>
</template>
<script>
import service from "../services/user-service.js";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        UserName: null,
        Password: null,
      },
      isLogin: false,
      invalidCredentials: false,
      isError: false,
      position: "center",
      sending: false,
      token: null,
    };
  },
  validations: {
    form: {
      UserName: {
        required,
        minLength: minLength(6),
        userNameRegex(userName) {
          const regex = /^[a-zA-Z0-9]+([.@]?[a-zA-Z0-9]+)*$/;
          console.log("regex called");
          console.log(regex.test(userName));
          return regex.test(userName);
        },
      },
      Password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    login() {
      this.sending = true;
      let user = {
        UserName: this.form.UserName,
        Password: this.form.Password,
      };
      service
        .login(user)
        .then((result) => {
          if (result.data.success) {
            this.isLogin = true;
            this.token = result.data.token;
            localStorage.setItem("token", this.token);
            window.location.href = "/dashboard";
          }
          console.log(result.data.success);
        })
        .then(() => {
          this.sending = false;
          this.clearForm();
        })
        .catch((error) => {
          if (error.response.status == "404") {
            this.invalidCredentials = true;
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
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.login();
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.UserName = null;
      this.form.Password = null;
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  width: 40vw;
  height: 80vh;
  border: 1px solid rgba($color: gray, $alpha: 0.4);
  border-radius: 5px;
  position: relative;
  left: 30vw;
  top: 10vh;
}
#container-title {
  font-size: 25px;
  line-height: 20px;
  width: 100%;
  position: relative;
  top: 15vh;
}
#form-container {
  width: 30vw;
  position: relative;
  left: 5vw;
  top: 20vh;
}
.md-card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: 10vh;
  width: 50vw;
}
.md-icon {
  position: relative;
  top: 10vh;
}
</style>
