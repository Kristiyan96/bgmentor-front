<template>
  <v-layout>
    <v-flex xs10 sm6 offset-sm3 md4 offset-md4 class="card-wrapper">
      <v-card>
        <v-card-title class="text-center mb-4">
          <div class="text-center display-1">Вход</div>
        </v-card-title>

        <v-card-text>
          <v-alert :value="failure" color="error" class="mb-4" outlined>
            {{ response }}
          </v-alert>
          <form @submit.prevent="submit">
            <v-text-field type="email" v-model="email" label="Имейл" outlined
              ><font-awesome-icon :icon="['fa', 'at']" slot="prepend-inner"
            /></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              label="Парола"
              outlined
              ><font-awesome-icon :icon="['fa', 'key']" slot="prepend-inner"
            /></v-text-field>
            <v-checkbox
              v-model="remember_me"
              label="Запомни ме"
              type="checkbox"
            ></v-checkbox>
            <div class="text-center">
              <v-btn large color="primary" @click="submit">
                Влез
              </v-btn>
            </div>
            <!-- The following line submits the form when pressing enter -->
            <input type="submit" value="Submit" class="d-none" />
          </form>
        </v-card-text>

        <v-card-actions>
          <v-layout align-space-between justify-space-between row fill-height>
            <v-btn text rounded to="/password">Забравена парола?</v-btn>
            <v-btn text rounded to="/register">Нов акаунт</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { LOGIN } from "@/store/actions.type";

export default {
  props: {
    nextUrl: {
      type: String,
      default: "/project"
    }
  },
  data() {
    return {
      email: "",
      password: "",
      remember_me: false,
      failure: false,
      response: ""
    };
  },
  methods: {
    submit() {
      let email = this.email;
      let password = this.password;
      this.$store.dispatch(LOGIN, {email, password})
      .then(() => this.$router.push(this.nextUrl));
    }
  }
};
</script>

<style>
.card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.v-card {
  width: 100%;
}

label.v-label.theme--light {
  margin-bottom: 0px;
}

.display-1 {
  width: 100%;
}
</style>