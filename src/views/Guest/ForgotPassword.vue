<template>
  <FormWrapper :title="$t('auth.title.forgot_password')">
    <form class="form-app form-forgot-password" @submit.prevent="submit">
      <div class="alert alert-info" v-if="notice">{{ notice }}</div>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="form-group">
        <label for="email">{{ $t("auth.label.email") }}</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="email@example.com"
        />
      </div>
      <v-btn type="submit" large color="primary" class="btn mt-3"
        >{{ $t("auth.button.reset_password") }}
      </v-btn>
    </form>
  </FormWrapper>
</template>

<script>
import FormWrapper from "./FormWrapper";
export default {
  name: "ForgotPassword",
  components: {
    FormWrapper
  },
  data() {
    return {
      email: "",
      error: "",
      notice: ""
    };
  },
  methods: {
    submit() {
      this.$http.plain
        .post("/password_resets", { email: this.email })
        .then(() => this.submitSuccessful())
        .catch(error => this.submitFailed(error));
    },
    submitSuccessful() {
      this.notice = "Email with password reset instructions had been sent.";
      this.error = "";
      this.email = "";
    },
    submitFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "";
    }
  }
};
</script>
