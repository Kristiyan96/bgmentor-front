<template>
  <LayoutColumn>
    <template v-slot:title> {{ $t("account.notif.title") }} </template>

    <template v-slot:content>
      <!-- <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn>{{ $t('account.notif.changePassword') }}</v-btn>
            </v-list-item-title>
            <v-list-item-subtitle>{{
              $t('account.notif.changePasswordInfo')
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list> -->
      {{ $t("account.notif.info") }}
    </template>
  </LayoutColumn>
</template>

<script>
// import store from '@/store'
import LayoutColumn from "@/layout/LayoutColumn";
export default {
  components: {
    LayoutColumn
  },
  data() {
    return {
      common: [],
      teacher: [
        {
          title: "Tutor remarks",
          description: ""
        }
      ],
      student: [
        {
          title: "New homework",
          description: ""
        },
        {
          title: "Lesson starts in 15 minutes",
          description: ""
        }
      ],
      parent: []
    };
  },
  methods: {}
};
</script>
