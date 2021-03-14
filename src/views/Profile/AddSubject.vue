<template>
  <span>
    <v-chip outlined @click="openDialog">
      <font-awesome-icon icon="plus" class="mr-2" /> Add subject
    </v-chip>
    <DialogForm
      :open="open"
      :onSubmit="submit"
      @onClose="closeDialog"
      title="Add subject"
      :notice="notice"
      :error="error"
    >
      <v-text-field
        v-model="subject"
        label="Subject"
        placeholder="e.g Maths, Frech, Computer Science"
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
  name: 'TeacherSubjects',
  components: {
    DialogForm
  },
  data() {
    return {
      subject: '',
      subjectRules: [(v) => !!v || 'Предметът е задължителен.'],
      loading: false,
      open: false,
      notice: '',
      error: '',
      user: null
    }
  },
  mounted() {
    this.subject = ''
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
          subject_list: [...this.user.subject_list, this.subject].join(', ')
        })
        this.error = null
        this.closeDialog()
        this.subject = ''
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
