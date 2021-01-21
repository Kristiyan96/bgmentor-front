<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn icon @click="openDialog" v-on="on">
        <font-awesome-icon icon="trash-alt" />
        <v-dialog v-model="open" max-width="290">
          <v-card>
            <v-card-title class="headline">You want to delete?</v-card-title>

            <v-card-text> The record will be lost forever! </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="grey darken-1" text @click="closeDialog">
                Close
              </v-btn>

              <v-btn color="red darken-1" text @click="confirm"> Delete </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </template>
    {{ tooltip }}
  </v-tooltip>
</template>

<script>
export default {
  props: {
    tooltip: {
      type: String,
      default: "Delete record",
      description: "Default tooltip text"
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    openDialog() {
      this.open = true;
    },
    closeDialog() {
      this.open = false;
    },
    confirm() {
      this.$emit("confirm");
      this.closeDialog();
    }
  }
};
</script>
