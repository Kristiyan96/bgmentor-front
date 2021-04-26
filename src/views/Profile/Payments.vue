<template>
  <v-card class="mx-auto payment-card" max-width="500px" outlined>
    <v-expansion-panels accordion v-model="panel">
      <v-expansion-panel v-for="payment in payments" :key="payment.title">
        <v-expansion-panel-header>
          <div>
            <font-awesome-icon
              :icon="payment.icon"
              size="lg"
              class="grey--text mr-4"
            />
            {{ payment.title }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item three-line>
            <v-list-item-content>
              <v-row v-for="detail in payment.details" :key="detail.title">
                <v-col cols="4" class="py-0">
                  <v-subheader>{{ detail.title }}</v-subheader>
                </v-col>
                <v-col cols="8" class="py-0 pt-3">
                  <span class="h6">{{ detail.content }}</span>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  props: {
    note: {
      default: '',
      type: String,
      description: 'Payment note'
    }
  },
  data() {
    return {
      panel: [0, 1, 2, 3, 4],
      payments: [
        {
          icon: 'university',
          title: 'Плащане по банков път',
          details: [
            {
              title: 'Получател',
              content: 'БГ МЕНТОР ЕООД'
            },
            {
              title: 'IBAN',
              content: 'BG25FINV91501017404255'
            },
            {
              title: 'BIC',
              content: 'FINVBGSF'
            },
            {
              title: 'Банка',
              content: 'Първа Инвестиционна банка АД'
            },
            {
              title: 'Адрес',
              content: 'България София, ул. Св. Св. Кирил и Методий 27, 1202'
            },
            {
              title: 'Бележка с плащането',
              content: this.note
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="sass">
.payment-card
  margin-top: 20px
.v-input--is-disabled
  font-weight: bold
  color: black !important
.v-text-field
  padding-top: 0
</style>
