<template>
  <section class="landing">
    <v-container>
      <v-row>
        <v-col md="5" sm="5" xs="12" class="col-left">
          <h1 class="mb-3">Групово и индивидуално <br>обучение по математика</h1>
          <v-btn 
            class="primary mr-2" 
            rounded 
            x-large
            depressed
            href="#contacts"
            v-smooth-scroll="{ offset: -70}"
          >
            Прегледай курсовете
          </v-btn>
        </v-col>
        <v-col md="7" sm="7" xs="12">
          <img class="bg-image" src="@/assets/images/bg.png"/>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  }
};
</script>

<style scoped lang="sass">
.landing
  padding-top: 64px
  background: white
  margin: 0px !important
  min-height: 100vh
  .container
    max-width: 100%
  .col-left
    padding-top: 20vh
    text-align: center
  .bg-image
    height: calc(100vh - 64px)
h1
  font-size: 2em
</style>