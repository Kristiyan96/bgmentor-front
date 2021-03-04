<template>
  <LayoutColumn paddingless>
    <template v-slot:title>
      {{ follow ? $t('follows.edit') : $t('follows.new') }}
    </template>

    <template v-slot:header-actions>
      <DeleteButton
        @confirm="destroy"
        tooltip="Delete follow"
        v-if="follow && currentUser.isAdmin"
      />
    </template>

    <template v-slot:content>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-text-field
            :label="$t('follows.form.name')"
            v-model="form.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-text-field
            v-if="follow && follow.id"
            disabled
            :label="$t('follows.form.phoneNumber')"
            v-model="form.phone_number"
          ></v-text-field>
          <PhoneNumber
            v-else
            @update="updatePhoneNumber"
            :label="$t('follows.form.phoneNumber')"
            value="form.phone_number"
          />
        </v-col>
      </v-row>
    </template>

    <template v-slot:actions>
      <v-btn :disabled="!dirty" depressed @click="reset" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        @click="submit"
        v-if="!follow"
      >
        Създай
      </v-btn>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        @click="update"
        v-else
      >
        Редактирай
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from '@/layout/LayoutColumn'
import { _ } from 'vue-underscore'
import { mapGetters } from 'vuex'
import store from '@/store'
import DeleteButton from '@/components/DeleteButton'
import PhoneNumber from '@/components/PhoneNumber'

export default {
  components: {
    DeleteButton,
    LayoutColumn,
    PhoneNumber
  },
  props: {
    follow: {
      type: Object,
      default: () => {},
      description: 'Follow to edit'
    }
  },
  data() {
    return {
      form: {
        name: '',
        phone_number: ''
      },
      followCopy: {
        name: '',
        phone_number: ''
      }
    }
  },
  methods: {
    submit() {
      store.dispatch('createFollow', this.form)
      this.reset()
    },
    update() {
      store.dispatch('updateFollow', this.form)
    },
    destroy() {
      store.dispatch('destroyFollow', this.follow.id)
    },
    reset() {
      this.form = { ...this.followCopy }
    },
    updatePhoneNumber({ input, formatted }) {
      this.form.phone_number = input
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    dirty() {
      return !_.isEqual(this.form, this.followCopy)
    }
  },
  watch: {
    follow: {
      immediate: true,
      handler() {
        this.form = { ...this.follow }
        this.followCopy = { ...this.form }
      }
    }
  }
}
</script>
