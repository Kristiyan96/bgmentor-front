<template>
  <v-sheet color="rgba(0,0,0,0)">
    <v-calendar
      ref="calendar"
      v-model="local_focus"
      color="rgba(0,0,0,0)"
      first-interval="8"
      interval-count="11"
      :weekdays="weekdays"
      :events="events"
      event-start="start_time"
      event-end="end_time"
      :event-color="getEventColor"
      :event-margin-bottom="3"
      :now="calendarFocus"
      :type="calendarType"
      :weekday-format="(d) => $t(`calendar.weekdays.${d.weekday}`)"
      :interval-format="(d) => d.time"
      @click:event="showEvent"
      @click:more="() => updateType('day')"
      @click:date="() => updateType('day')"
      @click:time="newEvent"
      @change="updateRange"
    ></v-calendar>
    <LessonDialog
      :lesson="selectedEvent"
      :open="eventDialogOpen"
      :start="new_event_start"
      @closeDialog="eventDialogOpen = false"
    />
  </v-sheet>
</template>

<script>
import LessonDialog from './LessonDialog'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: {
    LessonDialog
  },
  data() {
    return {
      local_focus: null,
      weekdays: [1, 2, 3, 4, 5, 6, 0],
      events: [],
      eventDialogOpen: false,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      new_event_start: null
    }
  },
  methods: {
    updateType(type) {
      console.log('updating type 2')
      store.dispatch('updateCalendarType', type)
    },
    getEventColor(event) {
      return event ? event.color : '#fff'
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    newEvent(props) {
      this.selectedEvent = { ...store.state.lessons.new_lesson }
      if (this.selectedOpen) {
        this.selectedOpen = false
        return
      }
      this.new_event_start = props
      this.eventDialogOpen = true
    },
    lessonDeleted() {
      this.selectedEvent = {}
      this.selectedElement = null
    },
    editLesson() {
      this.eventDialogOpen = true
    },
    updateRange({ start, end }) {
      store.dispatch('updateCalendarStart', start)
      store.dispatch('updateCalendarEnd', end)
    }
  },
  computed: {
    ...mapGetters(['lessons', 'calendarFocus', 'calendarType'])
  },
  watch: {
    calendarFocus: {
      immediate: true,
      handler() {
        this.local_focus = this.calendarFocus
      }
    },
    local_focus() {
      if (this.local_focus !== this.calendarFocus) {
        store.dispatch('updateCalendarFocus', this.local_focus)
      }
    },
    lessons() {
      this.events = this.lessons.map((l) => {
        return {
          ...l,
          start_time: this.$moment
            .tz(l.start_time, 'Europe/Sofia')
            .format('YYYY-MM-DD HH:mm'),
          end_time: this.$moment
            .tz(l.end_time, 'Europe/Sofia')
            .format('YYYY-MM-DD HH:mm'),
          color: 'primary',
          name: l.teacher ? l.teacher.name : ''
        }
      })
    }
  }
}
</script>

<style scoped>
>>> .v-calendar-daily__scroll-area {
  overflow-y: auto;
}
>>> .v-calendar.v-calendar-daily {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
