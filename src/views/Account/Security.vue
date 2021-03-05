<template>
  <LayoutColumn>
    <template v-slot:title> {{ $t('account.security.title') }} </template>

    <template v-slot:content>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn @click="changePassword">{{
                $t('account.security.changePassword')
              }}</v-btn>
            </v-list-item-title>
            <v-list-item-subtitle>{{
              $t('account.security.changePasswordInfo')
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('account.security.changePhone') }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              $t('account.security.changePhoneInfo')
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from '@/layout/LayoutColumn'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  components: {
    LayoutColumn
  },
  data() {
    return {
      loading: false,
      error: ''
    }
  },
  methods: {
    async changePassword() {
      this.loading = true

      try {
        await store.dispatch('send_password_reset', this.currentUser.email)
        this.error = ''
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>
