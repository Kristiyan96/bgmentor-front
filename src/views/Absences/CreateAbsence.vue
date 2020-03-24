<template>
  <v-btn-toggle
    dense
    group
  >
    <v-btn text value="left" @click="createAbsence(true)" :disabled="!canCreateExcusedAbsence">
      Ще отсъства
    </v-btn>

    <v-btn text value="justify" @click="createAbsence(false)" :disabled="!canCreateAbsence">
      Отсъства
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import { mapGetters } from "vuex";
import { CREATE_ABSENCE, FETCH_MEMBERSHIPS } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    selectedMemberships: {
      type: Array,
      default: () => [],
      description: "ids of the students that are/will be absent"
    },
    lesson: {
      type: Object,
      default: () => {},
      description: "The object of the lesson"
    }
  },
  data() {
    return {

    }
  },
  computed: {
    canCreateExcusedAbsence() {
      let membership_ids = this.selectedMemberships.map(m => m.id);
      return this.lesson.absences.filter(a => membership_ids.includes(a.membership_id) && a.excused).length == 0; 
    },
    canCreateAbsence() { // not excused
      let membership_ids = this.selectedMemberships.map(m => m.id);
      return this.lesson.absences.filter(a => membership_ids.includes(a.membership_id) && !a.excused).length == 0; 
    }
  },
  methods: {
    createAbsence(excused) {
      let params = this.selectedMemberships.map(m => {
        return {
          'user_id': m.user_id,
          'lesson_id': this.lesson.id,
          'excused': excused
        }
      })
      store.dispatch(CREATE_ABSENCE, params).then(response => {
        store.dispatch(FETCH_MEMBERSHIPS, this.selectedMemberships[0].group_id);
      })
    }
  }
}
</script>