<template>
  <v-card class="mx-auto my-12" max-width="374" shaped>
    <v-card-title>{{ title }}</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <router-link to="/signin">{{ $t("auth.button.signin") }}</router-link>
      <v-spacer />
      <router-link to="/signup">{{ $t("auth.link.register") }}</router-link>
      <v-spacer />
      <router-link to="/forgot_password">{{
        $t("auth.link.forgot_password")
      }}</router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Wrapper",
  props: {
    title: {
      type: String,
      default: "",
      description: "Form title"
    }
  },
  data() {
    return {};
  }
};
</script>
