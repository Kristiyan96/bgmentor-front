<template>
  <div class="body">
    <Landing />
    <Contacts />
    <About />
  </div>
</template>

<script>
import Landing from "./Landing/Landing";
import About from "./Landing/About";
import Contacts from "./Landing/Contacts";
export default {
  name: "landing",
  components: {
    Landing,
    About,
    Contacts
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="sass">
.body
  section.initial
    min-height: calc(100vh - 70px)
    div.initial
      margin-left: 10%
      margin-top: 10%
      .attention
        display: inline-block
        width: 500px
        .call-to-action
          color: white
          margin-left: 0px
          margin-top: 30px
          font-weight: bold
      img
        display: inline-block
        width: calc(90vw - 500px)
section.features
</style>
