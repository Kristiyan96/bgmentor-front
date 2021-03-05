<template>
  <div>
    <v-card class="mx-auto my-12" max-width="385" shaped>
      <v-card-title>{{ $t('verify.verifyNumber') }}</v-card-title>
      <div class="my-4 mx-5 subtitle-1">{{ $t('verify.info') }}</div>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>

      <v-card-text
        ><CodeInput
          autoFocus
          class="my-5 input"
          @change="onChange"
          @complete="onComplete"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="resendCode">
          {{ $t('verify.resend') }}
        </v-btn>
        <v-btn @click="$router.go(-1)" text>
          {{ $t('verify.changeNumber') }}
        </v-btn></v-card-actions
      >
    </v-card>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import store from '@/store/index'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import CodeInput from 'vue-verification-code-input'

export default {
  components: { VuePhoneNumberInput, CodeInput },
  name: 'Verify',
  data() {
    return {
      loading: false,
      error: '',
      token: ''
    }
  },
  methods: {
    onChange(token) {
      this.token = token
    },
    async onComplete(token) {
      this.loading = true

      try {
        await store.dispatch('verify', token)
        this.error = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    },
    async resendCode() {
      this.loading = true

      try {
        await store.dispatch('resend_verify')
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
