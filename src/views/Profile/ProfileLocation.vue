<template>
  <div class="my-1 mb-3 subtitle-1 d-flex align-center">
    <span v-if="!editing">
      <v-btn
        @click="editing = true"
        color="primary"
        v-if="!editing"
        icon
        smallclass="mr-5"
      >
        <font-awesome-icon icon="edit" />
      </v-btn>
      <font-awesome-icon icon="map-marker-alt" class="mr-2" />
      {{ profile.city }}, {{ profile.country }}
    </span>
    <span class="d-flex" v-else>
      <v-container>
        <v-row>
          <v-text-field
            v-model="city"
            :label="$t(`profile.labels.city`)"
          ></v-text-field>
          <v-text-field
            v-model="country"
            :label="$t(`profile.labels.country`)"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn @click="cancelEditing" class="mr-2 mt-2" icon>
            <font-awesome-icon icon="times" />
          </v-btn>
          <v-btn
            @click="saveLocation"
            color="primary"
            class="mt-2"
            :loading="loading"
            icon
          >
            <font-awesome-icon icon="check" />
          </v-btn>
        </v-row>
      </v-container>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'TeacherLocation',
  components: {},
  props: {
    profile: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      country: '',
      city: '',
      editing: false
    }
  },
  mounted() {
    this.country = this.profile.country
    this.city = this.profile.city
  },
  methods: {
    async saveLocation() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          id: this.profile.id,
          country: this.country,
          city: this.city
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
      this.country = this.profile.country
      this.city = this.profile.city
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
