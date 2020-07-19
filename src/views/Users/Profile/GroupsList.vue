<template>
  <v-expansion-panels v-if="profile.role == 'student'">
    <v-expansion-panel v-for="item in profile.groups" :key="item.name">
      <v-expansion-panel-header style="display: flex">
        <div style="flex-grow: 1">
          {{ item.name }} - {{ $t(`lesson.${item.lesson_type}`) }}
        </div>
        <v-chip
          class="ma-2"
          :color="credit(item) >= 1 ? 'green' : 'red lighten-1'"
          text-color="white"
        >
          <v-avatar
            left
            :class="credit(item) >= 1 ? 'green darken-4' : 'red darken-4'"
          >
            {{ credit(item) }}
          </v-avatar>
          платени урока
        </v-chip>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <span class="text-h3 font-weight-bold">Вашите плащания</span>
        <v-list-item
          v-for="payment in membership(item.id).payments"
          :key="payment.created_at"
        >
          <v-list-item-content>
            <v-list-item-title>{{ payment.amount }}лв.</v-list-item-title>
            <v-list-item-subtitle>{{
              $moment(payment.created_at).format("DD-MM-YYYY")
            }}</v-list-item-subtitle>
            <v-list-item-content>{{ payment.note }}</v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
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
    },
    credit(item) {
      return Math.round(this.membership(item.id).credit);
    }
  }
};
</script>

<style lang="sass" scoped></style>
