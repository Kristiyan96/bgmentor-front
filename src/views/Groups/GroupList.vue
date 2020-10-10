<template>
  <LayoutColumn class="group-list">
    <template v-slot:title>
      {{ type }} уроци
    </template>

    <template v-slot:header-actions>
      <v-btn icon @click="activate(null)">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
      <v-container class="px-0 pb-0">
        <v-row>
          <v-col cols="12" class="px-0 pb-0">
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
                  :class="{ active: group && item.id == group.id }"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.grade }}</td>
                </tr>
              </template>
            </v-data-table>
            <div v-else class="grey--text px-3">Няма групи</div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </LayoutColumn>
</template>

<script>
import {
  FETCH_USERS,
  FETCH_GROUPS,
  FETCH_PRICINGS,
  FETCH_LOCATIONS
} from "@/store/actions.type";
import store from "@/store";
import LayoutColumn from "@/layout/LayoutColumn";

export default {
  props: {
    groups: {
      type: Array,
      default: () => [],
      description: "Groups to display"
    },
    group: {
      type: Object,
      default: () => {},
      description: "Selected group"
    },
    type: {
      type: String,
      default: "Групови",
      description: "Type of groups"
    }
  },
  components: {
    LayoutColumn
  },
  data() {
    return {
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
    activate(item) {
      this.$emit("setGroup", item);
    }
  },
  watch: {
    groups() {
      if (this.groups.length) {
        this.activate(this.groups[0]);
      }
    }
  }
};
</script>

<style lang="sass">
.group-list
  tr.active
    background: #e3f0ff !important
  th:nth-child(1), td:nth-child(1)
    width: 80%
  th:nth-child(2), td:nth-child(2)
    width: 20%
</style>
