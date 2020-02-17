<template>
  <v-card v-if="pricing">
    <v-card-title>
      <span class="headline">Разписка</span>
      <v-spacer />
      <v-btn icon @click="editing = !editing" v-if="pricing.id">
        <font-awesome-icon icon="edit" class="grey--text" />
      </v-btn>
      <DeleteButton @confirm="remove" tooltip="Delete pricing" v-if="pricing.id" />
    </v-card-title>
    <v-card-text>
      <v-container class="px-0">
        <v-row v-if="editing">
          <v-col cols="12">
            <v-text-field 
              label="Име" 
              v-model="form.title"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field 
              label="Цена на 1 посещение" 
              v-model="form.credit_price"
            ><template v-slot:append>лв.</template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <div class="subtitle-1 font-weight-bold">Име</div>
            {{ pricing.title }}
          </v-col>
          <v-col cols="12">
            <div class="subtitle-1 font-weight-bold">Цена на 1 посещение</div>
            {{ pricing.credit_price }}лв.
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions v-if="editing">
      <v-btn :disabled="!dirty" depressed @click="reset" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!dirty" depressed @click="create" v-if="!pricing.id">
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
import { UPDATE_PRICING, DESTROY_PRICING, CREATE_PRICING } from "@/store/actions.type";
import store from "@/store";
import DeleteButton from '@/views/components/DeleteButton';

export default {
  components: {
    DeleteButton
  },
  props: {
    pricing: {
      type: Object,
      default: () => {},
      description: "The selected pricing"
    }
  },
  data() {
    return {
      editing: false,
      form: {},
      form_copy: {},
    }
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return '';
      else return s.charAt(0).toUpperCase() + s.slice(1);
    },
    create() {
      store.dispatch(CREATE_PRICING, this.form);
    },
    update() {
      store.dispatch(UPDATE_PRICING, this.form);
    },
    remove() {
      store.dispatch(DESTROY_PRICING, this.pricing.id);
    },
    reset() {
      this.form = { ...this.form_copy };
    }
  },
  computed: {
    dirty() {
      return !_.isEqual(this.form, this.form_copy);
    }
  },
  watch: {
    pricing: {
      immediate: true,
      handler() {
        if(this.pricing) {
          this.form = { ...this.pricing };
          this.form_copy = { ...this.pricing };
        }

        this.editing = this.pricing && !this.pricing.id;
      }
    }
  }
}
</script>