<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" md="5">
        <v-card class="pb-0" outlined>
          <v-card-title>
            <span class="headline">Локации</span>
            <v-spacer />
            <v-btn icon @click="location = null">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-0 pb-0">
            <v-container class="px-0 pb-0">
              <v-row>
                <v-col cols="12" class="px-0 pb-0">
                  <v-data-table
                    v-if="locations.length"
                    :headers="headers"
                    :items="locations"
                    :items-per-page="locations.length"
                    hide-default-footer
                    class="table-scroll"
                  >
                    <template v-slot:item="{ item }">
                      <tr @click="activate(item)" :class="{active: location && item.id == location.id, fixed: item.fixed == true}">
                        <td>{{ item.title }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                  <div v-else class="px-3 grey--text py-3">Няма локации</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" md="7">
        <LocationPreview :location="location" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LocationPreview from "@/views/Locations/LocationPreview";
import { mapGetters } from "vuex";
import { FETCH_LOCATIONS } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    LocationPreview
  },
  data() {
    return {
      location: null,
      headers: [
        {
          text: 'Име',
          align: 'left',
          value: 'title',
        },
      ]
    }
  },
  mounted() {
    store.dispatch(FETCH_LOCATIONS);
  },
  methods: {
    activate(item) {
      this.location = item;
    },
  },
  computed: {
    ...mapGetters(["locations"]),
  },
  watch: {
    locations: {
      immediate: true,
      handler() {
        if(this.locations.length) {
          this.location = this.locations[0];
        } else {
          this.location = null;
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.fixed
  background-color: #E8F5E9
</style>