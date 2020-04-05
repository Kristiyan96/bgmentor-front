<template>
  <section id="courses">
    <h2 class="text-center">Курсове Програмиране 2019/2020</h2>
    <v-container>
      <v-row align-content="center">
        <div class="col-sm-5 col-md-4 offset-sm-1 offset-md-2">
          <v-card
            flat
            outlined
            height="100%"
            :raised="active1"
            :elevation="active1 ? 3 : 0"
            @mouseover="active1 = true"
            @mouseleave="active1 = false"
          >
            <v-card-title class="pb-0 pb-0 pl-2 mb-3 grey--text">
              <img class="mr-5" src="@/assets/images/programmer2.svg"/>  
              Начинаещи (6 клас +)
            </v-card-title>
            <v-card-subtitle style="padding-left: 98px">група 3-6 ученици</v-card-subtitle>

            <v-card-text class="text--primary">
              <ul>
                <li>Основи за програмирането на C ++</li>
                <li>Скаларни типове данни</li>
                <li>Разклонени алгоритми. Условен оператор</li>
                <li>Оператор за цикли</li>
                <li>Масиви</li>
                <li>Символни низове</li>
                <li>Двумерни масиви</li>
              </ul>
              <v-divider class="mb-3 mt-3" />
              Цена: 
              <ul style="text-decoration: line-through;">
                <li>Еднократно посещение(2ч.) - 25лв.</li>
                <li>4 посещения(8ч.) - 80лв.</li>
                <li>12 посещения(24ч.) - 230лв</li>
              </ul>
              <span class="red--text">На 19.04.2020 започва безплатен едномесечен курс.</span>
            </v-card-text>
          </v-card>
        </div>
        <div class="col-sm-5 col-md-4">
          <v-card
            class="signup"
            flat
            outlined
            :raised="active2"
            :elevation="active2 ? 3 : 0"
            @mouseover="active2 = true"
            @mouseleave="active2 = false"
          >
            <v-card-title class="pb-0 pb-0 pl-2 mb-3 grey--text">
              <img class="mr-5" src="@/assets/images/programmer1.svg"/>  
              Напреднали (8 клас +)
            </v-card-title>
            <v-card-subtitle style="padding-left: 98px">група 3-6 ученици</v-card-subtitle>

            <v-card-text class="text--primary">
              <ul>
                <li>Въведение в Обектно-Ориентирано Програмиране</li>
                <li>Структури от данни</li>
                <li>Функции</li>
                <li>Алгоритми и оптимизации</li>
                <li><b>Проект по избор с план и напътствия</b></li>
                <li><b>Анализ на проекта и препоръки</b></li>
              </ul>
              <v-divider class="mb-3 mt-3" />
              Цена: 
              <ul>
                <li>Еднократно посещение(2ч.) - 25лв.</li>
                <li>4 посещения(8ч.) - 80лв.</li>
                <li>12 посещения(24ч.) - 230лв</li>
              </ul>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </div>
      </v-row>

      <v-row align-content="center">
        <div class="col-sm-5 col-md-4 offset-sm-1 offset-md-2">
          <v-card
            flat
            outlined
            height="100%"
            :raised="active3"
            :elevation="active3 ? 3 : 0"
            @mouseover="active3 = true"
            @mouseleave="active3 = false"
          >
            <v-card-title class="pb-0 pb-0 pl-2 mb-3 grey--text">
              <img class="mr-5" src="@/assets/images/programmer.svg"/>  
              Индивидуални уроци
            </v-card-title>

            <v-card-text class="text--primary">
              При индивидуалните уроци материалът се наглася спрямо нуждите на ученика. По Ваш избор, занятията може да се провеждат онлайн.
              <v-divider class="mb-3 mt-3" />
              Цена: 
              <ul>
                <li>Еднократно посещение(1ч) - 30лв.</li>
                <li>Еднократно посещение(90мин) - 40лв.</li>
                <li>Еднократно посещение(2ч) - 50лв.</li>
              </ul>
            </v-card-text>
          </v-card>
        </div>
        <div class="col-sm-5 col-md-4">
          <v-card
            height="100%"
            flat
          >
            <v-card-title class="pb-0 pl-2 mb-3">Как да се запиша?</v-card-title>
            <v-card-text class="text--primary">
              Записването става на място (ул. Кирил и Методий 27), на номер <a color="primary" href="tel:+359887627776">088 762 7776</a> или от бутона "Запиши се".
            </v-card-text>
            <v-card-actions>
              <CourseSignUp subject="programming"/>
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
      active3: false
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
img
  height: 70px
</style>