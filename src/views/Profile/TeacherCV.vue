<template>
  <v-card class="mx-auto mt-4" outlined>
    <v-card-title>CV</v-card-title>
    <v-card-text>
      <EditorContent :editor="cv" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { Editor, EditorContent } from 'tiptap'

export default {
  name: 'TeacherLevels',
  components: {
    EditorContent
  },
  data() {
    return {
      loading: false,
      cv: ''
    }
  },
  mounted() {
    this.cv = this.profile.cv
  },
  methods: {
    async saveCV() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          cv: this.cv
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
