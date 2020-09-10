<template>
  <div id="container">
    <div id="container-header">Add Employee</div>
  </div>
</template>

<script>
export default {
  name: "AddEmployee",
};
</script>
<style lang="scss" scoped>
#container {
  border: solid 1px rgba($color: gray, $alpha: 0.4);
  border-radius: 5px;
  height: 80vh;
  width: 50vw;
  position: relative;
  top: 3vh;
  left: 25vw;
}
#container-header {
  font-size: 20px;
  position: relative;
  top: 5vh;
  left: 5vw;
  text-align: left;
}
</style>
