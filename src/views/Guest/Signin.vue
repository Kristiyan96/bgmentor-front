<template>
  <FormWrapper :title="$t('auth.title.signin')">
    <form class="form-app form-signin" @submit.prevent="signin">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <PhoneNumber @update="updatePhoneNumber" :value="phone_number" />
      <v-text-field
        v-model="password"
        type="password"
        outlined
        :label="$t('auth.label.password')"
        :placeholder="$t('auth.label.password')"
      ></v-text-field>
      <v-btn type="submit" large color="primary" class="btn mt-3">
        {{ $t("auth.button.signin") }}
      </v-btn>
    </form>
  </FormWrapper>
</template>

<script>
import FormWrapper from "./FormWrapper";
import { mapGetters } from "vuex";
import store from "@/store/index";
import PhoneNumber from "@/components/PhoneNumber";
export default {
  name: "Signin",
  components: {
    FormWrapper,
    PhoneNumber
  },
  data() {
    return {
      phone_number: "",
      password: "",
      error: ""
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signin() {
      store.dispatch("logIn", {
        phone_number: this.phone_number,
        password: this.password
      });
    },
    checkSignedIn() {
      if (this.currentUserId) {
        this.$router.replace("/me");
      }
    },
    updatePhoneNumber({ input }) {
      this.phone_number = input;
    }
  },
  computed: {
    ...mapGetters(["currentUserId"])
  }
};
</script>
