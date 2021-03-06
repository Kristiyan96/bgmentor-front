<template>
  <form @submit.prevent="onSubmit">
    <div class="alert alert-info" v-if="notice">{{ notice }}</div>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <v-main>
      <slot />
    </v-main>

    <v-btn
      type="submit"
      large
      color="primary"
      class="btn mt-3"
      v-if="!actions.length"
    >
      {{ $t('actions.submit') }}</v-btn
    >

    <v-btn
      v-for="action in actions"
      :key="action.label"
      large
      :color="action.color ?? 'primary'"
      class="btn mt-3"
    >
      {{ $t(action.label) }}</v-btn
    >
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
    actions: {
      type: Array,
      default: () => [],
      description: 'A list of action buttons. Expects label & color'
    },
    onSubmit: {
      type: Function,
      default: () => {},
      description: 'Action to be performed when the form is submitted'
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
