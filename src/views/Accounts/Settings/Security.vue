<template>
  <LayoutColumn
    paddingless
    v-if="user"
  >
    <template v-slot:title>
      Настройки за достъп
    </template>

    <template v-slot:content>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          type="password"
          v-model="user.password"
          label="Нова парола"
          :rules="passwordRules"
          required
          :counter="24"
        >
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'key']"
            slot="prepend"
          />
        </v-text-field>
        <v-text-field
          type="password"
          v-model="user.password_confirmation"
          label="Потвърди новата парола"
          :rules="passwordConfirmationRules"
          required
        >
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'key']"
            slot="prepend"
          />
        </v-text-field>
        <v-text-field
          type="password"
          v-model="user.current_password"
          label="Сегашна парола"
          :rules="currentPasswordRules"
          required
        >
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'key']"
            slot="prepend"
          />
        </v-text-field>
      </v-form>
    </template>

    <template v-slot:actions>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="!valid"
        depressed
        :loading="false"
        @click="validate"
      >
        Редактирай
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { UPDATE_PROFILE } from "@/store/actions.type";
import LayoutColumn from "@/layout/LayoutColumn";

export default {
  components: {
    LayoutColumn
  },
  data() {
    return {
      valid: true,
      loading: false,
      user: { password: "", password_confirmation: "", current_password: "" },
      passwordRules: [
        v => !!v || "Изберете нова парола",
        v => (v && v.length > 8) || "Паролата трябва да е поне 8 символа",
        v => /[a-z]/.test(v) || "Трябва да съдържа поне една малка буква",
        v => /[A-Z]/.test(v) || "Трябва да съдържа поне една главна буква",
        v => /\d/.test(v) || "Трябва да съдържа поне една цифра"
      ],
      passwordConfirmationRules: [
        v => v == this.user.password || "Паролите не съвпадат"
      ],
      currentPasswordRules: [v => !!v || "Въведете сегашната парола."]
    };
  },
  methods: {
    submit() {
      this.loading = true;

      store.dispatch(UPDATE_PROFILE, this.user).then(response => {
        this.loading = false;
        this.reset();
      });
    },
    validate() {
      this.$refs.form.validate();

      if (this.valid) {
        this.submit();
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>