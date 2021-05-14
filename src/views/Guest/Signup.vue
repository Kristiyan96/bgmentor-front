<template>
  <FormWrapper :title="$t('auth.title.register')">
    <form class="form-app form-signup" @submit.prevent="signup">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <VuePhoneNumberInput
        @update="handleChange"
        size="lg"
        required
        clearable
        no-example
        :translations="{
          countrySelectorLabel: $t('verify.country_code'),
          phoneNumberLabel: $t('auth.label.phoneNumber')
        }"
        default-country-code="BG"
        v-model="phoneNumber"
        class="mb-5"
      />
      <v-select
        v-model="role"
        :items="roles"
        :label="$t('auth.label.role')"
        outlined
      ></v-select>
      <v-text-field
        v-model="email"
        outlined
        type="email"
        :label="$t('auth.label.email')"
        placeholder="email@example.com"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        outlined
        :label="$t('auth.label.password')"
        :placeholder="$t('auth.label.password')"
      ></v-text-field>
      <v-text-field
        v-model="password_confirmation"
        type="password"
        outlined
        :label="$t('auth.label.confirm_password')"
        :placeholder="$t('auth.label.confirm_password')"
      ></v-text-field>

      <v-btn type="submit" large color="primary" class="btn mt-3">
        {{ $t('auth.link.register') }}
      </v-btn>
    </form>
  </FormWrapper>
</template>

<script>
import FormWrapper from './FormWrapper'
import store from '@/store/index'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default {
  name: 'Signup',
  components: {
    FormWrapper,
    VuePhoneNumberInput
  },
  data() {
    return {
      loading: false,
      error: '',
      valid: false,
      role: 'student',
      email: '',
      phoneNumber: '',
      formattedNumber: '',
      password: '',
      password_confirmation: '',
      roles: [
        {
          value: 'student',
          text: this.$t('account.roles.student')
        },
        {
          value: 'teacher',
          text: this.$t('account.roles.teacher')
        }
      ]
    }
  },
  created() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    async signup() {
      this.loading = true

      try {
        await store.dispatch('register', {
          email: this.email,
          phone_number: this.formattedNumber,
          role: this.role,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    },
    checkSignedIn() {
      if (store.state.auth.signedIn) {
        this.$router.replace('/todos')
      }
    },
    handleChange({ formattedNumber, isValid, formatInternational }) {
      this.valid = isValid
      this.formattedNumber = formattedNumber
    }
  }
}
</script>
