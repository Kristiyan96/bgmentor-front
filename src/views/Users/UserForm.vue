<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{user ? 'Редактиране' : 'Нов акаунт'}}</span>
      <v-spacer />
      <v-btn text @click="destroy">
        Изтрий
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container class="px-0">
        <v-row>
          <v-col cols="12" class="px-0">
            <v-text-field label="*Име на потребителя" v-model="form.name"></v-text-field>
          </v-col>
          <v-col cols="12" class="px-0">
            <v-text-field label="*Имейл" v-model="form.email"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*сигнализира задължително поле</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" depressed @click="submit" v-if="!user">
        Създай
      </v-btn>
      <v-btn color="primary" depressed @click="update" v-else>
        Редактирай
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { CREATE_USER, UPDATE_USER, DESTROY_USER } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    user: {
      type: Object,
      default: () => {},
      description: "User to edit"
    },
    selectedUserType: {
      type: String,
      default: "student",
      description: "The role of the newly created user"
    }
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        group_id: "",
        role: "student"
      }
    }
  },
  methods: {
    submit() {
      store.dispatch(CREATE_USER, this.form).then(response => {
        console.log(response);
      })
    },
    update() {
      store.dispatch(UPDATE_USER, this.form).then(response => {
        console.log(response);
      })
    },
    destroy() {
      store.dispatch(UPDATE_USER, this.user).then(response => {
        console.log(response);
      })
    }
  },
  computed: {
    ...mapGetters(["users"]),
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.form = { ...this.user, role: this.selectedUserType.slice(0, -1) };
      }
    }
  }
}
</script>