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
      <TeacherSubjects />
    </template>
    <template v-slot:actions>
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
    </template>
  </LayoutColumn>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import LayoutColumn from '@/layout/LayoutColumn'
import TeacherSubjects from "./TeacherSubjects"

export default {
  components: {
    LayoutColumn,
    TeacherSubjects
  },
  data() {
    return {
      user: {},
      loading: false,
      descriptionRules: [(v) => !!v || 'Описанието е задължително.']
    }
  },
  mounted() {
    this.user = {
      ...this.currentUser
    }
  },
  methods: {
    submit() {
      this.loading = true
      store.dispatch('updateProfile', this.user).then((response) => {
        this.loading = false
      })
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
