<template>
  <LayoutColumn>
    <template v-slot:title>
      Локации
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
              v-if="locations.length"
              :headers="headers"
              :items="locations"
              :items-per-page="locations.length"
              hide-default-footer
              class="table-scroll"
            >
              <template v-slot:item="{ item }">
                <tr
                  @click="activate(item)"
                  :class="{active: location && item.id == location.id, fixed: item.fixed == true}"
                >
                  <td>{{ item.title }}</td>
                </tr>
              </template>
            </v-data-table>
            <div
              v-else
              class="px-3 grey--text py-3"
            >Няма локации</div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import { mapGetters } from "vuex";
import { FETCH_LOCATIONS } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    location: {
      type: Object,
      default: () => {},
      description: "Selected location"
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
          value: "title"
        }
      ]
    };
  },
  mounted() {
    store.dispatch(FETCH_LOCATIONS);
  },
  methods: {
    activate(item) {
      this.$emit("setLocation", item);
    },
    addNew() {
      this.$emit("setLocation", null);
    }
  },
  computed: {
    ...mapGetters(["locations"])
  },
  watch: {
    locations: {
      immediate: true,
      handler() {
        if (this.locations.length) {
          this.activate(this.locations[0]);
        } else {
          this.addNew();
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.fixed
  background-color: #E8F5E9
</style>