<template>
  <div>
    <v-btn fab text small @click="open = true">
      <font-awesome-icon icon="filter" />
    </v-btn>

    <v-dialog v-model="open" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Филтър на уроците</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  :items="teachers"
                  v-model="query.teacher_id"
                  item-text="name"
                  item-value="id"
                  label="Учител"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="students"
                  v-model="query.user_id"
                  item-text="name"
                  item-value="id"
                  label="Ученик"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Затвори</v-btn>
          <v-btn color="blue darken-1" outlined @click="applyFilters"
            >Приложи</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  props: {
    filters: {
      type: Object,
      default: () => {},
      description: 'Calendar filters'
    }
  },
  data() {
    return {
      open: false,
      query: {
        teacher_id: null,
        user_id: null,
        searching: true
      }
    }
  },
  computed: {
    ...mapGetters(['groups_individuals'])
  },
  methods: {
    closeDialog() {
      this.open = false
    },
    applyFilters() {
      store.dispatch('fetchLessons', this.query)
      this.closeDialog()
    }
  },
  watch: {
    filters: {
      immediate: true,
      handler() {
        store.dispatch('fetchLessons', this.filters)
      }
    }
  }
}
</script>
