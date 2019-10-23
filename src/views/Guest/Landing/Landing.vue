<template>
  <section class="landing">
    <div class="action">
      <h1 class="mb-3">Групово и индивидуално обучение<br> по математика</h1>
      <v-btn 
        class="primary mr-2" 
        rounded 
        x-large
        depressed
        href="#contacts"
        v-smooth-scroll="{ offset: -70}"
      >
        Запишете се
      </v-btn>
      <!-- <v-btn
        color="primary" 
        rounded 
        large  
        outlined
        @click="scroll({ to: '.faq' });"
      >
        Имате въпроси?
      </v-btn> -->
    </div>
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
  background: white
  margin: 0px !important
  min-height: 100vh
  .action
    padding-left: 10vw
    padding-top: 30vh
h1
  font-size: 2em
</style>