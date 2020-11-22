<template>
  <v-stepper v-model="e1" vertical>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Телефон за връзка
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Преглед на услугите
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Заплащане
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="200px">
          <VuePhoneNumberInput
            v-model="phoneNumber"
            default-country-code="BG"
          />
        </v-card>

        <v-btn text to="/">
          Върни се
        </v-btn>
        <v-btn color="primary" @click="e1 = 2">
          Продължи
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn text @click="e1 = 1">
          Върни се
        </v-btn>
        <v-btn color="primary" @click="e1 = 3">
          Продължи
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" to="/">
          Към началната страница
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  components: { VuePhoneNumberInput },
  data() {
    return {
      e1: 1,
      phoneNumber: "",
    };
  },
  methods: {},
};
</script>
