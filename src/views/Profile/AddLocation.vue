<template>
  <span>
    <v-chip outlined @click="openDialog">
      <font-awesome-icon icon="plus" class="mr-2" /> Add
    </v-chip>
    <DialogForm
      :open="open"
      :onSubmit="submit"
      @onClose="closeDialog"
      title="Add location"
      :notice="notice"
      :error="error"
    >
      <v-text-field
        v-model="location"
        label="Location"
        placeholder="e.g My place, My Office, Your place, Online"
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
  name: 'TeacherLocations',
  components: {
    DialogForm
  },
  data() {
    return {
      location: '',
      locationRules: [(v) => !!v || 'Предметът е задължителен.'],
      loading: false,
      open: false,
      notice: '',
      error: '',
      user: null
    }
  },
  mounted() {
    this.location = ''
    this.user = { ...this.currentUser }
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
          location_list: [...this.user.location_list, this.location].join(', ')
        })
        this.error = null
        this.closeDialog()
        this.location = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile'])
  }
}
</script>
