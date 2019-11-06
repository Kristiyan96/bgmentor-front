<template>
  <div></div>
</template>

<script>
import store from "@/store";
import { CREATE_ALERT } from "@/store/actions.type";

export default {
  mounted() {
    this.attemptConfirmation();
  },
  methods: {
    attemptConfirmation() {
      this.axios
        .put("/api/confirmation", {
          confirmation_token: this.$route.params.key
        })
        .then(response => {
          this.success(response);
        })
        .catch(error => {
          this.failure(error);
        });
    },
    success(response) {
      this.$store.commit("CREATE_ALERT", ["Your email was confirmed. You could log in now.", "success"]);
      this.$router.push("/login");
    },
    failure(message) {
      this.$store.commit("CREATE_ALERT", ["There was a problem with your email.", "warning"]);
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>

</style>