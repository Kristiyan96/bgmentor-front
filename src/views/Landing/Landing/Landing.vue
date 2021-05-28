<template>
  <section class="landing">
    <!-- Desktop -->
    <v-container class="hidden-sm-and-down">
      <v-row class="pl-3">
        <v-col md="5" sm="5" xs="12" class="col-left pl-5">
          <h1 class="mt-3 mb-3">
            Запази час с проверени ментори <br />по науки, езици и спорт
          </h1>
          <h5 class="grey--text">
            БгМентор предлага бърз и удобен начин да намерите високооценени
            учители, да запазите и платите вашия час онлайн.
          </h5>
          <v-btn class="primary" rounded x-large depressed to="/search">
            Намери ментори
          </v-btn>
        </v-col>
        <v-col md="7" sm="7" xs="12">
          <img
            class="bg-image d-sm-none d-md-flex"
            src="@/assets/images/bg.png"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- Mobile -->
    <v-container class="hidden-md-and-up">
      <v-row>
        <img class="bg-image-small" src="@/assets/images/bg.png" />
      </v-row>
      <v-row class="main-small justify-center text-center">
        <h1 class="mt-3 mb-3">Групово и индивидуално <br />обучение</h1>
        <v-btn class="primary" rounded x-large depressed to="/search">
          Намери учители
        </v-btn>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import SearchFilters from '@/views/Search/SearchFilters'

export default {
  name: 'Landing',
  components: {
    SearchFilters
  },
  data() {
    return {
      cssProps: {
        backgroundImage: `url(${require('@/assets/images/bg.png')})`
      }
    }
  }
}
</script>

<style scoped lang="sass">
.landing
  background: white
  margin: 0px !important
  min-height: 100vh
  .container
    max-width: 100%
  .col-left
    padding-top: 20vh
    // text-align: justify
  .bg-image
    height: calc(100vh - 64px)
  .bg-image-small
    width: 100%
h1
  font-size: 1.6em
.hidden-md-and-up
  h1
    width: 100% !important
  .bg-image-small
    width: 100%
    max-height: 50vh
    object-fit: contain
</style>
