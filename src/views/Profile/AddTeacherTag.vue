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
      <v-autocomplete
        filled
        :id="`tag-${model}`"
        v-model="modelValue"
        :items="allModels"
        chips
        flat
        :label="$t(`profile.labels.${model}`)"
        item-text="text"
        item-value="value"
        multiple
      ></v-autocomplete>
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
      modelRules: [(v) => !!v || this.$t(`profile.titles.${this.model}`)],
      loading: false,
      open: false,
      notice: '',
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
