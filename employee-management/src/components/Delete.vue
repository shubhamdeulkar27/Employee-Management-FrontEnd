<template>
  <md-button class="md-accent" @click="deleteEmployee(employee.id)">Delete</md-button>
</template>
<script>
import service from "../services/employee-service.js";
export default {
  name: "Delete",
  data(){
      return{
          isDeleted:false
      }
  }
  methods:{
    deleteEmployee(id) {
      service
        .deleteEmployee(id)
        .then(() => {
          this.fetchEmployees();
        })
        .catch((error) => {
          alert("Error Occured While Deleting Employee");
        });
    },
  }
};
</script>

<style lang="scss" scoped>
</style>