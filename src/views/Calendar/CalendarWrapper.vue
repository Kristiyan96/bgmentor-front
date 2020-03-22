<template>
  <v-layout fill-height>
    <v-flex>
      <v-toolbar flat color="rgba(0,0,0,0)">
        <v-btn outlined class="mr-3" @click="setToday">
          {{ $t("calendar.today") }}
        </v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>arrow_back_ios</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>arrow_forward_ios</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <FiltersDialog :filters="filters"/>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn outlined v-on="on">
              <span>{{ $t(`calendar.${type}`) }}</span>
              <v-icon right>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="viewOption in viewOptions"
              :key="viewOption"
              @click="type = viewOption"  
            >
              <v-list-item-title :class="{'primary--text': type == viewOption}">
                {{ $t(`calendar.${viewOption}`) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <Calendar
        ref="calendar"
        :today="today"
        :type="type"
        :focus="focus"
        :lessonQuery="lessonQuery"
        @updateFocus="updateFocus"
        @updateType="updateType"
        @updateRange="updateRange"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Calendar from './Calendar';
import FiltersDialog from './LessonFilterDialog';

export default {
  components: {
    Calendar,
    FiltersDialog
  },
  props: {
    lessonQuery: {
      type: Object,
      default: null,
      description: "Search quuery for lessons"
    },
    filters: {
      type: Object,
      default: {},
      description: "Calendar filters"
    }
  },
  data() {
    return {
      today: this.$moment(new Date()).format("YYYY-MM-DD"),
      focus: this.$moment(new Date()).format("YYYY-MM-DD"),
      type: "week",
      start: null,
      end: null,
      viewOptions: ["day", "week", "month"]
    }
  },
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) return "";

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
        default:
          return "";
      }
    },
    monthFormatter() {
      return this.$refs.calendar.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.$refs.calendar.next();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    updateFocus(new_focus) {
      this.focus = new_focus;
    },
    updateType(new_type) {
      this.type = new_type;
    }
  },
};
</script>
