<template>
  <FormWrapper :title="$t('auth.title.forgot_password')">
    <form class="form-app form-forgot-password" @submit.prevent="submit">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="form-group">
        <label for="email">{{ $t('auth.label.email') }}</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="email@example.com"
        />
      </div>
      <v-btn type="submit" large color="primary" class="btn mt-3"
        >{{ $t('auth.button.reset_password') }}
      </v-btn>
    </form>
  </FormWrapper>
</template>

<script>
import FormWrapper from './FormWrapper'
import store from '@/store'

export default {
  name: 'ForgotPassword',
  components: {
    FormWrapper
  },
  data() {
    return {
      email: '',
      error: ''
    }
  },
  methods: {
    async changePassword() {
      this.loading = true

      try {
        await store.dispatch('send_password_reset', this.email)
        this.error = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
