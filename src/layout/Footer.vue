<template>
  <v-footer color="primary lighten-1" padless>
    <v-layout justify-center row wrap>
      <ChooseLanguage />
      <v-divider class="mx-4" vertical></v-divider>
      <v-btn color="white" class="my-2" text rounded to="/terms">
        Условия
      </v-btn>
      <v-btn color="white" class="my-2" text rounded to="/privacy">
        Поверителност
      </v-btn>
      <v-flex primary lighten-2 py-3 class="text-center" white--text xs12>
        &copy;{{ new Date().getFullYear() }} <strong>Бг Ментор</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
import ChooseLanguage from "@/components/ChooseLanguage";
export default {
  components: {
    ChooseLanguage
  }
};
</script>
<style scoped lang="sass"></style>
