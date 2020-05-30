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
            <div class="text-center display-1">{{$t("auth.title.forgot_password")}}</div>
          </v-card-title>

          <v-card-text>
            <v-alert
              :value="failure"
              color="error"
              class="mb-4"
              outlined
            >
              {{ response }}
            </v-alert>
            <v-alert
              :value="success"
              color="success"
              class="mb-4"
              outlined
            >
              Изпратихме Ви линк, с който можете да промените паролата си. Моля, проверете и в секцията "Спам". Следвайте получените инструкции, за да промените паролата си.
            </v-alert>
            <form
              @submit.prevent="submit"
              class="pt-5"
            >
              <v-text-field
                v-model="email"
                :label="$t('auth.label.email')"
                type="email"
                outlined
                :disabled="loading || success"
              >
                <font-awesome-icon
                  :icon="['fa', 'at']"
                  slot="prepend-inner"
                />
              </v-text-field>
              <div class="text-center">
                <v-btn
                  v-if="!success"
                  :loading="loading"
                  :disabled="loading"
                  large
                  color="primary"
                  @click="submit"
                  :class="{ disabled: success }"
                >
                  {{ $t('auth.button.change_password') }}
                </v-btn>
                <v-btn
                  v-else
                  large
                  color="success"
                  :class="{ disabled: success }"
                  :href="`https://www.${email.split('@')[1]}`"
                >
                  Към {{email.split('@')[1]}}
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
export default {
  data() {
    return {
      email: "",
      response: "",
      loading: false,
      success: false,
      failure: false
    };
  },
  methods: {
    submit() {
      this.response = "";
      this.failure = false;
      this.success = false;
      this.loading = true;

      if (!this.emailIsValid) {
        this.resetFailed("Please, use a real email.");
        return;
      }

      this.axios
        .post("/password", {
          user: {
            email: this.email
          }
        })
        .then(response => this.resetSuccessful(response))
        .catch(error => this.resetFailed(error));
    },
    resetSuccessful(response) {
      this.success = true;
      this.response = response.data.message;
      this.loading = false;
    },
    resetFailed(error) {
      this.failure = true;
      this.response = error;
      this.loading = false;
    }
  },
  computed: {
    emailIsValid() {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
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