<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{group ? 'Редактиране' : 'Нова група'}}</span>
      <v-spacer />
      <v-btn text @click="destroy">
        Изтрий
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container class="px-0">
        <v-row>
          <v-col cols="12" sm="6" class="pl-0">
            <v-text-field label="*Име на групата" v-model="form.name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="pr-0">
            <v-select
              :items="teachers"
              v-model="form.user_id"
              item-text="name"
              item-value="id"
              label="*Учител"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" class="pl-0">
            <v-select
              :items="lessonOptions"
              v-model="form.lesson_type"
              label="*Тип урок"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" class="pr-0">
            <v-select
              :items="gradeOptions"
              v-model="form.grade"
              label="*Клас"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-if="group">
          <v-col cols="12" class="px-0">
            <GroupMemberships :group="group" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!dirty" depressed @click="reset" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!dirty" depressed @click="submit" v-if="!group">
        Създай
      </v-btn>
      <v-btn color="primary" :disabled="!dirty" depressed @click="update" v-else>
        Редактирай
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {_} from 'vue-underscore';
import GroupMemberships from "./GroupMemberships";
import { mapGetters } from "vuex";
import { CREATE_GROUP, UPDATE_GROUP, DESTROY_GROUP } from "@/store/actions.type";
import store from "@/store";

export default {
  components: {
    GroupMemberships
  },
  props: {
    group: {
      type: Object,
      default: () => {},
      description: "Group to edit"
    }
  },
  data() {
    return {
      group_copy: {},
      form: {
        name: "",
        grade: "",
        lesson_type: "",
        user_id: "",
        information: ""
      },
      gradeOptions: [
        {
          text: "5-ти",
          value: 5
        },
        {
          text: "6-ти",
          value: 6
        },
        {
          text: "7-ми",
          value: 7
        },
        {
          text: "8-ми",
          value: 8
        },
        {
          text: "9-ти",
          value: 9
        },
        {
          text: "10-ти",
          value: 10
        },
      ],
      lessonOptions: [
        {
          text: "Групови",
          value: 1
        },
        {
          text: "Частни",
          value: 0
        }
      ]
    }
  },
  methods: {
    submit() {
      store.dispatch(CREATE_GROUP, this.form).then(response => {
      })
    },
    update() {
      store.dispatch(UPDATE_GROUP, this.form).then(response => {
      })
    },
    destroy() {
      store.dispatch(DESTROY_GROUP, this.group).then(response => {
      })
    },
    reset() {
      this.form = { ...this.group_copy };
    }
  },
  computed: {
    ...mapGetters(["groups", "teachers"]),
    dirty() {
      return !_.isEqual(this.form, this.group_copy);
    }
  },
  watch: {
    group: {
      immediate: true,
      handler() {
        this.form = { ...this.group };
        this.group_copy = { ... this.form };
      }
    }
  }
}
</script>