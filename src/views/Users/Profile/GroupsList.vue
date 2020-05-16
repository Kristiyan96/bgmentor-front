<template>
  <v-list
    three-line
    v-if="profile.role == 'student'"
  >
    <template v-for="(item, index) in profile.groups">
      <v-list-item :key="item.name">
        <v-list-item-content>
          <v-list-item-title v-html="item.name"></v-list-item-title>
          <v-list-item-subtitle>{{$t(`lesson.${item.lesson_type}`)}}</v-list-item-subtitle>
          <v-list-item-content>{{$t(`memberships.remainingCredits`, [Math.round(membership(item.id).credit)])}}</v-list-item-content>
        </v-list-item-content>
      </v-list-item>
      <v-divider
        v-if="index + 1 < profile.groups.length"
        :key="item.id"
      ></v-divider>
    </template>
  </v-list>
</template>

<script>
import { FETCH_PROFILE } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    profile: {
      type: Object,
      default: () => {},
      description: "Previewed user"
    }
  },
  data() {
    return {};
  },
  methods: {
    membership(group_id) {
      return this.profile.memberships.find(m => m.group_id == group_id);
    }
  }
};
</script>

<style lang="sass" scoped></style>