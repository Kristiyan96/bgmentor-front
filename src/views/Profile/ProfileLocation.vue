<template>
  <div class="my-1 mb-3 subtitle-1 d-flex align-center">
    <span>
      <v-btn @click="openDialog" color="primary" icon smallclass="mr-5">
        <font-awesome-icon icon="edit" />
      </v-btn>
      <font-awesome-icon icon="map-marker-alt" class="mr-2" />
      {{ profile.city }}, {{ profile.country }}
    </span>
    <DialogForm
      :open="open"
      :onSubmit="saveLocation"
      @onClose="closeDialog"
      title="Update your location"
      :notice="notice"
      :error="error"
    >
      <v-text-field
        v-model="city"
        :label="$t(`profile.labels.city`)"
      ></v-text-field>
      <v-text-field
        v-model="country"
        :label="$t(`profile.labels.country`)"
      ></v-text-field>
    </DialogForm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import DialogForm from '@/components/DialogForm'

export default {
  name: 'TeacherLocation',
  components: {
    DialogForm
  },
  props: {
    profile: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      country: '',
      city: '',
      open: false,
      error: null,
      notice: null
    }
  },
  mounted() {
    this.resetEditing()
  },
  methods: {
    async saveLocation() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          id: this.profile.id,
          country: this.country,
          city: this.city
        })
        this.error = null
        this.closeDialog()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    resetEditing() {
      this.country = this.profile.country
      this.city = this.profile.city
    },
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.resetEditing()
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    editable() {
      return this.profile.id === this.currentUser.id
    }
  }
}
</script>
