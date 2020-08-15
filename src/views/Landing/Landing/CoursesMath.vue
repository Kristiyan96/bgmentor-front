<template>
  <section id="courses">
    <h2 class="text-center">Курсове Математика 2020/2021</h2>
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
            <v-card-text class="text--primary">
              <b>Начало:</b> {{ info["group"][grade].start }}<br /><br />
              <b>График:</b> {{ info["group"][grade].when }}<br /><br />
              <b>Описание:</b>
              Групите са между 3 и 6 ученици. Едно занятие е от
              {{ info["group"][grade].school_h }} учебни часа с почивки между
              всеки от тях - общо {{ info["group"][grade].astr_h }}. Схема на
              занятие:
              <ul>
                <li>Преподаване на нов материал</li>
                <li>Упражнение (решаване на задачи)</li>
                <li>
                  Упражнение / индивидуална работа с учениците за изчистване на
                  пропуски
                </li>
              </ul>
              <br />
              <b>Цена:</b> {{ info["group"][grade].price }}<br />
            </v-card-text>
          </v-card>
        </div>
        <div class="col-sm-4 col-md-3">
          <v-card class="signup" flat>
            <v-card-title class="pb-0 pl-2 mb-3"
              >Как да се запиша?</v-card-title
            >
            <v-card-text class="text--primary">
              Записването става на
              <a color="primary" href="tel:+35988 762 7776">088 762 7776</a> или
              като кликнете на бутона "Запиши се". Можете да се включите по
              всяко време!
            </v-card-text>

            <v-card-actions>
              <CourseSignUp :grade="grade" :lesson="lesson" />
            </v-card-actions>
          </v-card>
          <v-card class="how-to-choose mt-1" flat>
            <v-card-title class="pb-0 pl-2 mb-3">Как да изберем?</v-card-title>

            <v-card-text>
              Прегледайте нашата статия, в която съветваме как да изберете между
              частни и групови уроци.
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="px-5"
                outlined
                rounded
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
            <v-card-text class="text--primary">
              <b>Цена:</b> 20лв на учебен час<br /><br />
              <b>Записването</b> става на
              <a color="primary" href="tel:+359887627776">088 762 7776</a> или
              от бутона "Запиши се".
            </v-card-text>
            <v-card-actions>
              <CourseSignUp :grade="grade" :lesson="lesson" subject="maths" />
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
            <v-card-title class="pb-0 pl-2 mb-3">Как да изберем?</v-card-title>

            <v-card-text class="flex-grow-1">
              Прегледайте нашата статия, в която помагаме с избора между частни
              и групови уроци.
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="px-5"
                outlined
                rounded
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
        "5": "5-ти",
        "6": "6-ти",
        "7": "7-ми",
        "9": "9-ти",
        "10": "10-ти",
        "11": "11-ти",
        "12": "12-ти"
      },
      lessons: {
        private: "Частни",
        group: "Групови"
      },
      info: {
        private: {},
        group: {
          5: {
            start: "5-ти Септември 2020",
            when: "Уточнява се.",
            description:
              "ул. Кирил и Методий 27(Сточна гара), ул. Николай Гогол 21(Орлов мост), ",
            price:
              "Еднократно посещение - 25лв. 4 посещения - 80лв. 12 посещения - 230лв",
            school_h: 3,
            astr_h: "2ч 20мин (20 мин почивка)"
          },
          6: {
            start: "5-ти Септември 2020",
            when: "Уточнява се.",
            description: "ул. Николай Гогол 21",
            price:
              "Еднократно посещение - 25лв. 4 посещения - 80лв. 12 посещения - 230лв",
            school_h: 3,
            astr_h: "2ч 20мин (20 мин почивка)"
          },
          7: {
            start: "5-ти Септември 2020",
            when: "Уточнява се.",
            description: "ул. Кирил и Методий 27",
            price:
              "Еднократно посещение - 35лв. 4 посещения - 120лв. 12 посещения - 350лв",
            school_h: 4,
            astr_h: "3ч 10мин (30 мин почивка)"
          },
          9: {
            start: "5-ти Септември 2020",
            when: "Уточнява се.",
            description: "ул. Кирил и Методий 27",
            price:
              "Еднократно посещение - 25лв. 4 посещения - 80лв. 12 посещения - 230лв",
            school_h: 3,
            astr_h: "2ч 20мин (20 мин почивка)"
          },
          10: {
            start: "5-ти Септември 2020",
            when: "Уточнява се.",
            description: "ул. Кирил и Методий 27",
            price:
              "Еднократно посещение - 35лв. 4 посещения - 120лв. 12 посещения - 350лв",
            school_h: 4,
            astr_h: "3ч 10мин (30 мин почивка)"
          },
          11: {
            start: "5-ти Септември 2020",
            when: "Уточнява се.",
            description: "ул. Кирил и Методий 27",
            price:
              "Еднократно посещение - 25лв. 4 посещения - 80лв. 12 посещения - 230лв",
            school_h: 3,
            astr_h: "2ч 20мин (20 мин почивка)"
          },
          12: {
            start: "5-ти Септември 2020",
            when: "Уточнява се.",
            description: "ул. Кирил и Методий 27",
            price:
              "Еднократно посещение - 35лв. 4 посещения - 120лв. 12 посещения - 350лв",
            school_h: 4,
            astr_h: "3ч 10мин (30 мин почивка)"
          }
        }
      }
    };
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
.grade-picker .v-item-group
  max-width: 100%
</style>
