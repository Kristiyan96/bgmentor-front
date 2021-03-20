<template>
  <div class="mb-5">
    <v-row class="absolute-center">
      <v-img
        :src="`${urlBase}${teacher.avatar_url}`"
        class="img"
        @click="showEdit"
      ></v-img>
      <MyUpload
        @crop-success="cropSuccess"
        v-model="show"
        :width="200"
        :height="200"
        :headers="headers"
        :lang-ext="$t(`$imageCrop`)"
        img-format="png"
      />
    </v-row>
  </div>
</template>

<script>
import MyUpload from 'vue-image-crop-upload'
import store from '@/store'
import { mapGetters } from 'vuex'
import { API_URL } from '@/backend/axios/config'

export default {
  name: 'TeacherImage',
  components: {
    MyUpload
  },
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: 'Teacher being displayed'
    }
  },
  data() {
    return {
      urlBase: API_URL,
      avatar: null,
      show: false,
      headers: {
        smail: '*_~'
      },
      activeEdit: false
    }
  },
  mounted() {
    this.resetImage()
  },
  methods: {
    resetImage() {
      this.avatar = this.teacher.avatar
    },
    showEdit() {
      if (this.editable) {
        this.show = true
      }
    },
    async cropSuccess(imgDataUrl) {
      this.show = false
      this.avatar = imgDataUrl
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          avatar: imgDataUrl
        })
        this.error = null
        this.$store.commit('ADD_ALERT', [
          'Avatar updated successfully!!',
          'success'
        ])
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
    }
  }
}
</script>

<style scoped lang="sass">
.img
  border-radius: 5px
  max-height: 300px
  max-width: 300px
  z-index: 2
.absolute-center
  display: flex
  align-items: center
  justify-content: center
  text-align: center
  z-index: 9
</style>
