<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{bug ? 'Редактиране на бъг' : 'Нов бъг'}}</span>
      <v-spacer />
      <v-btn text @click="destroy" v-if="bug">
        Изтрий
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container class="px-0">
        <v-row v-if="bug">
          <v-col cols="12" class="px-0">
            <v-text-field label="Заглавие" v-model="form.title"></v-text-field>
          </v-col>
          <v-col cols="12" class="px-0">
            <v-textarea
              label="Описание"
              v-model="form.description"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" class="px-0">
            <v-text-field label="Заглавие" v-model="form.title"></v-text-field>
          </v-col>
          <v-col cols="12" class="px-0">
            <v-textarea
              label="Описание"
              v-model="form.description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!dirty" depressed @click="reset" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!dirty" depressed @click="submit" v-if="!bug">
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
import { mapGetters } from "vuex";
import { CREATE_BUG, UPDATE_BUG, DESTROY_BUG } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    bug: {
      type: Object,
      default: () => {},
      description: "The selected bug"
    }
  },
  data() {
    return {
      form: {
        title: "",
        description: ""
      },
      bug_copy: {

      }
    }
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    submit() {
      store.dispatch(CREATE_BUG, this.form);
    },
    update() {
      store.dispatch(UPDATE_BUG, this.form);
    },
    destroy() {
      store.dispatch(DESTROY_BUG, this.bug.id);
    },
    reset() {
      this.form = { ...this.bug_copy };
    }
  },
  computed: {
    dirty() {
      return !_.isEqual(this.form, this.bug_copy);
    }
  },
  watch: {
    bug: {
      immediate: true,
      handler() {
        if(this.bug) {
          this.form = { ...this.bug };
          this.bug_copy = { ... this.form };
        } else {
          this.form = {
            title: "",
            description: ""
          }
        }
      }
    }
  }
}
</script>