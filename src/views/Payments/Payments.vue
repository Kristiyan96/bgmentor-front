<template>
  <v-card class="mx-auto payment-card" max-width="500px" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-5">
          Плащане по банков път
        </v-list-item-title>
        <v-row>
          <v-col cols="4">
            <v-subheader>Получател</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              id="beneficiary"
              disabled
              value="БГ МЕНТОР ЕООД"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>IBAN</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              id="iban"
              disabled
              value="BG25FINV91501017404255"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>BIC</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field id="bic" disabled value="FINVBGSF"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Банка</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              id="bank"
              disabled
              value="Първа Инвестиционна банка АД"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Адрес</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-textarea
              id="address"
              disabled
              value="България София, ул. Св. Св. Кирил и Методий 27, 1202"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>

<style scoped lang="sass">
.payment-card
  margin-top: 20px
.v-input--is-disabled
  font-weight: bold
  color: black !important
</style>
