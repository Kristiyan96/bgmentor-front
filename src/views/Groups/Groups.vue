<template>
  <v-container fluid>
    <v-row>
      <v-col
        xs="12"
        md="5"
      >
        <v-card
          class="pb-0"
          outlined
        >
          <v-card-title>
            <span class="headline">Групови уроци</span>
            <v-spacer />
            <v-btn
              icon
              @click="group = null"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-0 pb-0">
            <v-container class="px-0 pb-0">
              <v-row>
                <v-col
                  cols="12"
                  class="px-0 pb-0"
                >
                  <v-data-table
                    v-if="groups.length"
                    :headers="headers"
                    :items="groups"
                    :items-per-page="groups.length"
                    hide-default-footer
                    class="table-scroll"
                  >
                    <template v-slot:item="{ item }">
                      <tr
                        @click="activate(item)"
                        :class="{active: group && item.id == group.id}"
                      >
                        <td>{{ item.name }}</td>
                        <td>{{ item.grade }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                  <div
                    v-else
                    class="grey--text px-3"
                  >Няма групи</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        xs="12"
        md="7"
      >
        <GroupForm :group="group" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_USERS,
  FETCH_GROUPS,
  FETCH_PRICINGS,
  FETCH_LOCATIONS,
  CREATE_GROUP,
  UPDATE_GROUP
} from "@/store/actions.type";
import store from "@/store";

import GroupForm from "./GroupForm";

export default {
  components: {
    GroupForm
  },
  data() {
    return {
      group: null,
      editing: false,
      headers: [
        {
          text: "Име",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Клас", value: "grade" }
      ]
    };
  },
  mounted() {
    store.dispatch(FETCH_GROUPS);
    store.dispatch(FETCH_USERS);
    store.dispatch(FETCH_PRICINGS);
    store.dispatch(FETCH_LOCATIONS);
  },
  methods: {
    activate(group) {
      this.group = group;
    }
  },
  computed: {
    ...mapGetters(["groups"])
  },
  watch: {
    groups() {
      if (this.groups.length) {
        this.group = this.groups[0];
      }
    }
  }
};
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
</style>