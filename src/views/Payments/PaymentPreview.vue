<template>
  <v-card>
    <v-card-title>
      <span class="headline">Разписка</span>
      <v-spacer />
      <v-btn icon @click="editing = !editing">
        <font-awesome-icon icon="edit" class="grey--text" />
      </v-btn>
      <DeleteButton @confirm="remove" tooltip="Delete receipt" v-if="payment.id && current_user.admin"/>
    </v-card-title>
    <v-card-text>
      <v-container class="px-0" v-if="!editing">
        <v-row v-if="payment">
          <v-col cols="12">
            <div class="subtitle-1 font-weight-bold">Клиент</div>
            {{ student.name }}
          </v-col>
          <v-col cols="12" v-if="payment.note">
            <div class="subtitle-1 font-weight-bold">Платено</div>
            {{ payment.amount }}лв.
            <br>
            {{ payment.note }}
          </v-col>
          <v-col cols="12">
            <div class="subtitle-1 font-weight-bold">Услуга</div>
            {{ group.lesson_type ? 'Индивидуален урок' : 'Групов урок' }} за {{ group.grade }} клас. Група {{ group.name }}
          </v-col>
          <v-col cols="12">
            <div class="subtitle-1 font-weight-bold">Дата</div>
            {{ $moment(payment.created_at)}}
          </v-col>
        </v-row>
      </v-container>
      <v-container class="px-0" v-else>
        <v-row v-if="payment">
          <v-col cols="12">
            <v-text-field label="Сума" v-model="form.amount"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Забележки" v-model="form.note"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions v-if="editing">
      <v-btn :disabled="!dirty" depressed @click="reset" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!dirty" depressed @click="update">
        Редактирай
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {_} from 'vue-underscore';
import { mapGetters } from "vuex";
import { UPDATE_PAYMENT, DESTROY_PAYMENT } from "@/store/actions.type";
import store from "@/store";
import DeleteButton from '@/views/components/DeleteButton';

export default {
  components: {
    DeleteButton
  },
  props: {
    payment: {
      type: Object,
      default: () => {},
      description: "The selected payment"
    }
  },
  data() {
    return {
      editing: false,
      group: {},
      student: {},
      form: {},
      form_copy: {},
    }
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    update() {
      store.dispatch(UPDATE_PAYMENT, this.form);
    },
    remove() {
      store.dispatch(DESTROY_PAYMENT, this.payment.id);
    },
    reset() {
      this.form = { ...this.form_copy };
    }
  },
  computed: {
    ...mapGetters(["current_user"]),
    dirty() {
      return !_.isEqual(this.form, this.form_copy);
    }
  },
  watch: {
    payment: {
      immediate: true,
      handler() {
        if(this.payment) {
          this.group = this.payment.group;
          this.student = this.payment.student;
          this.form = { ...this.payment };
          this.form_copy = { ...this.payment };
        }
      }
    }
  }
}
</script>