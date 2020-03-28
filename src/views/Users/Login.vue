<template>
  <v-container fluid class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col xs="10" md="4">
        <v-card shaped>
          <v-card-title class="text-center mb-4">
            <div class="text-center display-1">{{$t("auth.title.signin")}}</div>
          </v-card-title>

          <v-card-text>
            <v-btn @click="googleAuthenticate()" class="mb-5 google-login">
              <font-awesome-icon :icon="['fab', 'google']" class="mr-2" />
              {{ $t('auth.button.google') }}
            </v-btn>
            <v-alert :value="failure" color="error" class="mb-4" outlined>
              {{ response }}
            </v-alert>
            <form @submit.prevent="submit" class="pt-5">
              <v-text-field type="email" v-model="email" label="Имейл" outlined
                ><font-awesome-icon :icon="['fa', 'at']" slot="prepend-inner"
              /></v-text-field>
              <v-text-field
                type="password"
                v-model="password"
                :label="$t('auth.label.password')"
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
                  {{ $t('auth.button.signin') }}
                </v-btn>
              </div>
              <!-- The following line submits the form when pressing enter -->
              <input type="submit" value="Submit" class="d-none" />
            </form>
          </v-card-text>
          <v-card-actions>
            <v-layout align-space-between justify-space-between row fill-height>
              <v-btn text rounded to="/forgot_password">{{ $t("auth.link.forgot_password") }}</v-btn>
              <v-btn text rounded to="/register">{{ $t("auth.link.register") }}</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LOGIN } from "@/store/actions.type";
import { SET_AUTH } from "@/store/mutations.type";

export default {
  props: {
    nextUrl: {
      type: String,
      default: "/calendar"
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
    },
    googleAuthenticate() {
      this.$gAuth.getAuthCode()
      .then(authCode => {
        return this.$http.post('/auth/google_oauth2/callback', { code: authCode, redirect_uri: 'postmessage' })
      })
      .then(response => {
        this.$store.commit(SET_AUTH, [response.headers.authorization, response.data]);
        this.$store.dispatch("ADD_ALERT", [
          "You logged in successfully.",
          "success"
        ]);
        this.$router.push(this.nextUrl);
      })
      .catch(error => {
        //on fail do something
      })
    }
  }
};
</script>

<style lang="sass">
label.v-label.theme--light
  margin-bottom: 0px
.google-login
  background-color: #4285F4 !important
  color: white !important
</style>