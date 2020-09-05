<template>
  <md-app-content>
    <h2 id="md-app-content-title">Employee Management</h2>
    <p id="md-app-content-text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam,
      non molestias et! Earum magnam, similique, quo recusandae placeat dicta
      asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.
    </p>
  </md-app-content>
</template>
<script>
import Dashboard from "./Dashboard.vue";
export default {
  name: "Home"
};
</script>
<style lang="scss" scoped>
#home-main {
}
.md-app-content {
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/employees.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}
#md-app-content-title {
  position: relative;
  top: 20vh;
  font-size: 40px;
}
#md-app-content-text {
  width: 50vw;
  position: relative;
  top: 25vh;
  left: 22.5vw;
}
</style>
