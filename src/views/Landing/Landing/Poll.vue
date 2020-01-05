<template>
  <section id="poll">
    <h2 class="text-center">Кои курсове предпочитате?</h2>
    <v-container v-if="!voted">
      <v-row class="justify-center mb-2" fluid>
        <v-col md="8" offset-md="0">
          <div class="subtitle-2">Поради високия интерес в нашите курсове, от Януари 2020 ще организираме менторска програма/курсове в най-желаните сфери. Моля, гласувайте за своя фаворит и попълнете Вашия имейл, ако искате да разберете щом вземем решение.</div>
          <v-card class="px-3 py-1 mt-2">
            <v-checkbox
              hide-details
              v-model="form.programming"
            >
              <div slot="label"><b>Програмиране</b> - Една от най-бързо развиващите се сфери. Дава Ви свободата да работите от където пожелаете и гарантира, че ще имате сигурна работа с висока заплата.</div>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="form.finance"
            >
              <div slot="label"><b>Финанси/Икономика</b> - За съжаление, в училище не се изучава едно от най-важните умения нужни в модерния свят - как да накараме парите да работят за нас, а не обратното.</div>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="form.english"
            >
              <div slot="label"><b>Английски език</b> - Технологиите направиха английския език задължителен. Ако не го владеете, Вашите възможности за развитие са безкрайно ограничени с каквото и да решите да се занимавате.</div>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="form.bulgarian"
            >
              <div slot="label"><b>Български език</b> - Важен не само за оценките, които ще Ви дадат възможност за прием в елитен университет, но също и да развиете Вашата култура и умения да анализирате сложни литературни текстове.</div>
            </v-checkbox>
            <v-checkbox
              hide-details
              v-model="form.other"
            >
              <v-text-field
                slot="label"
                placeholder="Друго"
                v-model="form.other_text"
              ></v-text-field>
            </v-checkbox>
            <v-text-field
              label="Имейл/Номер (ако желаете да разберете, когато отворим нов курс)"
              v-model="form.email"
            ></v-text-field>
            <div class="mb-4 text-right">
              <v-btn color="success" depressed @click="submit">
                Гласувай
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row class="justify-center mb-2" fluid>
        <v-col md="8" offset-md="0">
          <div class="subtitle-2 text-center">Благодарим за интереса!</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { CREATE_ALERT, CREATE_VOTE } from "@/store/actions.type";

export default {
  data() {
    return {
      voted: false,
      form: {
        programming: false,
        finance: false,
        english: false,
        bulgarian: false,
        other: false,
        other_text: '',
        email: ''
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch(CREATE_VOTE, this.form);
      this.voted = true;
    }
  }
}
</script>

<style scoped lang="sass">
h2
  margin: 20px 0px 10px 0px
#poll
  color: white
  background: #1E88E5
  padding: 50px 0px
</style>