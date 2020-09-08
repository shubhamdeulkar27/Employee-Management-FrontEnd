<template>
  <div id="login-main">
    <div id="container">
      <md-icon>login</md-icon>
      <div id="container-title">Log in</div>
      <div id="form-container">
        <form>
          <md-field>
            <label>Username</label>
            <md-input v-model="form.UserName"></md-input>
            <span class="md-helper-text"
              >You can use letters,numbers,period and @.</span
            >
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="form.Password" type="password"></md-input>
            <span class="md-helper-text"
              >Should Be Alphanumeric and At least One special character.</span
            >
          </md-field>

          <md-card-actions>
            <md-button class="md-dense md-primary" href="/register"
              >Create Account</md-button
            >
            <md-button @click="login" class="md-raised md-primary"
              >Log In</md-button
            >
          </md-card-actions>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import service from "../services/axios-service.js";
export default {
  name: "Login",
  data() {
    return {
      form: {
        UserName: null,
        Password: null,
      },
      isLogin: false,
    };
  },
  methods: {
    login() {
      let user = {
        UserName: this.form.UserName,
        Password: this.form.Password,
      };
      service.login(user).then((result) => {
        this.isLogin = true;
        console.log(this.isLogin);
      });
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
  left: 25vw;
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
}
.md-icon {
  position: relative;
  top: 10vh;
}
</style>
