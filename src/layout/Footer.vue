<template>
  <v-footer color="primary lighten-1 pt-3 mt-3 pb-5" padless>
    <v-layout justify-center row wrap>
      <div class="bg-mentor">
        <ChooseLanguage />
      </div>
      <br /><br />
      <v-btn color="white" class="my-2" text rounded to="/terms">
        Условия
      </v-btn>
      <v-btn color="white" class="my-2" text rounded to="/privacy">
        Поверителност
      </v-btn>
      <div
        py-3
        class="text-center white--text bg-mentor primary lighten-2"
        white--text
        xs12
      >
        &copy;{{ new Date().getFullYear() }}
        <strong class="ml-2">Бг Ментор</strong>
      </div>
    </v-layout>
  </v-footer>
</template>
<script>
import ChooseLanguage from '@/components/ChooseLanguage'
export default {
  components: {
    ChooseLanguage
  }
}
</script>
<style scoped lang="sass">
footer
  overflow: hidden
.bg-mentor
  width: 100%
  display: flex
  justify-content: center
</style>
