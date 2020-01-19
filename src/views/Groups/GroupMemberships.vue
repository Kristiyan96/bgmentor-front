<template>
  <v-data-table
    show-select
    :headers="headers"
    :items="memberships"
    :items-per-page="10"
    v-model="selectedUsers"
  >
    <template v-slot:header="{ props: { headers } }">
      <thead v-if="!selectedUsers.length">
        <tr>
          <th :colspan="headers.length">
            <AddMembers :group="group" :memberships="memberships"/>
          </th>
        </tr>
      </thead>
      <thead v-else>
        <tr>
          <th :colspan="headers.length">
            <div class="d-flex">
              <PaymentDialog :group="group" :memberships="selectedUsers" />
              <v-btn outlined @click="createAbsence" class="ml-2">Отсъства</v-btn>
              <v-spacer />
              <v-btn color="red" text v-if="!calendar">
                <font-awesome-icon icon="trash-alt" />
              </v-btn>
            </div>
          </th>
        </tr>
        </thead>
    </template>

    <template v-slot:item.name="{ item }">
      <div style="display: flex">
        {{ item.student.name }}
        <v-spacer />
        <font-awesome-icon icon="check" class="green--text" v-if="item.paid"/>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import AddMembers from "./GroupAddStudentsDialog";
import PaymentDialog from "./GroupAddPaymentDialog";
import { mapGetters } from "vuex";
import { FETCH_MEMBERSHIPS, CREATE_ABSENCE } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    AddMembers,
    PaymentDialog
  },
  props: {
    group: {
      type: Object,
      default: () => {},
      description: "Group to crud memberships in"
    },
    calendar: {
      type: Boolean,
      default: false,
      description: "Is it displayed in a calendar event"
    },
    lesson: {
      type: Object,
      default: () => {},
      description: "The selected lesson"
    }
  },
  data() {
    return {
      selectedUsers: [],
      headers: [
        {
          text: 'Ученик',
          align: 'left',
          sortable: true,
          value: "name"
        }
      ],
    }
  },
  methods: {
    createAbsence() {
      let params = this.selectedUsers.map(u => {
        return {"user_id": u.id, "lesson_id": this.lesson.id}
      });
      store.dispatch(CREATE_ABSENCE, params);
    }
  },
  computed: {
    ...mapGetters(["memberships"]),
  },
  watch: {
    group: {
      immediate: true,
      handler() {
        if(this.group) {
          this.selectedUsers = [];
          store.dispatch(FETCH_MEMBERSHIPS, this.group.id);
        }
      }
    }
  }
}
</script>