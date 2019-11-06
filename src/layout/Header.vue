<template>
  <v-app-bar app flat hide-on-scroll short color="white">
    <v-toolbar-title>
      <span class="title ml-3 mr-5 white--grey">
        <a href="/"><img src="@/assets/images/logo.png" height="40px"/></a>
      </span>
    </v-toolbar-title>
    <Alerts :position="['top']"/>

    <v-spacer></v-spacer>

    <v-btn text color="primary" to="/login">
      Вход
    </v-btn>

    <v-btn text to="/register">
      Регистрация
    </v-btn>
  </v-app-bar>
</template>

<script>
import Alerts from "./Alerts";

export default{
  name: "GuestHeader",
  components: {
    Alerts
  }
}
</script>

<style scoped lang='sass'>
.font-weight-light
  color: white
  text-shadow: -1px -1px 0 #1976d2, 1px -1px 0 #1976d2, -1px 1px 0 #1976d2, 1px 1px 0 #1976d2
.title.ml-3.mr-5.white--grey
  font-size: 25px !important
  color: #1976d2
</style>