<template>
  <v-card outlined>
    <v-card-title>
      <span class="headline">{{user ? 'Редактиране' : 'Нов акаунт'}}</span>
      <v-spacer />
      <DeleteButton
        @confirm="destroy"
        tooltip="Delete user"
        v-if="user && current_user.admin"
      />
    </v-card-title>
    <v-card-text>
      <v-container class="px-0">
        <v-row>
          <v-col
            cols="12"
            class="px-0"
          >
            <v-text-field
              label="*Име на потребителя"
              v-model="form.name"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            class="px-0"
          >
            <v-text-field
              label="*Имейл"
              :disabled="user != null"
              v-model="form.email"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
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
        v-if="!user"
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
    </v-card-actions>
  </v-card>
</template>

<script>
import { _ } from "vue-underscore";
import { mapGetters } from "vuex";
import { CREATE_USER, UPDATE_USER, DESTROY_USER } from "@/store/actions.type";
import store from "@/store";
import DeleteButton from "@/views/components/DeleteButton";

export default {
  components: {
    DeleteButton
  },
  props: {
    user: {
      type: Object,
      default: () => {},
      description: "User to edit"
    },
    userType: {
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
      },
      user_copy: {}
    };
  },
  methods: {
    submit() {
      store.dispatch(CREATE_USER, this.form);
      this.reset();
    },
    update() {
      store.dispatch(UPDATE_USER, this.form);
    },
    destroy() {
      store.dispatch(DESTROY_USER, this.user.id);
    },
    reset() {
      this.form = { ...this.user_copy };
    }
  },
  computed: {
    ...mapGetters(["current_user"]),
    dirty() {
      return !_.isEqual(this.form, this.user_copy);
    }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.form = { ...this.user, role: this.userType.slice(0, -1) };
        this.user_copy = { ...this.form };
      }
    }
  }
};
</script>