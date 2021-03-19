<template>
  <form @submit.prevent="onSubmit">
    <div class="alert alert-info" v-if="notice">{{ notice }}</div>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <slot />

    <v-row id="action-wrapper">
      <v-btn large class="btn mt-3" v-if="displayActions" plain>
        {{ $t('actions.cancel') }}</v-btn
      >

      <v-btn
        type="submit"
        large
        color="primary"
        class="btn mt-3"
        v-if="displayActions"
      >
        {{ $t('actions.submit') }}</v-btn
      >
    </v-row>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      description: 'Title of the form, using t18 string'
    },
    displayActions: {
      type: Boolean,
      default: true,
      description: 'Should the default actions be displayed if actions is empty'
    },
    onSubmit: {
      type: Function,
      default: () => {},
      description: 'Action to be performed when the form is submitted'
    },
    onCancel: {
      type: Function,
      default: () => {},
      description: 'What happens when user clicks on cancel'
    },
    notice: {
      type: String,
      default: '',
      description: 'Important information about the form or submition.'
    },
    error: {
      type: String,
      default: '',
      description: 'Error messages from submition.'
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
form
  padding: 15px
#action-wrapper
  display: flex
  justify-content: flex-end
</style>
