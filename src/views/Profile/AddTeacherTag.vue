<template>
  <span>
    <v-btn outlined color="primary" @click="openDialog" small>
      <font-awesome-icon icon="plus" class="mr-2" />
      {{ $t(`profile.labels.add`) }}
    </v-btn>
    <DialogForm
      :open="open"
      :onSubmit="submit"
      @onClose="closeDialog"
      :title="$t(`profile.titles.${model}`)"
      :notice="notice"
      :error="error"
    >
      <v-text-field
        v-model="modelValue"
        :rules="modelRules"
        :label="$t(`profile.labels.${model}`)"
        :placeholder="$t(`profile.titles.${model}`)"
        outlined
      ></v-text-field>
    </DialogForm>
  </span>
</template>

<script>
import DialogForm from '@/components/DialogForm'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'TeacherLevels',
  components: {
    DialogForm
  },
  props: {
    model: {
      type: String,
      description: 'Which user field to edit. Has to be an array of tags'
    }
  },
  data() {
    return {
      modelValue: '',
      modelRules: [(v) => !!v || this.$t(`profile.titles.${this.model}`)],
      loading: false,
      open: false,
      notice: '',
      error: ''
    }
  },
  mounted() {
    this.modelValue = ''
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
    },
    async submit() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          [this.modelList]: [
            ...this.profile[this.modelList],
            this.modelValue
          ].join(', ')
        })
        this.error = null
        this.closeDialog()
        this.modelValue = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    modelList() {
      return `${this.model}_list`
    }
  }
}
</script>
