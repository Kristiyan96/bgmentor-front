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
          <v-col cols="12" class="px-0">
            <v-text-field label="*Име на групата" v-model="form.name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="pl-0">
            <v-select
              :items="lessonOptions"
              v-model="form.lesson"
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
        <v-row>
          <v-col cols="12" class="px-0">
            <GroupMemberships :group="group" />
          </v-col>
        </v-row>
      </v-container>
      <small>*сигнализира задължително поле</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" depressed @click="submit" v-if="!group">
        Създай
      </v-btn>
      <v-btn color="primary" depressed @click="update" v-else>
        Редактирай
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
      form: {
        name: "",
        grade: "",
        lesson: ""
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
          value: "collective"
        },
        {
          text: "Частни",
          value: "individual"
        }
      ]
    }
  },
  methods: {
    submit() {
      store.dispatch(CREATE_GROUP, this.form).then(response => {
        console.log(response);
      })
    },
    update() {
      store.dispatch(UPDATE_GROUP, this.form).then(response => {
        console.log(response);
      })
    },
    destroy() {
      store.dispatch(DESTROY_GROUP, this.group).then(response => {
        console.log(response);
      })
    }
  },
  computed: {
    ...mapGetters(["groups"]),
  },
  watch: {
    group: {
      immediate: true,
      handler() {
        this.form = { ...this.group };
      }
    }
  }
}
</script>