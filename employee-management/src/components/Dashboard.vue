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
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>list</md-icon>
            <span class="md-list-item-text">
              <router-link to="/dashboard" id="default-link">Employee List</router-link>
            </span>
          </md-list-item>

          <md-list-item>
            <md-icon>add</md-icon>
            <span class="md-list-item-text">
              <router-link to="/add" id="default-link">Add Employee</router-link>
            </span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app-content {
  height: 90vh;
}

.md-app {
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
#default-link {
  color: black;
  text-decoration: none;
}
</style>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    menuVisible: false,
  }),
};
</script>
