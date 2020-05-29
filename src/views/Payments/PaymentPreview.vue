<template>
  <LayoutColumn v-if="payment">
    <template v-slot:title>
      Разписка
    </template>

    <template v-slot:header-actions>
      <v-btn
        icon
        @click="editing = !editing"
      >
        <font-awesome-icon
          icon="edit"
          class="grey--text"
        />
      </v-btn>
      <DeleteButton
        @confirm="remove"
        tooltip="Delete receipt"
        v-if="payment && payment.id && current_user.admin"
      />
    </template>

    <template
      v-slot:content
      v-if="payment"
    >
      <v-row v-if="!editing && payment.membership_id">
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">Клиент</div>
          <v-btn
            text
            :href="`/profiles/${payment.payer.id}`"
          >{{ payment.payer.name }}</v-btn>
        </v-col>
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">Платено</div>
          {{ parseFloat(payment.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}лв.
          <br>
          {{ payment.note }}
        </v-col>
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">Услуга</div>
          {{ group.lesson_type == 'individual' ? 'Индивидуален урок' : 'Групов урок' }} за {{ group.grade }} клас. Група {{ group.name }}
        </v-col>
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">Дата</div>
          {{ $moment(payment.created_at)}}
        </v-col>
      </v-row>

      <v-row v-if="!editing && ['User', 'Academy'].includes(payment.payer_type)">
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">От</div>
          <v-btn
            text
            :href="`/profiles/${payment.payer.id}`"
          >{{ payment.payer.name }}</v-btn>
        </v-col>
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">До</div>
          <v-btn
            text
            :href="`/profiles/${payment.recipient.id}`"
          >{{ payment.recipient.name }}</v-btn>
        </v-col>
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">Платено</div>
          {{ parseFloat(payment.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}лв.
          <br>
          {{ payment.note }}
        </v-col>
        <v-col cols="12">
          <div class="subtitle-1 font-weight-bold">Дата</div>
          {{ $moment(payment.created_at)}}
        </v-col>
      </v-row>

      <v-row v-if="editing">
        <v-col cols="12">
          <v-text-field
            label="Сума"
            v-model="form.amount"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Забележки"
            v-model="form.note"
          ></v-text-field>
        </v-col>
      </v-row>
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
        @click="update"
      >
        Редактирай
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import { _ } from "vue-underscore";
import { mapGetters } from "vuex";
import { UPDATE_PAYMENT, DESTROY_PAYMENT } from "@/store/actions.type";
import store from "@/store";
import DeleteButton from "@/views/components/DeleteButton";
import LayoutColumn from "@/layout/LayoutColumn";

export default {
  components: {
    DeleteButton,
    LayoutColumn
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
      form: {},
      form_copy: {}
    };
  },
  methods: {
    capitalize(s) {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
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
        if (this.payment) {
          this.group = this.payment.group;
          this.form = { ...this.payment };
          this.form_copy = { ...this.payment };
        }
      }
    }
  }
};
</script>