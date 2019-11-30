<template>
  <v-card>
    <v-card-title>
      <span class="headline">Разписка</span>
    </v-card-title>
    <v-card-text>
      <v-container class="px-0">
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
            <div class="subtitle-1 font-weight-bold">Период</div>
            {{ capitalize(payment.month) }}
          </v-col>
          <v-col cols="12">
            <div class="subtitle-1 font-weight-bold">Услуга</div>
            {{ group.lesson_type ? 'Индивидуален урок' : 'Групов урок' }} за {{ group.grade }} клас. Група {{ group.name }}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    payment: {
      type: Object,
      default: () => {},
      description: "The selected payment"
    }
  },
  data() {
    return {
      group: {},
      student: {}
    }
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
  },
  watch: {
    payment: {
      immediate: true,
      handler() {
        if(this.payment) {
          this.group = this.payment.group;
          this.student = this.payment.student;
        }
      }
    }
  }
}
</script>