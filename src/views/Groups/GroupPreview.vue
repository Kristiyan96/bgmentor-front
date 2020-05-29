<template>
  <LayoutColumn class="group-preview">
    <template v-slot:title>
      {{group ? 'Редактиране' : 'Нова група'}}
    </template>

    <template v-slot:header-actions>
      <DeleteButton
        @confirm="destroy"
        tooltip="Delete group"
        v-if="group && current_user.admin"
      />
    </template>

    <template v-slot:content>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="pl-0"
          >
            <v-text-field
              label="*Име на групата"
              v-model="form.name"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="pr-0"
          >
            <v-select
              :items="teachers"
              v-model="form.user_id"
              item-text="name"
              item-value="id"
              label="*Учител"
              required
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="pl-0"
          >
            <v-select
              :items="lessonOptions"
              v-model="form.lesson_type"
              label="*Тип урок"
              required
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="pr-0"
          >
            <v-select
              :items="gradeOptions"
              v-model="form.grade"
              label="*Клас"
              required
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="pl-0"
          >
            <v-select
              :items="pricings"
              v-model="form.pricing_id"
              item-text="title"
              item-value="id"
              label="*Ценоразпис"
              required
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="pr-0"
          >
            <v-select
              :items="locations"
              v-model="form.location_id"
              item-text="title"
              item-value="id"
              label="*Място"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-if="group">
          <v-col
            cols="12"
            class="px-0"
          >
            <GroupMemberships :group="group" />
          </v-col>
        </v-row>
      </v-container>
    </template>

    <template v-slot:actions>
      <v-btn
        :disabled="!dirty"
        depressed
        @click="reset"
        text
      >
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        @click="submit"
        v-if="!group"
      >
        Създай
      </v-btn>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        @click="update"
        v-else
      >
        Редактирай
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from "@/layout/LayoutColumn";
import { _ } from "vue-underscore";
import GroupMemberships from "./GroupMemberships";
import { mapGetters } from "vuex";
import {
  CREATE_GROUP,
  UPDATE_GROUP,
  DESTROY_GROUP
} from "@/store/actions.type";
import store from "@/store";
import DeleteButton from "@/views/components/DeleteButton";

export default {
  components: {
    LayoutColumn,
    GroupMemberships,
    DeleteButton
  },
  props: {
    group: {
      type: Object,
      default: () => {},
      description: "Selected group"
    }
  },
  data() {
    return {
      group_copy: {},
      form: {},
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
        }
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
    };
  },
  methods: {
    submit() {
      store.dispatch(CREATE_GROUP, this.form).then(response => {});
    },
    update() {
      store.dispatch(UPDATE_GROUP, this.form).then(response => {});
    },
    destroy() {
      store.dispatch(DESTROY_GROUP, this.group.id).then(response => {});
    },
    reset() {
      this.form = { ...this.group_copy };
    }
  },
  computed: {
    ...mapGetters([
      "groups",
      "teachers",
      "pricings",
      "locations",
      "current_user"
    ]),
    dirty() {
      return !_.isEqual(this.form, this.group_copy);
    }
  },
  watch: {
    group: {
      immediate: true,
      handler() {
        this.form = { ...this.group };
        this.group_copy = { ...this.form };
      }
    }
  }
};
</script>

<style lang="sass">
.group-preview
  tr.active
    background: #e3f0ff !important
  th:nth-child(2), td:nth-child(2)
    width: 60%
  th:nth-child(3), td:nth-child(3)
    width: 30%
</style>