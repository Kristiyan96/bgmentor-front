<template>
  <LayoutColumn paddingless>
    <template v-slot:title> {{ $t('account.ad.title') }} </template>
    <template v-slot:content>
      <v-textarea
        class="mb-2"
        v-model="user.description"
        :label="$t('account.ad.education')"
        :rules="descriptionRules"
        required
      ></v-textarea>
      <div class="mb-5 d-flex">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="!dirty"
          depressed
          :loading="loading"
          @click="submit"
        >
          {{ $t('form.save') }}
        </v-btn>
      </div>
      <TeacherProducts />
    </template>
  </LayoutColumn>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import LayoutColumn from '@/layout/LayoutColumnDefault'
import TeacherProducts from './TeacherProducts'

export default {
  components: {
    LayoutColumn,
    TeacherProducts
  },
  data() {
    return {
      user: {},
      loading: false,
      error: '',
      descriptionRules: [(v) => !!v || 'Описанието е задължително.']
    }
  },
  mounted() {
    this.user = {
      ...this.currentUser
    }
  },
  methods: {
    async submit() {
      this.loading = true

      try {
        await store.dispatch('updateProfile', this.user)
        this.error = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
      await store.dispatch('updateProfile', this.user)
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    dirty() {
      return this.user.description !== this.currentUser.description
    }
  }
}
</script>
