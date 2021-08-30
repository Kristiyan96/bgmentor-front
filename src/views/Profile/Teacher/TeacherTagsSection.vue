<template>
  <v-card class="mx-auto mt-4" flat>
    <v-card-title>
      {{ $t(`profile.labels.${model}`) }}
      <v-spacer />
      <AddTag v-if="editable" :model="model" :suggestions="suggestions" />
    </v-card-title>
    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip
          v-for="m in profile[modelList]"
          :key="m"
          class="mr-2"
          color="primary"
          :close="editable"
          @click:close="deleteModel(m)"
        >
          {{ $t(`search.${model}.${m}`) }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import DialogForm from '@/components/DialogForm'
import AddTag from '@/views/Profile/Teacher/AddTeacherTag'

export default {
  name: 'TeacherTags',
  props: {
    model: {
      type: String,
      description: 'Which user field to edit. Has to be an array of tags'
    }
  },
  components: {
    DialogForm,
    AddTag
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async deleteModel(m) {
      this.loading = true
      const filteredList = this.currentUser[this.modelList]
        .filter((s) => s !== m)
        .join(', ')

      try {
        await store.dispatch('updateProfile', {
          [this.modelList]: filteredList
        })
        this.error = null
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'profile']),
    editable() {
      return this.profile.id === this.currentUser.id
    },
    modelList() {
      return `${this.model}_list`
    },
    suggestions() {
      return Object.keys(this.$t(`search.${this.model}`))
    }
  }
}
</script>
