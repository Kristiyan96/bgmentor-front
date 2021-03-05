<template>
  <FormWrapper :title="$t('auth.title.reset_password')">
    <form class="form-app form-reset-password" @submit.prevent="reset">
      <div class="alert alert-info" v-if="notice">{{ notice }}</div>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="form-group">
        <label for="password">{{ $t('auth.label.new_password') }}</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <label for="password">{{ $t('auth.label.confirm_password') }}</label>
        <input
          v-model="password_confirmation"
          type="password"
          class="form-control"
          id="password_confirmation"
          placeholder="Password Confirmation"
        />
      </div>
      <v-btn type="submit" large color="primary" class="btn mt-3">{{
        $t('auth.button.change_password')
      }}</v-btn>
    </form>
  </FormWrapper>
</template>

<script>
import FormWrapper from './FormWrapper'

export default {
  name: 'ResetPassword',
  components: {
    FormWrapper
  },
  data() {
    return {
      password: '',
      password_confirmation: '',
      error: '',
      notice: ''
    }
  },
  created() {
    this.checkPasswordToken()
  },
  methods: {
    reset() {
      this.$http.plain
        .patch(`/password_resets/${this.$route.params.token}`, {
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then((response) => this.resetSuccessful(response))
        .catch((error) => this.resetFailed(error))
    },
    resetSuccessful(response) {
      this.notice =
        'Your password has been reset successfully! Please sign in with your new password.'
      this.error = ''
      this.password = ''
      this.password_confirmation = ''
    },
    resetFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        'The link you used is not valid anymore. Please, send a new one.'
      this.notice = ''
    },
    checkPasswordToken() {
      this.$http.plain
        .get(`/password_resets/${this.$route.params.token}`)
        .catch((error) => {
          this.resetFailed(error)
          this.$router.replace('/')
        })
    }
  }
}
</script>
