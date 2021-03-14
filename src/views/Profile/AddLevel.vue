<template>
  <span>
    <v-chip outlined @click="openDialog">
      <font-awesome-icon icon="plus" class="mr-2" /> Add
    </v-chip>
    <DialogForm
      :open="open"
      :onSubmit="submit"
      @onClose="closeDialog"
      title="Add level"
      :notice="notice"
      :error="error"
    >
      <v-text-field
        v-model="level"
        label="Level"
        placeholder="e.g Beginner, Intermediate, Advanced"
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
  data() {
    return {
      level: '',
      levelRules: [(v) => !!v || 'Предметът е задължителен.'],
      loading: false,
      open: false,
      notice: '',
      error: '',
      user: null
    }
  },
  mounted() {
    this.level = ''
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
          level_list: [...this.user.level_list, this.level].join(', ')
        })
        this.error = null
        this.closeDialog()
        this.level = ''
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
