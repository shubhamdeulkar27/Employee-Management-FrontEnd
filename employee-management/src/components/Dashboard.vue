<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Employee Management</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0"
          >Navigation</md-toolbar
        >

        <md-list>
          <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
          <md-list-item>
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Sign Up</span>
          </md-list-item>

          <md-list-item>
            <md-icon>login</md-icon>
            <span class="md-list-item-text">Login</span>
          </md-list-item>

          <md-list-item>
            <md-icon>subject</md-icon>
            <span class="md-list-item-text">About Us</span>
          </md-list-item>

          <md-list-item>
            <md-icon>code</md-icon>
            <span class="md-list-item-text">Developer Team</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <h2 id="md-app-content-title">Employee Management</h2>
        <p id="md-app-content-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
          quibusdam, non molestias et! Earum magnam, similique, quo recusandae
          placeat dicta asperiores modi sint ea repudiandae maxime? Quae non
          explicabo, neque.
        </p>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app-content {
  height: 90vh;
  background: url("../assets/employees.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}
#md-app-content-title {
  margin-top: 10vh;
  font-size: 40px;
}
.md-app {
  border: 1px solid rgba(#000, 0.12);
}
#md-app-content-text {
  width: 50vw;
  position: relative;
  top: 07vh;
  left: 25vw;
}
// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    menuVisible: false
  })
};
</script>
