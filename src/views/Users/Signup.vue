<template>
  <v-container fluid class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col xs="10" md="4">
        <v-card v-if="!registered" :loading="loading" shaped>
          <v-card-title class="text-center mb-4">
            <div class="text-center display-1">{{$t("auth.title.register")}}</div>
          </v-card-title>
          <v-card-text>
            <v-alert v-if="errors.length" color="error" class="mb-4" outlined>
              {{ errors[0] }}
            </v-alert>
            <v-form v-model="valid">
              <v-text-field
                type="text"
                v-model="user.name"
                :label="$t('auth.label.name')"
                outlined
                :rules="rules.name"
                validate-on-blur
                ><font-awesome-icon :icon="['fa', 'user']" slot="prepend-inner"
              /></v-text-field>
              <v-text-field
                type="email"
                v-model="user.email"
                :label="$t('auth.label.email')"
                outlined
                :rules="rules.email"
                validate-on-blur
                ><font-awesome-icon :icon="['fa', 'at']" slot="prepend-inner"
              /></v-text-field>
              <v-text-field
                :rules="rules.password"
                type="password"
                v-model="user.password"
                :label="$t('auth.label.password')"
                outlined
                validate-on-blur
                ><font-awesome-icon :icon="['fa', 'key']" slot="prepend-inner"
              /></v-text-field>
              <v-text-field
                :rules="rules.password_confirmation"
                type="password"
                v-model="user.password_confirmation"
                :label="$t('auth.label.confirm_password')"
                outlined
                validate-on-blur
                ><font-awesome-icon :icon="['fa', 'key']" slot="prepend-inner"
              /></v-text-field>
              <v-checkbox v-model="accept" type="checkbox" :rules="rules.accept">
                <span slot="label">
                  <v-btn text to="/privacy">Съгласявам се с условията</v-btn>
                </span>
              </v-checkbox>
              <div class="text-center">
                <v-btn
                  large
                  color="primary"
                  @click="submit"
                  :disabled="!valid"
                >
                  {{$t("auth.button.register")}}
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-else class="text-xs-center">
          <v-card-title align-center shaped>
            <div class="display-1 text-xs-center" align-center>
              Готово!
            </div>
          </v-card-title>
          <v-card-text class="text-xs-center">
            Изпратихме линк на Вашият имейл {{user.email}}. Кликнете на него, за да потвърдите регистрацията.
          </v-card-text>
          <v-card-actions>
              <v-spacer />
              <v-btn
                large
                color="primary"
                to="/login"
              >
                {{$t("auth.link.signin")}}
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { REGISTER } from "@/store/actions.type";
import store from "@/store";

export default {
  data() {
    return {
      valid: false,
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      accept: false,
      registered: false,
      loading: false,
      errors: [],
      rules: {
        name: [val => !!val || "Въведете име."],
        email: [val => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val) || "Въведете реален имейл."],
        password: [val => val.length > 7 || "Паролата трябва да е поне 8 символа."],
        password_confirmation: [val => val == this.user.password || "Паролите не съвпадат."],
        accept: [val => val || "Моля, съгласете се с Условията за ползване"]
      }
    };
  },
  methods: {
    submit() {
      this.loading = true;
      store.dispatch(REGISTER, this.user)
        .then(response => {
          this.registered = true; 
          this.loading = false; 
          this.user = response;
        }).catch(error => { 
        });
    }
  }
};
</script>