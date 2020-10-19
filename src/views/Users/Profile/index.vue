<template>
  <v-container class="full-height">
    <v-row align="start">
      <v-col cols="6">
        <v-skeleton-loader :loading="loading" class="mx-auto" type="card">
          <v-card class="mx-auto" outlined>
            <v-card-text>
              <p class="display-1 text--primary">
                {{ profile.name }}
              </p>
              <p>{{ $t(`account.roles.${profile.role}`) }}</p>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_PROFILE } from "@/store/actions.type";
import store from "@/store";

export default {
  data() {
    return {
      profile: {},
      loading: true
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      let id = this.$route.params.id;
      store.dispatch(FETCH_PROFILE, { id: id }).then(result => {
        this.profile = result;
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["current_user"])
  }
};
</script>

<style lang="sass" scoped>
.full-height
  display:flex
  flex-direction: column
  min-height: calc(100vh - 56px)
.v-card
  border: 0px !important
</style>
