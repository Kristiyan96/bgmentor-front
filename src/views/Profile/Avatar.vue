<template>
  <div class="img-wrapper">
    <v-img :src="imageSrc" class="img" @click="showEdit"></v-img>
    <div class="gradient" v-if="gradient"></div>
    <MyUpload
      @crop-success="cropSuccess"
      v-model="show"
      :width="200"
      :height="200"
      :headers="headers"
      :lang-ext="$t(`$imageCrop`)"
      img-format="png"
    />
  </div>
</template>

<script>
import MyUpload from 'vue-image-crop-upload'
import store from '@/store'
import { mapGetters } from 'vuex'
import { API_URL } from '@/backend/axios/config'

export default {
  name: 'ProfileImage',
  components: {
    MyUpload
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: 'User being displayed'
    },
    gradient: {
      type: Boolean,
      default: false,
      description: 'Add gradient at the bottom'
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
      this.avatar = this.profile.avatar
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
    },
    imageSrc() {
      return this.profile.avatar_url
        ? `${this.urlBase}${this.profile.avatar_url}`
        : 'https://picsum.photos/200/200'
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
.img-wrapper
  display: flex
  justify-content: center
.gradient
  background: linear-gradient(180deg, rgba(2,0,36,0.01) 60%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0.9) 100%)
  height: 50%
  width: 300px
  z-index: 90
  position: absolute
  bottom: 0
</style>
