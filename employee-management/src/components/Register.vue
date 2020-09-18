<template>
  <div id="register-main">
    <div id="register-content">
      <div class="content-box-1">
        <div id="content-title">Create Your Account</div>
        <div id="form-container">
          <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-field :class="getValidationClass('Role')">
              <label for="Role">Role</label>
              <md-input name="Role" id="Role" v-model="form.Role" :disabled="sending"></md-input>
              <span class="md-helper-text">You can use letters only.</span>

              <span class="md-error" v-if="!$v.form.Role.required">Role is required</span>
              <span
                class="md-error"
                v-else-if="!$v.form.Role.minlength"
              >Username should have at least four characters</span>
            </md-field>

            <md-field :class="getValidationClass('EmailId')">
              <label for="EmailId">Email</label>
              <md-input name="EmailId" id="EmailId" v-model="form.EmailId" :disabled="sending"></md-input>
              <span class="md-error" v-if="!$v.form.EmailId.required">Email is required</span>
            </md-field>
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
              <span class="md-helper-text">
                Should Be Alphanumeric and At least One special
                character.
              </span>
              <span class="md-error" v-if="!$v.form.Password.required">The first name is required</span>
              <span class="md-error" v-else-if="!$v.form.Password.minlength">Invalid first name</span>
            </md-field>

            <md-card-actions>
              <md-button class="md-dense md-primary" href="/">Log in Instead</md-button>
              <md-button type="submit" class="md-raised md-primary" :disabled="sending">Create user</md-button>
            </md-card-actions>
          </form>
        </div>
      </div>
      <div class="content-box-2">
        <img src="../assets/account.svg" alt="Account" id="img" />
      </div>
    </div>
    <md-snackbar :md-position="position" :md-active.sync="isRegistered" md-persistent>
      <span>Registration Successful !</span>
      <md-button class="md-primary" @click="changeRouteTOLogin()">Ok</md-button>
    </md-snackbar>

    <md-snackbar :md-position="position" :md-active.sync="userExists" md-persistent>
      <span>User Already Exists !</span>
      <md-button class="md-primary" @click="userExists = false">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import service from "../services/user-service.js";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Register",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        Role: null,
        EmailId: null,
        UserName: null,
        Password: null,
      },
      position: "center",
      sending: false,
      isRegistered: false,
      userExists: false,
      isError: false,
    };
  },
  validations: {
    form: {
      Role: {
        required,
        minLength: minLength(4),
      },
      EmailId: {
        required,
      },
      UserName: {
        required,
        minLength: minLength(6),
        userNameRegex(userName) {
          const regex = /^[a-zA-Z0-9]+([.@]?[a-zA-Z0-9]+)*$/;
          return regex.test(userName);
          console.log("regex called");
        },
      },
      Password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    register() {
      this.sending = true;
      let user = {
        Role: this.form.Role,
        EmailId: this.form.EmailId,
        UserName: this.form.UserName,
        Password: this.form.Password,
      };
      service
        .register(user)
        .then((result) => {
          if (result.data.success) {
            this.isRegistered = true;
          }
        })
        .then(() => {
          this.sending = false;
          this.clearForm();
        })
        .catch((error) => {
          if (error.response.status == "409") {
            this.userExists = true;
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
        this.register();
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.Role = null;
      this.form.EmailId = null;
      this.form.UserName = null;
      this.form.Password = null;
    },
    changeRouteTOLogin() {
      window.location.href = "/";
    },
  },
};
</script>
<style lang="scss" scoped>
#register-content {
  width: 60vw;
  height: 80vh;
  position: relative;
  top: 10vh;
  left: 20vw;
  border: 1px solid rgba($color: gray, $alpha: 0.4);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#content-title {
  font-size: 25px;
  line-height: 20px;
  text-align: left;
  width: 100%;
}
.content-box-1 {
  padding: 5vh;
  padding-top: 10vh;
  width: 30vw;
}
.content-box-2 {
  padding: 5vh;
  padding-top: 10vh;
}
#img {
  width: 20vw;
  height: 50vh;
  position: relative;
  top: 5vh;
  right: 3vw;
}
#form-container {
  margin-top: 2vh;
}
.md-card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: 5vh;
  width: 40vw;
}
.md-button {
  font-size: 11px;
}

//Moto G4
@media (min-width: 320px) and (max-width: 360px) {
  #register-content {
    width: 80vw;
    height: 80vh;
    position: relative;
    top: 10vh;
    left: 10vw;
    border: 1px solid rgba($color: gray, $alpha: 0.4);
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .content-box-1 {
    width: 80vw;
    padding-top: 7vh;
  }
  .content-box-2 {
    display: none;
  }
  #content-title {
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    width: 100%;
  }
  .md-card-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    top: 7vh;
    width: 80vw;
  }
}

//Moto G4 Horizontal
@media (min-width: 570px) and (max-width: 640px) {
  #register-content {
    width: 90vw;
    height: 90vh;
    position: relative;
    top: 5vh;
    left: 5vw;
    border: 1px solid rgba($color: gray, $alpha: 0.4);
    border-radius: 5px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .content-box-1 {
    width: 90vw;
    padding-top: 3vh;
  }
  .content-box-2 {
    display: none;
  }
  #content-title {
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    width: 100%;
    position: relative;
    top: 5vh;
  }
  .md-card-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    top: 4vh;
    width: 80vw;
  }
  .md-field {
    margin-bottom: 2px;
  }
}
</style>
