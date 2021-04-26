<template>
  <span>
    <v-text-field v-model="rating" label="value" /><v-btn @click="submit"
      >Submit</v-btn
    ></span
  >
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'TeacherLevels',
  data() {
    return {
      rating: 0
    }
  },
  methods: {
    submit() {
      try {
        store.dispatch('createRating', {
          rate: this.rating,
          recipient_id: this.profile.id
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapGetters(['profile'])
  }
}
</script>
