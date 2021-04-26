<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" class="success ml-auto"
        >{{ $t(`profile.actions.pay`) }}
        <font-awesome-icon icon="shopping-cart" class="ml-2"
      /></v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ $t(`payment.chooseMethod`) }}
      </v-card-title>

      <v-card-text>
        <Payments :note="`User id: ${teacher.id}`" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          {{ $t(`actions.close`) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Payments from './Payments'

export default {
  name: 'TeacherHeader',
  components: {
    Payments
  },
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: 'Teacher being displayed'
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {}
}
</script>
