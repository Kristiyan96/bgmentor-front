<template>
  <v-container class="full-height">
    <v-row align="start">
      <v-col cols="6">
        <v-skeleton-loader
          :loading="loading"
          class="mx-auto"
          type="card"
        >
          <v-card
            class="mx-auto"
            elevation="1"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{profile.name}}
              </p>
              <p>{{$t(`account.roles.${profile.role}`)}}</p>

              <v-list three-line>
                <template v-for="item in profile.groups">
                  <v-list-item
                    :key="item.name"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-html="item.name"></v-list-item-title>
                      <v-list-item-subtitle>{{$t(`lesson.${item.lesson_type}`)}}</v-list-item-subtitle>
                      <v-list-item-content>{{$t(`memberships.remainingCredits`, [Math.round(membership(item.id).credit)])}}</v-list-item-content>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
            <v-card-actions>
              
            </v-card-actions>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="6">
        <v-skeleton-loader
          :loading="loading"
          class="mx-auto"
          type="card"
        >
          <Calendar :filters="filters" />
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Calendar from "@/views/Calendar/CalendarWrapper";
import { mapGetters } from "vuex";
import { FETCH_PROFILE } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    Calendar
  },
  data() {
    return {
      profile: {},
      loading: true,
      filters: {
        searching: true
      }
    }
  },
  mounted() {
    let id = this.$route.params.id;
    store.dispatch(FETCH_PROFILE, {id: id}).then(result => {
      this.profile = result;
      if(this.profile.role == "teacher") {
        this.filters.teacher_id = this.profile.id;
      } else if(this.profile.role == "student") {
        this.filters.user_id = this.profile.id;
      }
      this.loading = false;
    });
  },
  methods: {
    membership(group_id) {
      return this.profile.memberships.find(m => m.group_id == group_id)
    }
  }
}
</script>

<style lang="sass" scoped>
.full-height
  display:flex
  flex-direction: column
  min-height: calc(100vh - 56px)
</style>