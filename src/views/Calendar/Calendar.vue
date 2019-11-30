<template>
  <v-layout fill-height>
    <v-flex>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-3" @click="setToday">
            Today
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
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="calc(100vh - 135px)">
        <v-calendar
          ref="calendar"
          v-model="focus"
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
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon @click="eventDialogOpen = true">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <font-awesome-icon icon="trash-alt"  />
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <GroupMemberships :group="selectedEvent.group"/>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Затвори
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-flex>
    <LessonDialog
      :lesson="selectedEvent"
      :open="eventDialogOpen" 
      :start="start"
      :editing="selectedOpen"
      @closeDialog="eventDialogOpen = false"  
    />
  </v-layout>
</template>

<script>
import LessonDialog from "./LessonDialog";
import GroupMemberships from "@/views/Groups/GroupMemberships";
import { mapGetters } from "vuex";
import { FETCH_LESSONS } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    LessonDialog,
    GroupMemberships
  },
  data() {
    return {
      view: "events",
      today: this.$moment(new Date()).format("YYYY-MM-DD"),
      focus: this.$moment(new Date()).format("YYYY-MM-DD"),
      type: "week",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day"
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      weekdays: [1, 2, 3, 4, 5, 6, 0],
      eventDialogOpen: false,
      start: null
    }
  },
  mounted() {
    store.dispatch(FETCH_LESSONS);
  },
  computed: {
    ...mapGetters(["lessons"]),
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    newEvent(props) {
      if(this.selectedOpen) {
        this.selectedOpen = false;
        return;
      }
      this.start = props;
      this.eventDialogOpen = true;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
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
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  },
  watch: {
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
