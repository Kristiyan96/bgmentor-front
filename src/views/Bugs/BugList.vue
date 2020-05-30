<template>
  <LayoutColumn class="bugs-list">
    <template v-slot:title>
      Бъгове
    </template>

    <template v-slot:header-actions>
      <v-btn
        icon
        @click="addNew"
      >
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
      <v-container class="px-0 pb-0">
        <v-row>
          <v-col
            cols="12"
            class="px-0 pb-0"
          >
            <v-data-table
              v-if="bugs.length"
              :headers="headers"
              :items="bugs"
              :items-per-page="bugs.length"
              hide-default-footer
              class="table-scroll"
            >
              <template v-slot:item="{ item }">
                <tr
                  @click="activate(item)"
                  :class="{active: bug && item.id == bug.id, fixed: item.fixed == true}"
                >
                  <td>{{ item.title }}</td>
                  <td>
                    <v-btn
                      class="mx-2"
                      fab
                      small
                      depressed
                      @click="complete(item)"
                      v-if="!item.fixed"
                    >
                      <font-awesome-icon
                        icon="check"
                        class="grey--text"
                      />
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      fab
                      small
                      depressed
                      @click="destroy(item)"
                    >
                      <font-awesome-icon
                        icon="trash-alt"
                        class="grey--text"
                      />
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
            <div
              v-else
              class="px-3 grey--text py-3"
            >Няма бъгове</div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import { mapGetters } from "vuex";
import { FETCH_BUGS, UPDATE_BUG, DESTROY_BUG } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    bug: {
      type: Object,
      default: () => {},
      description: "The selected bug"
    }
  },
  components: {
    LayoutColumn
  },
  data() {
    return {
      headers: [
        {
          text: "Заглавие",
          align: "left",
          value: "title"
        },
        {
          text: "Действия",
          align: "right",
          value: ""
        }
      ]
    };
  },
  mounted() {
    store.dispatch(FETCH_BUGS);
  },
  methods: {
    activate(item) {
      this.$emit("setBug", item);
    },
    addNew() {
      this.$emit("setBug", null);
    },
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    complete(bug) {
      store.dispatch(UPDATE_BUG, { ...bug, fixed: true });
    },
    destroy(bug) {
      store.dispatch(DESTROY_BUG, bug.id);
    }
  },
  computed: {
    ...mapGetters(["bugs"])
  },
  watch: {
    bugs() {
      if (this.bugs.length) {
        this.$emit("setBug", this.bugs[0]);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.fixed
  background-color: #E8F5E9
.bugs-list
  th:nth-child(1), td:nth-child(1)
    width: 60%
  th:nth-child(2), td:nth-child(2)
    width: 40%
</style>