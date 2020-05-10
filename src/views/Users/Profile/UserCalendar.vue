<template>
  <v-skeleton-loader
    :loading="loading"
    class="mx-auto"
    type="card"
  >
    <Calendar :filters="filters" />
  </v-skeleton-loader>
</template>

<script>
import Calendar from "@/views/Calendar/CalendarWrapper";
import store from "@/store";

export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
      description: "Is the user fetched"
    },
    profile: {
      type: Object,
      default: () => {},
      description: "Whose calendar?"
    }
  },
  components: {
    Calendar
  },
  data() {
    return {
      filters: {
        searching: true
      }
    };
  },
  watch: {
    profile: {
      immediate: true,
      handler() {
        if (this.profile.role == "teacher") {
          this.filters.teacher_id = this.profile.id;
        } else if (this.profile.role == "student") {
          this.filters.user_id = this.profile.id;
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped></style>