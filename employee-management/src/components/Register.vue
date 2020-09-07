<template>
  <div id="register-main">
    <div id="register-content">
      <div class="content-box-1">
        <div id="content-title">Create Your Account</div>
        <div id="form-container">
          <form action method="post">
            <md-field>
              <label>Role</label>
              <md-input v-model="Role"></md-input>
              <span class="md-helper-text">You can use letters only.</span>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="EmailId"></md-input>
            </md-field>
            <md-field>
              <label>Username</label>
              <md-input v-model="UserName"></md-input>
              <span class="md-helper-text">You can use letters,numbers,period and @.</span>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="Password" type="password"></md-input>
              <span
                class="md-helper-text"
              >Should Be Alphanumeric and At least One special character.</span>
            </md-field>

            <md-card-actions>
              <md-button class="md-dense md-primary" href="/">Log in Instead</md-button>
              <md-button type="submit" class="md-raised md-primary">Create user</md-button>
            </md-card-actions>
          </form>
        </div>
      </div>
      <div class="content-box-2">
        <img src="../assets/account.svg" alt="Account" id="img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      Role: "",
      EmailId: "",
      UserName: "",
      Password: "",
    };
  },
};
</script>
<style lang="scss" scoped>
#register-content {
  width: 60vw;
  height: 80vh;
  position: relative;
  top: 5vh;
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
}
.md-button {
  font-size: 11px;
}
</style>
