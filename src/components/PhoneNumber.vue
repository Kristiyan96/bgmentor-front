<template>
  <VuePhoneNumberInput
    @update="handleChange"
    size="lg"
    required
    :disabled="disabled"
    clearable
    no-example
    :translations="{
      countrySelectorLabel: $t('verify.country_code'),
      phoneNumberLabel: $t(label)
    }"
    default-country-code="BG"
    v-model="input"
    class="mb-5"
  />
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default {
  props: {
    value: {
      type: String,
      default: '',
      description: 'The value of the form input'
    },
    label: {
      type: String,
      default: 'auth.label.phoneNumber',
      description: 'Label of the input'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  name: 'PhoneNumber',
  components: {
    VuePhoneNumberInput
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleChange({ formattedNumber, isValid, formatInternational }) {
      this.valid = isValid
      this.formattedNumber = formattedNumber
      this.$emit('update', {
        input: formattedNumber,
        formatted: formatInternational
      })
    }
  }
}
</script>
