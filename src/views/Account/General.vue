<template>
  <LayoutColumnForm paddingless>
    <template v-slot:title>
      {{ $t('account.general.title') }}
    </template>

    <template v-slot:content>
      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="user.first_name"
          :label="$t('auth.label.firstName')"
          required
        >
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'user']"
            slot="prepend"
          />
        </v-text-field>
        <v-text-field
          v-model="user.last_name"
          :label="$t('auth.label.lastName')"
          required
        >
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'user']"
            slot="prepend"
          />
        </v-text-field>
        <v-text-field
          v-model="user.email"
          :label="$t('auth.label.email')"
          required
        >
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'at']"
            slot="prepend"
          />
        </v-text-field>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </v-form>
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
  </LayoutColumnForm>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import LayoutColumnForm from '@/layout/LayoutColumnForm'

export default {
  components: {
    LayoutColumnForm
  },
  data() {
    return {
      show: false,
      loading: false,
      user: {
        first_name: '',
        last_name: '',
        email: ''
      }
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
      } catch (error) {
        this.error = error.response.data.error
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    dirty() {
      return (
        this.user.first_name !== this.currentUser.first_name ||
        this.user.last_name !== this.currentUser.last_name ||
        this.user.email !== this.currentUser.email
      )
    }
  }
}
</script>
