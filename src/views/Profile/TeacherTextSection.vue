<template>
  <v-card class="mx-auto mt-4" flat>
    <v-card-title>
      {{ $t(`profile.titles.${model}`) }}
      <v-spacer />
      <div v-if="editable">
        <v-btn
          @click="editing = true"
          outlined
          color="primary"
          v-if="!editing"
          small
        >
          <font-awesome-icon icon="edit" class="mr-2" />
          {{ $t(`actions.update`) }}
        </v-btn>
        <v-btn @click="cancelEditing" text v-if="editing" class="mr-2">
          <font-awesome-icon icon="times" class="mr-2" />
          {{ $t(`actions.cancel`) }}
        </v-btn>
        <v-btn
          @click="saveModelValue"
          outlined
          color="primary"
          v-if="editing"
          :loading="loading"
        >
          <font-awesome-icon icon="save" class="mr-2" />
          {{ $t(`actions.save`) }}
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <VueEditor v-model="modelValue" v-if="editing" />

      <p class="subtitle-1 font-weight-bold mt-5" v-if="editing">
        {{ $t(`actions.preview`) }}
      </p>
      <div v-html="modelValue" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'TeacherTextModel',
  components: {
    VueEditor
  },
  props: {
    model: {
      type: String,
      description: 'Which user text field to edit'
    }
  },
  data() {
    return {
      loading: false,
      modelValue: '',
      editing: false
    }
  },
  mounted() {
    this.modelValue = this.profile[this.model]
  },
  methods: {
    async saveModelValue() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', {
          [this.model]: this.modelValue
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
      this.modelValue = this.profile[this.model]
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
