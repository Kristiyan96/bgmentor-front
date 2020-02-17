<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{location ? 'Редактиране на локация' : 'Нова локация'}}</span>
      <v-spacer />
      <DeleteButton @confirm="destroy" v-if="location" tooltip="Delete location" />
    </v-card-title>
    <v-card-text>
      <v-container class="px-0">
        <v-row>
          <v-col cols="12" class="px-0">
            <v-text-field label="Заглавиe (Офис 1, ул Кирил и Методий, etc)" v-model="form.title"></v-text-field>
          </v-col>
          <v-col cols="12" class="px-0">
            <v-textarea
              label="Адрес"
              v-model="form.address"
            ></v-textarea>
          </v-col>
          <v-col cols="12" class="px-0">
            <v-text-field label="Цвят" v-model="form.color"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!dirty" depressed @click="reset" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!dirty" depressed @click="submit" v-if="!location">
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
import { CREATE_LOCATION, UPDATE_LOCATION, DESTROY_LOCATION } from "@/store/actions.type";
import store from "@/store";
import DeleteButton from '@/views/components/DeleteButton';

export default {
  components: {
    DeleteButton
  },
  props: {
    location: {
      type: Object,
      default: () => {},
      description: "The selected location"
    }
  },
  data() {
    return {
      form: {
        title: "",
        address: "",
        color: "#1976d2"
      },
      location_copy: { }
    }
  },
  methods: {
    submit() {
      store.dispatch(CREATE_LOCATION, this.form);
    },
    update() {
      store.dispatch(UPDATE_LOCATION, this.form);
    },
    destroy() {
      store.dispatch(DESTROY_LOCATION, this.location.id);
    },
    reset() {
      this.form = { ...this.location_copy };
    }
  },
  computed: {
    dirty() {
      return !_.isEqual(this.form, this.location_copy);
    }
  },
  watch: {
    location: {
      immediate: true,
      handler() {
        if(this.location) {
          this.form = { ...this.location };
          this.location_copy = { ... this.form };
        } else {
          this.form = {
            title: "",
            address: "",
            color: "#1976d2"
          }
        }
      }
    }
  }
}
</script>