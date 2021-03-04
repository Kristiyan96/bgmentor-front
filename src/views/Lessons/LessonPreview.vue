<template>
  <LayoutColumn paddingless>
    <template v-slot:title>
      {{ lesson ? $t('lessons.edit') : $t('lessons.new') }}
    </template>

    <template v-slot:header-actions>
      <DeleteButton
        @confirm="destroy"
        tooltip="Delete lesson"
        v-if="lesson && currentUser.isAdmin"
      />
    </template>

    <template v-slot:content>
      <v-row>
        <v-col cols="12" class="px-0">
          <v-text-field
            :label="$t('lessons.form.student')"
            v-model="form.student_id"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="form.starts_at"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.starts_at"
                :label="$t('lessons.form.starts_at')"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu1"
              format="24hr"
              scrollable
              :label="$t('lessons.form.starts_at')"
              v-model="form.starts_at"
              @click:minute="$refs.menu1.save(form.starts_at)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="form.ends_at"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.ends_at"
                :label="$t('lessons.form.ends_at')"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              format="24hr"
              scrollable
              :label="$t('lessons.form.ends_at')"
              v-model="form.ends_at"
              @click:minute="$refs.menu2.save(form.ends_at)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-text-field
            :label="$t('lessons.form.location')"
            v-model="form.location"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="px-0">
          <v-text-field
            :label="$t('lessons.form.price')"
            v-model="form.price"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="px-0">
          <v-checkbox
            :label="$t('lessons.form.completed')"
            v-model="form.completed"
          ></v-checkbox>
        </v-col>
        <v-col cols="6" class="px-0">
          <v-checkbox
            :label="$t('lessons.form.cancelled')"
            v-model="form.cancelled"
          ></v-checkbox>
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
        v-if="!lesson"
      >
        Създай
      </v-btn>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        @click="submit"
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

export default {
  components: {
    DeleteButton,
    LayoutColumn
  },
  props: {
    lesson: {
      type: Object,
      default: () => {},
      description: 'Lesson to edit'
    }
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      form: {
        student_id: '',
        completed: false,
        cancelled: false,
        price: 0,
        starts_at: null,
        ends_at: null,
        location: ''
      },
      lessonCopy: {}
    }
  },
  methods: {
    submit() {
      store.dispatch('createLesson', this.form)
      this.reset()
    },
    destroy() {
      store.dispatch('destroyLesson', this.lesson.id)
    },
    reset() {
      this.form = { ...this.lessonCopy }
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    dirty() {
      return !_.isEqual(this.form, this.lessonCopy)
    }
  },
  watch: {
    lesson: {
      immediate: true,
      handler() {
        this.form = { ...this.lesson }
        this.lessonCopy = { ...this.form }
      }
    }
  }
}
</script>
