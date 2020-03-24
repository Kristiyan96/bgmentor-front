<template>
  <v-data-table
    show-select
    :headers="headers"
    :items="memberships"
    :items-per-page="10"
    v-model="selectedMemberships"
  >
    <template v-slot:header="{ props: { headers } }">
      <thead v-if="!selectedMemberships.length">
        <tr>
          <th :colspan="headers.length">
            <AddMembers :group="group" :memberships="memberships"/>
          </th>
        </tr>
      </thead>
      <thead v-else>
        <tr>
          <th :colspan="headers.length">
            <div class="d-flex align-center">
              <PaymentDialog :group="group" :memberships="selectedMemberships" />
              <CreateAbsence 
                v-if="calendar"
                :selectedMemberships="selectedMemberships"
                :lesson="lesson"
              />
              <v-spacer />
              <v-btn outlined color="red" class="ml-2" v-if="!calendar" @click="destroyMembership">
                Махни от групата
              </v-btn>
            </div>
          </th>
        </tr>
        </thead>
    </template>

    <template v-slot:item.name="{ item }">
      <div style="display: flex">
        <v-btn text :href="`/profiles/${item.student.id}`">{{ item.student.name }}</v-btn>
      </div>
    </template>

    <template v-slot:item.credit="{ item }">
      <span class="pr-4" :class="{'red--text': item.credit < 1}">{{ item.credit }}</span>
    </template>
  </v-data-table>
</template>

<script>
import AddMembers from "./GroupAddStudentsDialog";
import PaymentDialog from "./GroupAddPaymentDialog";
import CreateAbsence from "@/views/Absences/CreateAbsence";
import { mapGetters } from "vuex";
import { FETCH_MEMBERSHIPS, CREATE_ABSENCE, DESTROY_MEMBERSHIP } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    AddMembers,
    PaymentDialog,
    CreateAbsence
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
      selectedMemberships: [],
      headers: [
        {
          text: 'Ученик',
          align: 'left',
          sortable: true,
          value: "name"
        },
        {
          text: 'Оставащи посещения',
          value: 'credit',
          align: 'right'
        }
      ],
    }
  },
  methods: {
    destroyMembership() {
      store.dispatch(DESTROY_MEMBERSHIP, this.selectedMemberships);
      this.selectedMemberships = [];
    }
  },
  computed: {
    ...mapGetters(["memberships"])
  },
  watch: {
    group: {
      immediate: true,
      handler() {
        if(this.group) {
          this.selectedMemberships = [];
          store.dispatch(FETCH_MEMBERSHIPS, this.group.id);
        }
      }
    }
  }
}
</script>