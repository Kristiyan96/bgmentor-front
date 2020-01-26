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
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search users by name"
              single-line
              hide-details
              class="pt-0 px-5"
            ></v-text-field>
            <v-container class="px-0 pb-0">
              <v-row>
                <v-col cols="12" class="px-0 pb-0">
                  <v-data-table
                    v-if="filteredUsers.length"
                    :headers="headers[selectedUserType]"
                    :items="filteredUsers"
                    hide-default-footer
                    :items-per-page="filteredUsers.length"
                    class="elevation-1 table-scroll"
                  >
                    <template v-slot:item="{ item }">
                      <tr @click="activate(item)" :class="{active: user && item.id == user.id}">
                        <td>{{ item.name }}</td>
                        <td v-if="selectedUserType == 'students'">
                          {{ item.groups && item.groups.length ? item.groups[0].grade : '' }}
                        </td>
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
      search: "",
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
      headers: {
        students: [
          {
            text: 'Име',
            align: 'left',
            value: 'name',
          },
          { text: 'Клас', value: 'grade' },
        ],
        guardians: [
          {
            text: 'Име',
            align: 'left',
            value: 'name',
          },
        ],
        teachers: [
          {
            text: 'Име',
            align: 'left',
            value: 'name',
          },
        ]
      },
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
      return this[this.selectedUserType].filter(u => u.name.toLowerCase().search(this.search.toLowerCase()) != -1)
    }
  },
  watch: {
    selectedUserType: {
      immediate: true,
      handler() {
        if(this.filteredUsers.length) {
          this.activate(this.filteredUsers[0]);
        } else {
          this.user = null;
        }
      }
    }
  }
}
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
</style>