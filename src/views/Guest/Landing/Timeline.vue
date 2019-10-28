<template>
  <section class="timeline" id="timeline">
    <h2 class="text-center">Курсове 2019/2020</h2>
    <v-container>
      <v-row class="justify-center mb-2">
        В кой клас е ученика?
      </v-row>
      <v-row class="grade-picker">
        <v-slide-group show-arrows :value="grade">
          <v-slide-item
            v-for="(value, name) in grades"
            :key="name"
            v-slot:default="{ active, toggle }"
            :value="name"
          >
            <v-btn
              class="mx-2"
              :input-value="active"
              active-class="primary white--text"
              depressed
              rounded
              @click="grade = name"
            >
              {{ value }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-row>
      <v-row class="justify-center mb-2 mt-5">
        Какви уроци предпочитате?
      </v-row>
      <v-row class="grade-picker">
        <v-slide-group show-arrows :value="lesson">
          <v-slide-item
            v-for="(value, name) in lessons"
            :key="name"
            v-slot:default="{ active, toggle }"
            :value="name"
          >
            <v-btn
              class="mx-2"
              :input-value="active"
              active-class="primary white--text"
              depressed
              rounded
              @click="lesson = name"
            >
              {{ value }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-row>
      <v-row align-content="center">
        <div class="col-sm-6 col-md-5 offset-sm-1 offset-md-2">
          <v-card
            flat
            outlined
            :raised="active1"
            :elevation="active1 ? 3 : 0"
            @mouseover="active1 = true"
            @mouseleave="active1 = false"
          >
            <v-card-subtitle class="pb-0 grey--text pl-2">Информация</v-card-subtitle>

            <v-card-text class="text--primary">
              <b>Начало:</b> {{info['group'][grade].start}}<br>
              <b>График:</b> {{info['group'][grade].when}}<br>
              <b>Описание:</b> 
              Групите са между 3 и 6 ученици. Едно занятие е от 4 учебни часа с почивки между всеки от тях - общо 3 астрономически часа.
              Схема на занятие:
              <ul>
                <li>Преподаване на нов материал  - 5 минутна почивка</li>
                <li>Преподаване на нов материал - 10 минутна почивка</li>
                <li>Упражнение (решаване на задачи) - 5 минутна почивка</li>
                <li>Упражнение / индивидуална работа с учениците за изчистване на пропуски - край</li>
              </ul>
              <b>Цена:</b> {{info['group'][grade].price}}<br>
            </v-card-text>
          </v-card>
        </div>
        <div class="col-sm-4 col-md-3">
          <v-card
            flat
            outlined
            :raised="active2"
            :elevation="active2 ? 3 : 0"
            @mouseover="active2 = true"
            @mouseleave="active2 = false"
          >
            <v-card-subtitle class="pb-0 grey--text pl-2">Записване</v-card-subtitle>

            <v-card-text class="text--primary">
              Записването става на място (ул. Кирил и Методий 27). Можете да запазите място като се обадите на мобилния ни номер <a color="primary" href="tel:+359897802497">089 780 2497</a> Можете да се включите по всяко време!
            </v-card-text>
          </v-card>
        </div>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      active1: false,
      active2: false,
      grade: "7",
      lesson: "group",
      grades: {
        "5": '5-ти',
        "6": '6-ти',
        "7": '7-ми',
        "9": '9-ти',
        "10": '10-ти',
      },
      lessons: {
        "private": "Частни",
        "group": "Групови"
      },
      info: {
        private: {

        },
        group: {
          5: {
            start: "3-ти Ноември 2019",
            when: "Всяка неделя 9:00-12:00",
            description: "",
            price: "Цената на курса е 130лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 829лв с включенен практикум."
          },
          6: {
            start: "3-ти Ноември 2019",
            when: "Всяка неделя 12:30-15:30",
            description: "",
            price: "Цената на курса е 130лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 829лв с включенен практикум."
          },
          7: {
            start: "2-ри Ноември 2019",
            when: "Всяка събота 9:00-12:00",
            description: "",
            price: "Цената на курса е 130лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 829лв с включенен практикум."
          },
          9: {
            start: "2-ри Ноември 2019",
            when: "Всяка събота 16:00-19:00",
            description: "",
            price: "Цената на курса е 130лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 829лв с включенен практикум."
          },
          10: {
            start: "2-ри Ноември 2019",
            when: "Всяка събота 12:30-15:30",
            description: "",
            price: "Цената на курса е 130лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 829лв с включенен практикум."
          },
        }
      }
    }
  }
};
</script>

<style scoped lang="sass">
#timeline
  background: white
  padding: 50px 0px
h2
  margin-bottom: 50px
.grade-picker
  display: flex
  justify-content: center
</style>