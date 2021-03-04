<template>
  <v-layout fill-height>
    <v-flex>
      <v-toolbar flat color="rgba(0,0,0,0)">
        <v-btn outlined class="mr-3" @click="updateFocus">
          {{ $t('calendar.today') }}
        </v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>arrow_back_ios</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>arrow_forward_ios</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn outlined v-on="on">
              <span>{{ $t(`calendar.${calendarType}`) }}</span>
              <v-icon right>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="viewOption in calendarTypes"
              :key="viewOption"
              @click="() => updateType(viewOption)"
            >
              <v-list-item-title
                :class="{ 'primary--text': calendarType == viewOption }"
              >
                {{ $t(`calendar.${viewOption}`) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <Calendar ref="calendar" />
    </v-flex>
  </v-layout>
</template>

<script>
import Calendar from './Calendar'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  components: {
    Calendar
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'calendarTypes',
      'calendarType',
      'calendarFocus',
      'calendarStart',
      'calendarEnd'
    ]),
    title() {
      const { start, end } = this
      if (!start || !end) return ''
      const startMonth = this.monthFormatter(start)
      const startYear = start.year
      const startDay = start.day + this.nth(start.day)
      switch (this.calendarType) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
        default:
          return ''
      }
    },
    monthFormatter() {
      return this.$refs.calendar.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long'
      })
    }
  },
  methods: {
    viewDay({ date }) {
      store.dispatch('updateCalendarFocus', date)
      store.dispatch('updateCalendarType', 'day')
    },
    prev() {
      this.$refs.calendar.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.$refs.calendar.next()
    },
    nth(d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    updateFocus(newFocus = this.$moment(new Date()).format('YYYY-MM-DD')) {
      store.dispatch('updateCalendarFocus', newFocus)
    },
    updateType(newType) {
      console.log('updating type 1')
      store.dispatch('updateCalendarType', newType)
    }
  }
}
</script>
