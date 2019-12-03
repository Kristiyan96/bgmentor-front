<template>
  <section id="courses">
    <h2 class="text-center">Курсове 2019/2020</h2>
    <v-container>
      <v-row class="justify-center mb-2">
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
      <v-row class="justify-center mb-2 mt-5">
        В кой клас е ученикът?
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
      <v-row align-content="center" v-if="lesson == 'group'">
        <div class="col-sm-6 col-md-5 offset-sm-1 offset-md-2">
          <v-card
            flat
            outlined
            height="100%"
            :raised="active1"
            :elevation="active1 ? 3 : 0"
            @mouseover="active1 = true"
            @mouseleave="active1 = false"
          >
            <v-card-title class="pb-0 pb-0 pl-2 mb-3 grey--text">Информация</v-card-title>

            <v-card-text class="text--primary">
              <b>Начало:</b> {{info['group'][grade].start}}<br><br>
              <b>График:</b> {{info['group'][grade].when}}<br><br>
              <b>Описание:</b> 
              Групите са между 3 и 6 ученици. Едно занятие е от 4 учебни часа с почивки между всеки от тях - общо 3 астрономически часа.
              Схема на занятие:
              <ul>
                <li>Преподаване на нов материал  - 5 минутна почивка</li>
                <li>Преподаване на нов материал - 10 минутна почивка</li>
                <li>Упражнение (решаване на задачи) - 5 минутна почивка</li>
                <li>Упражнение / индивидуална работа с учениците за изчистване на пропуски - край</li>
              </ul><br>
              <b>Цена:</b> {{info['group'][grade].price}}<br>
            </v-card-text>
          </v-card>
        </div>
        <div class="col-sm-4 col-md-3">
          <v-card
            class="signup"
            flat
            outlined
            :raised="active2"
            :elevation="active2 ? 3 : 0"
            @mouseover="active2 = true"
            @mouseleave="active2 = false"
          >
            <v-card-title class="pb-0 pb-0 pl-2 mb-3 grey--text">Записване</v-card-title>

            <v-card-text class="text--primary">
              Записването става на място (ул. Кирил и Методий 27). Можете да запазите място като се обадите на мобилния ни номер <a color="primary" href="tel:+35988 762 7776">088 762 7776</a> или като кликнете на бутона "Запиши се". Можете да се включите по всяко време!
            </v-card-text>

            <v-card-actions>
              <CourseSignUp :grade="grade" :lesson="lesson"/>
            </v-card-actions>
          </v-card>
          <v-card
            class="how-to-choose mt-1"
            flat
            :raised="active3"
            :elevation="active3 ? 3 : 0"
            @mouseover="active3 = true"
            @mouseleave="active3 = false"
          >
            <v-card-title class="pb-0 pl-2 mb-3 white--text">Как да изберем?</v-card-title>

            <v-card-text class="white--text">
              Прегледайте нашата статия, в която съветваме как да изберете между частни и групови уроци.
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="white--text px-5"
                outlined
                rounded
                style="border: 1px solid white;"
                text
                to="/частно-или-групово"
              >
                Прочети
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-row>
      <v-row v-else>
        <div class="col-sm-6 col-md-5 offset-sm-1 offset-md-2">
          <v-card
            height="100%"
            flat
            outlined
            :raised="active2"
            :elevation="active1 ? 3 : 0"
            @mouseover="active1 = true"
            @mouseleave="active1 = false"
          >
            <v-card-title class="pb-0 grey--text pl-2 mb-3">Записване</v-card-title>

            <v-card-text class="text--primary">
              <b>Цена:</b> 20лв на учебен час<br><br>
              Записването става на място (ул. Кирил и Методий 27). Обадете се на мобилния ни номер <a color="primary" href="tel:+359887627776">088 762 7776</a>, за да се разберем за удобно за Вас време.
            </v-card-text>
            <v-card-actions>
              <CourseSignUp :grade="grade" :lesson="lesson"/>
            </v-card-actions>
          </v-card>
        </div>
        <div class="col-sm-4 col-md-3">
          <v-card
            height="100%"
            class="how-to-choose d-flex flex-column"
            flat
            :raised="active2"
            :elevation="active2 ? 3 : 0"
            @mouseover="active2 = true"
            @mouseleave="active2 = false"
          >
            <v-card-title class="pb-0 pl-2 mb-3 white--text">Как да изберем?</v-card-title>

            <v-card-text class="white--text flex-grow-1">
              Прегледайте нашата статия, в която помагаме с избора между частни и групови уроци.
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="white--text px-5"
                outlined
                rounded
                style="border: 1px solid white;"
                text
                to="/частно-или-групово"
              >
                Прочети
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import CourseSignUp from "@/views/components/CourseSignUp";
export default {
  components: {
    CourseSignUp
  },
  data() {
    return {
      active1: false,
      active2: false,
      active3: false,
      grade: "7",
      lesson: "group",
      grades: {
        "5": '5-ти',
        "6": '6-ти',
        "7": '7-ми',
        "8": '8-ми',
        "9": '9-ти',
        "10": '10-ти',
      },
      lessons: {
        "private": "Частни",
        "group": "Полу-частни"
      },
      info: {
        private: {

        },
        group: {
          5: {
            start: "3-ти Ноември 2019",
            when: "Всяка неделя 9:00-12:00",
            description: "",
            price: "Цената на курса е 120лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 830лв с включенен практикум."
          },
          6: {
            start: "3-ти Ноември 2019",
            when: "Всяка неделя 12:30-15:30",
            description: "",
            price: "Цената на курса е 120лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 830лв с включенен практикум."
          },
          7: {
            start: "2-ри Ноември 2019",
            when: "Всяка неделя 16:00-19:00",
            description: "",
            price: "Цената на курса е 120лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 830лв с включенен практикум."
          },
          8: {
            start: "Няма насрочено време",
            when: "Няма насрочено време",
            description: "",
            price: "Цената на курса е 120лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 830лв с включенен практикум."
          },
          9: {
            start: "2-ри Ноември 2019",
            when: "Всяка събота 16:00-19:00",
            description: "",
            price: "Цената на курса е 120лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 830лв с включенен практикум."
          },
          10: {
            start: "2-ри Ноември 2019",
            when: "Всяка събота 12:30-15:30",
            description: "",
            price: "Цената на курса е 120лв на месец. Ако предплатите за целия първи срок (3 месеца наведнъж) получавате над 10% отстъпка и цената е 350лв. За цялата година получавате 15% отстъпка и цената е 830лв с включенен практикум."
          },
        }
      }
    }
  }
};
</script>

<style scoped lang="sass">
#courses
  background: white
  padding: 50px 0px
h2
  margin-bottom: 50px
.grade-picker
  display: flex
  justify-content: center
.how-to-choose
  background: #4FC3F7
.grade-picker .v-item-group
  max-width: 100%
</style>