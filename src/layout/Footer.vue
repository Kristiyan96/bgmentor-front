<template>
  <v-footer color="primary lighten-1" padless>
    <v-layout justify-center row wrap>
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
export default {};
</script>
<style scoped lang="sass">
.v-footer
  position: fixed
  bottom: 0
  width: 100%
</style>
