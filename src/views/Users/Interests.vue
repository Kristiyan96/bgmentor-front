<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" md="7">
        <v-card class="pb-0" outlined>
          <v-card-title>
            <span class="headline">Активни заявки</span>
          </v-card-title>
          <v-card-text class="px-0 pb-0">
            <v-container class="px-0 pb-0">
              <v-row>
                <v-list two-line subheader v-if="interests.filter(i => i.active).length" style="width: 100%">
                  <v-list-item
                    v-for="interest in interests.filter(i => i.active)"
                    :key="interest.id"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="d-flex justify-space-between"><div>{{interest.name}} - {{interest.subject}} - {{interest.lesson}}</div> <div class="text-right">{{interest.phone}}</div></v-list-item-title>
                      <v-list-item-subtitle>{{interest.created_at | moment("from", "now")}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon @click="archive(interest)">
                        <font-awesome-icon icon="archive" class="grey--text" />
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
                <div v-else class="px-3 grey--text py-3">Няма нови заинтересовани</div>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" md="5">
        <v-card outlined>
          <v-card-title>
            <span class="headline">Архивирани заявки</span>
          </v-card-title>
          <v-list two-line subheader>
            <v-list-item
              v-for="interest in interests.filter(i => !i.active)"
              :key="interest.id"
            >
              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between"><div>{{interest.name}}</div> <div class="text-right">{{interest.phone}}</div></v-list-item-title>
                <v-list-item-subtitle>{{interest.created_at | moment("from", "now")}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="destroy(interest)">
                  <font-awesome-icon icon="trash-alt" class="grey--text" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_INTERESTS, ARCHIVE_INTEREST, DESTROY_INTEREST } from "@/store/actions.type";
import store from "@/store";

export default {
  data() {
    return {
    }
  },
  mounted() {
    store.dispatch(FETCH_INTERESTS);
  },
  methods: {
    archive(interest) {
      store.dispatch(ARCHIVE_INTEREST, {...interest, active: false});
    },
    destroy(interest) {
      store.dispatch(DESTROY_INTEREST, interest.id);
    }
  },
  computed: {
    ...mapGetters(["interests"]),
  }
}
</script>