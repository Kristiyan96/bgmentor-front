<template>
  <LayoutColumn>
    <template v-slot:title>
      Въпроси
    </template>

    <template v-slot:header-actions>
      <v-btn icon @click="addNew">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
      <v-container class="px-0 pb-0">
        <v-row>
          <v-col cols="12" class="px-0 pb-0">
            <v-data-table
              v-if="questions.length"
              :headers="headers"
              :items="questions"
              :items-per-page="questions.length"
              hide-default-footer
              class="table-scroll"
            >
              <template v-slot:item="{ item }">
                <tr
                  @click="activate(item)"
                  :class="{
                    active: question && item.id == course.id,
                    fixed: item.fixed == true
                  }"
                >
                  <td>{{ item.title }}</td>
                </tr>
              </template>
            </v-data-table>
            <div v-else class="px-3 grey--text py-3">Няма въпроси</div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import { mapGetters } from "vuex";
import { FETCH_QUESTIONS } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    question: {
      type: Object,
      default: () => {},
      description: "Selected question"
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
    store.dispatch(FETCH_QUESTIONS);
  },
  methods: {
    activate(item) {
      this.$emit("setQuestion", item);
    },
    addNew() {
      this.$emit("setQuestion", null);
    }
  },
  computed: {
    ...mapGetters(["questions"])
  },
  watch: {
    questions: {
      immediate: true,
      handler() {
        if (this.questions.length) {
          this.activate(this.questions[0]);
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
