<template>
  <div id="header-main">
    <div id="header-title">Employee Management System</div>
    <div id="header-btns">
      <md-button class="md-primary">Login</md-button>
      <md-button class="md-primary">Signup</md-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header"
};
</script>
<style lang="scss" scoped>
#header-main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-shadow: 2px 2px 5px rgba($color: black, $alpha: 0.4);
}
#header-title {
  font-size: 20px;
  line-height: 7vh;
  height: 06vh;
  padding-left: 1vw;
  text-align: left;
}
#header-btns {
  padding-right: 1vw;
}
</style>
