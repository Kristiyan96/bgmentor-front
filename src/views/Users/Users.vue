<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" md="5">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-items>
              <v-btn
                text 
                v-for="item in userTypes" 
                :key="item.value"
                @click="selectedUserType = item.value"
                :color="selectedUserType == item.value ? 'primary' : ''"
              >
                {{ item.text }}
              </v-btn>
            </v-toolbar-items>
            
            <v-spacer></v-spacer>

            <template v-if="$vuetify.breakpoint.smAndUp">
              <v-btn icon @click="user = null">
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </template>
          </v-toolbar>
          <v-card-text class="px-0 pb-0">
            <v-container class="px-0 pb-0">
              <v-row>
                <v-col cols="12" class="px-0 pb-0">
                  <v-data-table
                    v-if="filteredUsers.length"
                    :headers="headers"
                    :items="filteredUsers"
                    :items-per-page="10"
                    class="elevation-1"
                  >
                    <template v-slot:item="{ item }">
                      <tr @click="activate(item)">
                        <td>{{ item.name }}</td>
                        <td>{{ item.grade }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" md="7">
        <UserForm :user="user" :selectedUserType="selectedUserType" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_USERS } from "@/store/actions.type";
import store from "@/store";

import UserForm from "./UserForm";

export default {
  components: {
    UserForm
  },
  data() {
    return {
      selectedUserType: "students",
      userTypes: [
        {
          text: "Ученици",
          value: "students"
        },
        {
          text: "Родители",
          value: "guardians"
        },
        {
          text: "Учители",
          value: "teachers"
        }
      ],
      user: null,
      editing: false,
      headers: [
        {
          text: 'Име',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Клас', value: 'grade' },
      ],
      users: []
    }
  },
  mounted() {
    store.dispatch(FETCH_USERS);
  },
  methods: {
    activate(user) {
      this.user = user;
    }
  },
  computed: {
    ...mapGetters(["students", "guardians", "teachers"]),
    filteredUsers() {
      return this[this.selectedUserType]
    }
  },
  watch: {
    users() {
      if(this.users.length) {
        this.user = this.users[0];
      }
    }
  }
}
</script>