<template>
  <LayoutColumn>
    <template v-slot:title>
      <SelectUserType
        @setUserType="setUserType"
        :userType="userType"
      />
    </template>

    <template v-slot:header-actions>
      <v-btn
        icon
        @click="setUser(null)"
      >
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
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
          <v-col
            cols="12"
            class="px-0 pb-0"
          >
            <v-data-table
              v-if="filteredUsers.length"
              :headers="headers[userType]"
              :items="filteredUsers"
              hide-default-footer
              :items-per-page="filteredUsers.length"
              class="table-scroll"
            >
              <template v-slot:item="{ item }">
                <tr
                  @click="setUser(item)"
                  :class="{active: user && item.id == user.id}"
                >
                  <td>
                    <v-btn
                      text
                      :href="`/profiles/${item.id}`"
                    >{{ item.name }}</v-btn>
                  </td>
                  <td v-if="userType == 'students'">
                    {{ item.groups && item.groups.length ? item.groups[0].grade : '' }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import SelectUserType from "./SelectUserType";
import { mapGetters } from "vuex";

export default {
  props: {
    user: {
      type: Object,
      default: () => {},
      description: "Selected user"
    }
  },
  components: {
    LayoutColumn,
    SelectUserType
  },
  data() {
    return {
      search: "",
      userType: "students",
      headers: {
        students: [
          {
            text: "Име",
            align: "left",
            value: "name"
          },
          { text: "Клас", value: "grade" }
        ],
        guardians: [
          {
            text: "Име",
            align: "left",
            value: "name"
          }
        ],
        teachers: [
          {
            text: "Име",
            align: "left",
            value: "name"
          }
        ]
      }
    };
  },
  methods: {
    setUser(item) {
      this.$emit("setUser", item);
    },
    setUserType(type) {
      this.userType = type;
      this.$emit("setUserType", type);
    }
  },
  computed: {
    ...mapGetters(["students", "guardians", "teachers"]),
    filteredUsers() {
      return this[this.userType].filter(
        u => u.name.toLowerCase().search(this.search.toLowerCase()) != -1
      );
    }
  },
  watch: {
    userType: {
      immediate: true,
      handler() {
        if (this.filteredUsers.length) {
          this.setUser(this.filteredUsers[0]);
        } else {
          this.setUser(null);
        }
      }
    }
  }
};
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
th:nth-child(2), td:nth-child(2)
  width: 20%
</style>