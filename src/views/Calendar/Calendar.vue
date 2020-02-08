<template>
  <v-sheet height="calc(100vh - 135px)">
    <v-calendar
      ref="calendar"
      v-model="local_focus"
      color="primary"
      first-interval="8"
      interval-count="12"
      :weekdays="weekdays"
      :events="events"
      event-start="start_time"
      event-end="end_time"
      :event-color="getEventColor"
      :event-margin-bottom="3"
      :now="today"
      :type="type"
      @click:event="showEvent"
      @click:more="viewDay"
      @click:date="viewDay"
      @click:time="newEvent"
      @change="updateRange"
    ></v-calendar>
    <LessonDialog
      :lesson="selectedEvent"
      :open="eventDialogOpen" 
      :start="new_event_start"
      @closeDialog="eventDialogOpen = false"  
    />
    <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <LessonPreview 
        v-if="selectedElement" 
        :lesson="selectedEvent"
        :eventDialogOpen="eventDialogOpen"
        @lessonDeleted="lessonDeleted"
        @editLesson="editLesson"
        @onClose="selectedOpen = false"
      />
    </v-menu>
  </v-sheet>
</template>

<script>
import LessonPreview from "./LessonPreview";
import LessonDialog from "./LessonDialog";
import { mapGetters } from "vuex";
import { FETCH_LESSONS, FETCH_LOCATIONS, DESTROY_LESSON } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    LessonPreview,
    LessonDialog
  },
  props: {
    focus: {
      type: String,
      default: null,
      description: "Currently selected date"
    },
    today: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "week",
      description: "Type of the calendar view day/week/month"
    },
    start: {
      type: String,
      default: null
    }
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
  mounted() {
    store.dispatch(FETCH_LESSONS);
    store.dispatch(FETCH_LOCATIONS);
  },
  methods: {
    updateFocus() {
      this.$emit("updateFocus", this.local_focus);
    },
    getEventColor(event) {
      return event.color;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      }

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    viewDay({ date }) {
      this.$emit('updateFocus', date);
      this.$emit('updateType', 'day');
    },
    newEvent(props) {
      this.selectedEvent = {...store.state.lessons.new_lesson};
      if(this.selectedOpen) {
        this.selectedOpen = false;
        return;
      }
      this.new_event_start = props;
      this.eventDialogOpen = true;
    },
    lessonDeleted() {
      this.selectedEvent = {};
      this.selectedElement = null;
    },
    editLesson() {
      this.eventDialogOpen = true;
    },
    updateRange(props) {
      this.$emit("updateRange", props);
    },
    getEventColor (event) {
      return this.locations.find(l => l.id == event.group.location_id).color;
    },
  },
  computed: {
    ...mapGetters(["lessons", "locations"]),
  },
  watch: {
    focus: {
      immediate: true,
      handler() {
        this.local_focus = this.focus;
      }
    },
    lessons() {
      this.events = this.lessons.map(l => {
        return {
          ...l,
          start_time: this.$moment(l.start_time).format("YYYY-MM-DD HH:mm"),
          end_time: this.$moment(l.end_time).format("YYYY-MM-DD HH:mm"),
          color: 'primary',
          name: `${l.teacher.name} - ${l.group.name}` 
        }
      });
    }
  }
};
</script>
