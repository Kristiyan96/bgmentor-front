<template>
  <v-card class="mx-auto mb-0" flat>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1"
          >Намери перфектния учител
        </v-list-item-title>
        <v-row>
          <v-col class="px-0 flex-grow-1">
            <v-select
              :items="subjects"
              :value="params.subject"
              label="Предмет"
              outlined
            ></v-select>
          </v-col>
          <v-col class="d-flex flex-grow-1">
            <v-select
              :items="locations"
              :value="params.location"
              label="Град"
              outlined
            ></v-select>
          </v-col>
          <v-col class="d-flex flex-grow-0">
            <v-btn
              class="primary mr-2"
              x-large
              depressed
              v-smooth-scroll
              @click="fetchResults"
            >
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { FETCH_RESULTS } from "@/store/actions.type";
import store from "@/store";

export default {
  data() {
    return {
      params: {
        subject: "math",
        location: "online"
      },
      subjects: [
        { value: "math", text: "Математика" },
        { value: "programming", text: "Програмиране" },
        { value: "bulgarian", text: "Български" }
      ],
      locations: [
        { value: "sofia", text: "София" },
        { value: "online", text: "Онлайн" }
      ]
    };
  },
  methods: {
    fetchResults() {
      store.dispatch(FETCH_RESULTS, this.params);
    }
  }
};
</script>
