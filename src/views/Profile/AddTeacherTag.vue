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
      :error="error"
    >
      <TagField
        :model="model"
        :suggestions="suggestions"
        :multiple="true"
        @update="(val) => (modelValue = val)"
        :savedValue="modelValue"
      />
    </DialogForm>
  </span>
</template>

<script>
import DialogForm from '@/components/DialogForm'
import { mapGetters } from 'vuex'
import store from '@/store'
import TagField from '@/components/TagField'

export default {
  name: 'TeacherLevels',
  components: {
    DialogForm,
    TagField
  },
  props: {
    model: {
      type: String,
      description: 'Which user field to edit. Has to be an array of tags'
    },
    suggestions: {
      type: Array,
      default: () => [],
      description:
        'List of suggestions. TODO: This component should fetch these'
    }
  },
  data() {
    return {
      modelValue: '',
      loading: false,
      open: false,
      error: '',
      fetchedFilters: []
    }
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
    },
    allModels() {
      return [
        { header: this.$t(`search.labels.from_input`) },
        ...this.fetchedFilters,
        { header: this.$t(`search.labels.suggestions`) },
        ...this.formattedSuggestions
      ]
    },
    formattedSuggestions() {
      return this.suggestions.map((s) => {
        return {
          text: this.$t(`search.${this.model}.${s}`),
          value: s
        }
      })
    }
  },
  watch: {
    open() {
      if (this.open) {
        this.modelValue = this.profile[this.modelList]
      }
    }
  }
}
</script>
