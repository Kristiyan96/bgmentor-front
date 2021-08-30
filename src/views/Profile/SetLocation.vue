<template>
  <span>
    <v-btn @click="openDialog" color="primary" icon smallclass="mr-5">
      <font-awesome-icon icon="edit" />
    </v-btn>
    <DialogForm
      :open="open"
      :onSubmit="saveLocation"
      @onClose="closeDialog"
      :title="$t(`profile.titles.change_address`)"
      :notice="notice"
      :error="error"
    >
      {{ city_list }}
      <TagField
        model="city"
        :suggestions="cityListSuggestions"
        :multiple="false"
        @update="(val) => (city_list = val)"
        :savedValue="city_list"
      />
      <TagField
        model="country"
        :suggestions="countryListSuggestions"
        :multiple="false"
        @update="(val) => (country_list = val)"
        :savedValue="country_list"
      />
    </DialogForm>
  </span>
</template>

<script>
import store from '@/store'
import DialogForm from '@/components/DialogForm'
import TagField from '@/components/TagField'

export default {
  name: 'ProfileLocation',
  components: {
    DialogForm,
    TagField
  },
  props: {
    profile: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      country_list: [],
      city_list: [],
      open: false,
      error: null,
      notice: null
    }
  },
  methods: {
    async saveLocation() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          id: this.profile.id,
          country_list: this.country_list,
          city_list: this.city_list
        })
        this.error = null
        this.closeDialog()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
    }
  },
  computed: {
    cityListSuggestions() {
      return Object.keys(this.$t('search.city'))
    },
    countryListSuggestions() {
      return Object.keys(this.$t('search.country'))
    }
  },
  watch: {
    open: {
      initial: true,
      handler() {
        this.country_list = this.profile.country_list.length
          ? this.profile.country_list[0]
          : []
        this.city_list = this.profile.city_list ? this.profile.city_list[0] : []
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.flex-end
  display: flex
  justify-content: flex-end
</style>
