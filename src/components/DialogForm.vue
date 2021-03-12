<template>
  <v-dialog v-model="open" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <div class="alert alert-info" v-if="notice">{{ notice }}</div>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>

        <FormWrapper :displayActions="false">
          <slot />
        </FormWrapper>

        <small>*{{ $t('form.required') }}</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="closeDialog">
          {{ $t('actions.cancel') }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="onSubmit">
          {{ $t('actions.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FormWrapper from './FormWrapper'

export default {
  components: {
    FormWrapper
  },
  props: {
    open: {
      type: Boolean,
      default: false,
      description: 'Is the dialog open'
    },
    title: {
      type: String,
      default: '',
      description: 'Title of the form, using t18 string'
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
    },
    actions: {
      type: Array,
      default: () => [],
      description: 'List of available actions'
    }
  },
  data() {
    return {}
  },
  methods: {
    closeDialog() {
      this.$emit('onClose')
    }
  }
}
</script>
