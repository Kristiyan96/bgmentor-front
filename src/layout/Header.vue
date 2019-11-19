<template>
  <v-app-bar app flat hide-on-scroll short color="white">
    <v-toolbar-title>
      <v-btn class="title ml-3 mr-5 white--grey" to="/" text>
        <img src="@/assets/images/logo.png" height="40px"/>
      </v-btn>
    </v-toolbar-title>
    <Alerts :position="['top']"/>

    <v-spacer></v-spacer>

    <v-btn text color="primary" to="/login" class="hidden-sm-and-down">
      Вход
    </v-btn>

    <v-btn text to="/register" class="hidden-sm-and-down">
      Регистрация
    </v-btn>

    <div class="hidden-md-and-up">
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            to="/login"
          >
            <v-list-item-title>Влез</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/register"
          >
            <v-list-item-title>Регистрация</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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
.v-btn.title:before
  background-color: transparent !important
</style>