<template>
  <div>
    <v-btn text color="primary" to="/login" class="hidden-sm-and-down">
      Вход
    </v-btn>

    <v-btn text to="/register" class="hidden-sm-and-down">
      Регистрация
    </v-btn>

    <v-btn text to="/payments" class="hidden-sm-and-down">
      Плащания
    </v-btn>

    <div class="hidden-md-and-up">
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/login">
            <v-list-item-title>Влез</v-list-item-title>
          </v-list-item>

          <v-list-item to="/register">
            <v-list-item-title>Регистрация</v-list-item-title>
          </v-list-item>

          <v-list-item to="/payments">
            <v-list-item-title>Плащания</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
