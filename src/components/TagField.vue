<template>
  <v-autocomplete
    filled
    :id="`search-${label}`"
    v-model="localValue"
    :items="allModels"
    chips
    flat
    :label="$t(`search.labels.${model}`)"
    item-text="text"
    item-value="value"
    :multiple="multiple"
  >
    <template v-slot:selection="data">
      <v-chip color="primary" v-bind="data.attrs" :input-value="data.selected">
        {{ data.item.text }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'TagField',
  components: {},
  props: {
    multiple: {
      type: Boolean,
      default: true,
      description: 'Allow multiple tags'
    },
    label: {
      type: String,
      default: '',
      description: 'Tag label'
    },
    model: {
      type: String,
      default: '',
      description: 'Tag name'
    },
    suggestions: {
      type: Array,
      default: () => [],
      description:
        'List of suggestions. TODO: This component should fetch these'
    },
    savedValue: {
      type: Array | String,
      defualt: () => []
    }
  },
  data() {
    return {
      localValue: [],
      fetchedFilters: []
    }
  },
  computed: {
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
    localValue() {
      this.$emit('update', this.localValue)
    },
    savedValue: {
      initial: true,
      handler(newVal) {
        // improve this check for multiple values
        if (newVal !== this.localValue) {
          if (typeof newVal === 'string' && this.multiple) {
            this.localValue = [newVal]
          } else {
            this.localValue = newVal
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="sass"></style>
