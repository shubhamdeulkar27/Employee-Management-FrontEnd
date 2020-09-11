<template>
  <md-button class="md-accent" @click="deleteEmployee(employeeId)">Delete</md-button>
</template>
<script>
import service from "../services/employee-service.js";
export default {
  name: "Delete",
  props: {
    employeeId: Number,
  },
  methods: {
    deleteEmployee(id) {
      service
        .deleteEmployee(id)
        .then((result) => {
          if (result.data.success) {
            this.$emit("fetchEmployees");
          }
        })
        .catch((error) => {
          alert("Error Occured While Deleting Employee", this.employeeId);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>