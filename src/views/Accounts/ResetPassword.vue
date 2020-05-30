<template>
  <v-container
    fluid
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        xs="10"
        md="4"
      >
        <v-card shaped>
          <v-card-title class="text-center mb-4">
            <div class="text-center display-1">{{$t("auth.title.reset_password")}}</div>
          </v-card-title>

          <v-card-text>
            <v-alert
              :value="failure"
              color="error"
              class="mb-4"
              outlined
            >
              {{ errors && errors.reset_password_token ? 'Този линк е изплозван или изтекъл. Моля, пратете нов линк за промяна на парола.' : '' }}
              {{ errors && errors.password_confirmation ? 'Паролите не съвдапат.' : '' }}
            </v-alert>
            <form
              @submit.prevent="submit"
              class="pt-5"
            >
              <v-text-field
                v-model="password"
                :label="$t('auth.label.new_password')"
                type="password"
                outlined
              >
                <font-awesome-icon
                  :icon="['fa', 'key']"
                  slot="prepend-inner"
                />
              </v-text-field>
              <v-text-field
                v-model="password_confirmation"
                :label="$t('auth.label.confirm_password')"
                type="password"
                outlined
              >
                <font-awesome-icon
                  :icon="['fa', 'key']"
                  slot="prepend-inner"
                />
              </v-text-field>
              <div class="text-center">
                <v-btn
                  large
                  color="primary"
                  @click="submit"
                >
                  {{ $t('auth.button.change_password') }}
                </v-btn>
              </div>
              <!-- The following line submits the form when pressing enter -->
              <input
                type="submit"
                value="Submit"
                class="d-none"
              />
            </form>
          </v-card-text>
          <v-card-actions>
            <v-layout
              align-space-between
              justify-space-between
              row
              fill-height
            >
              <v-btn
                text
                rounded
                to="/login"
              >{{ $t("auth.link.signin") }}</v-btn>
              <v-btn
                text
                rounded
                to="/register"
              >{{ $t("auth.link.register") }}</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import { CREATE_ALERT } from "@/store/actions.type";

export default {
  data() {
    return {
      errors: null,
      failure: false,
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    submit() {
      this.axios
        .put("/password", {
          user: {
            reset_password_token: this.$route.params.token,
            password: this.password,
            password_confirmation: this.password_confirmation
          }
        })
        .then(response => {
          this.onSuccess(response);
        })
        .catch(error => {
          this.onFailure(error);
        });
    },
    onSuccess(message) {
      store.dispatch(CREATE_ALERT, [
        "Променихте Вашата парола успешно! Моля, влезте в акаунта си.",
        "success"
      ]);
      this.$router.push({ path: "/login" });
    },
    onFailure(message) {
      this.failure = true;
      this.errors = message.response.data.errors;
      store.dispatch(CREATE_ALERT, [
        "Имаше проблем и Вашата парола НЕ беше сменена. Моля, опитайте отново.",
        "danger"
      ]);
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>