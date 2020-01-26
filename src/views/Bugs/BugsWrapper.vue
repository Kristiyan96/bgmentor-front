<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" md="5">
        <v-card class="pb-0">
          <v-card-title>
            <span class="headline">Бъгове</span>
            <v-spacer />
            <v-btn icon @click="bug = null">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-0 pb-0">
            <v-container class="px-0 pb-0">
              <v-row>
                <v-col cols="12" class="px-0 pb-0">
                  <v-data-table
                    v-if="bugs.length"
                    :headers="headers"
                    :items="bugs"
                    :items-per-page="bugs.length"
                    hide-default-footer
                    class="elevation-1 table-scroll"
                  >
                    <template v-slot:item="{ item }">
                      <tr @click="activate(item)" :class="{active: bug && item.id == bug.id, fixed: item.fixed == true}">
                        <td>{{ item.title }}</td>
                        <td class="text-right">
                          <v-btn class="mx-2" fab small depressed @click="complete(item)" v-if="!item.fixed">
                            <font-awesome-icon icon="check" class="grey--text" />
                          </v-btn>
                          <v-btn class="mx-2" fab small depressed @click="destroy(item)">
                            <font-awesome-icon icon="trash-alt" class="grey--text" />
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                  <div v-else class="px-3 grey--text py-3">Няма бъгове</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" md="7">
        <BugPreview :bug="bug" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BugPreview from "@/views/Bugs/BugPreview";
import { mapGetters } from "vuex";
import { FETCH_BUGS, UPDATE_BUG, DESTROY_BUG } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    BugPreview
  },
  data() {
    return {
      bug: null,
      headers: [
        {
          text: 'Заглавие',
          align: 'left',
          value: 'title',
        },
        { 
          text: 'Действия',
          align: 'right', 
          value: '' 
        },
      ]
    }
  },
  mounted() {
    store.dispatch(FETCH_BUGS);
  },
  methods: {
    activate(item) {
      this.bug = item;
    },
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    complete(bug) {
      store.dispatch(UPDATE_BUG, {...bug, fixed: true});
    },
    destroy(bug) {
      store.dispatch(DESTROY_BUG, bug.id);
    }
  },
  computed: {
    ...mapGetters(["bugs"]),
  },
  watch: {
    bugs() {
      if(this.bugs.length) {
        this.bug = this.bugs[0];
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.fixed
  background-color: #E8F5E9
</style>