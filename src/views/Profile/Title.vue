<template>
  <div class="my-1 mb-3 h5 grey--text d-flex align-center">
    <v-btn
      @click="openDialog"
      color="primary"
      icon
      smallclass="mr-5"
      v-if="editable"
    >
      <font-awesome-icon icon="edit" />
    </v-btn>
    <span>{{
      profile.title ? profile.title : editable ? 'Empty title' : ''
    }}</span>
    <DialogForm
      :open="open"
      :onSubmit="saveTitle"
      @onClose="closeDialog"
      :title="$t(`profile.titles.title`)"
      :error="error"
    >
      <v-text-field
        v-model="title"
        :label="$t(`profile.labels.title`)"
      ></v-text-field>
    </DialogForm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import DialogForm from '@/components/DialogForm'

export default {
  name: 'Title',
  components: {
    DialogForm
  },
  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      title: '',
      open: false,
      error: null
    }
  },
  mounted() {
    this.resetEditing()
  },
  methods: {
    openDialog() {
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.resetEditing()
    },
    async saveTitle() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          id: this.profile.id,
          title: this.title
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
      this.title = this.profile.title
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
