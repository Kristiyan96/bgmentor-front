<template>
  <div class="my-1 mb-3 h5 grey--text d-flex align-center">
    <v-btn
      @click="editing = true"
      color="primary"
      v-if="!editing"
      icon
      smallclass="mr-5"
    >
      <font-awesome-icon icon="edit" />
    </v-btn>
    <span v-if="!editing">{{ profile.title }}</span>
    <span class="d-flex" v-else>
      <v-text-field
        v-model="title"
        :label="$t(`profile.labels.title`)"
      ></v-text-field>
      <v-btn @click="cancelEditing" class="mr-2 mt-2" icon>
        <font-awesome-icon icon="times" />
      </v-btn>
      <v-btn
        @click="saveTitle"
        color="primary"
        class="mt-2"
        :loading="loading"
        icon
      >
        <font-awesome-icon icon="check" />
      </v-btn>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'TeacherTitle',
  components: {},
  props: {
    teacher: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      title: '',
      editing: false
    }
  },
  mounted() {
    this.title = this.profile.title
  },
  methods: {
    async saveTitle() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          id: this.profile.id,
          title: this.title
        })
        this.error = null
        this.editing = false
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    cancelEditing() {
      this.editing = false
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
