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
              <AddMembers :group="group" :memberships="memberships" />
            </th>
          </tr>
        </thead>
        <thead v-else>
          <tr>
            <th :colspan="headers.length">
              <div class="d-flex">
                <PaymentDialog :group="group" :memberships="selectedUsers" />
                <v-spacer />
                <v-btn color="red" text>
                  <font-awesome-icon icon="trash-alt" />
                </v-btn>
              </div>
            </th>
          </tr>
        </thead>
    </template>

    <template v-slot:item.name="{ item }">
      {{ item.student.name }}
    </template>
  </v-data-table>
</template>

<script>
import AddMembers from "./GroupAddStudentsDialog";
import PaymentDialog from "./GroupAddPaymentDialog";
import { mapGetters } from "vuex";
import { FETCH_MEMBERSHIPS, CREATE_MEMBERSHIP, UPDATE_MEMBERSHIP, DESTROY_MEMBERSHIP } from "@/store/actions.type";
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