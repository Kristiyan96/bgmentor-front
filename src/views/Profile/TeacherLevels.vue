<template>
  <v-card class="mx-auto mt-4" outlined>
    <v-card-title>Levels</v-card-title>
    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <v-chip
          v-for="level in profile.level_list"
          :key="level"
          class="mr-2"
          color="primary"
          :close="deleteable"
          @click:close="deleteLevel(level)"
        >
          {{ level }}
        </v-chip>
        <AddLevel v-if="deleteable" />
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import DialogForm from '@/components/DialogForm'
import AddLevel from '@/views/Profile/AddLevel'

export default {
  name: 'TeacherLevels',
  components: {
    DialogForm,
    AddLevel
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async deleteLevel(level) {
      this.loading = true
      const levelList = this.currentUser.level_list
        .filter((l) => l !== level)
        .join(', ')

      try {
        await store.dispatch('updateProfile', {
          level_list: levelList
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
    deleteable() {
      return this.profile.id === this.currentUser.id
    }
  }
}
</script>
