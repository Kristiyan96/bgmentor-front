<template>
  <v-form>
    <v-container class="px-0 mb-3">
      <h3 class="text-h3 mb-2">
        Намери учител
      </h3>

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
            @click="performSearch"
          >
            <v-icon dark>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <a style="text-decoration: none" href="/search/">> Подробно търсене</a>
    </v-container>
  </v-form>
</template>

<script>
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
    performSearch(e) {
      e.preventDefault();

      let query = Object.keys(this.params)
        .map(key => key + "=" + this.params[key])
        .join("&");

      this.$router.push(`/search/${query}`);
    }
  }
};
</script>

<style scoped lang="sass"></style>
