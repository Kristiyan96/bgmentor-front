<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    scrollable
  >
    <template v-slot:activator="{ on }">
      <v-btn
        outlined
        v-on="on"
      >Добави ученици</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Ученици</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          class="pt-0"
        ></v-text-field>
      </v-card-title>
      <v-divider />
      <v-card-text class="students-list">
        <v-container>
          <v-data-table
            show-select
            :headers="headers"
            :items="queriedStudents"
            :items-per-page="10"
            v-model="selectedUsers"
            :mobile-breakpoint="10"
          >
            <template v-slot:header="{ props: { headers } }">
              <thead>
                <tr>
                  <th :colspan="headers.length">
                    {{ selectedUsers.length }} избрани ученици
                  </th>
                </tr>
              </thead>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >Затвори</v-btn>
        <v-btn
          color="blue darken-1"
          outlined
          @click="addMembers"
        >Добави</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_USERS, CREATE_MEMBERSHIP } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    group: {
      type: Object,
      default: () => {},
      description: "Group to edit"
    },
    memberships: {
      type: Array,
      default: () => [],
      description: "An array of existing memberships"
    }
  },
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Ученик",
          align: "left",
          sortable: true,
          value: "name"
        }
      ],
      selectedUsers: []
    };
  },
  mounted() {
    store.dispatch(FETCH_USERS);
  },
  methods: {
    addMembers() {
      let params = this.selectedUsers.map(u => {
        return { user_id: u.id, group_id: this.group.id };
      });
      store.dispatch(CREATE_MEMBERSHIP, params).then(response => {
        this.dialog = false;
      });
    }
  },
  computed: {
    ...mapGetters(["students"]),
    availableStudents() {
      let member_ids = this.memberships.map(m => m.student.id);
      return this.students.filter(s => !member_ids.includes(s.id));
    },
    queriedStudents() {
      return this.availableStudents.filter(
        s => s.name.toLowerCase().search(this.search.toLowerCase()) != -1
      );
    }
  }
};
</script>

<style lang="sass">
.students-list
  padding: 0px !important
  th:nth-child(1), td:nth-child(1)
    width: 10% !important
  th:nth-child(2), td:nth-child(2)
    width: 90% !important
</style>