<template>
  <section class="about">
    <h2 class="text-center">За нас</h2>
    <v-container>
      <v-row>
        <v-col md="6" sm="8" xs="10" offset-md="3" offset-sm="2" offset-xs="1" class="about-us">
          Ние сме екип от младежи, възпитаници на СМГ (Софийска Математическа Гимназия “Паисий Хилендарски”) и 
          ФМИ (Факултет по Математика и Информатика). Това, че доскоро сме били на мястото на учениците ни 
          дава изключително важни предимства - позволява ни да предразположим учениците и съответно да 
          разберем кой материал ги затруднява. <br><br>
          Повечето деца изпитват проблеми именно с математиката, 
          тъй като е предмет, който изисква постоянство и последователност. Щом изпуснеш част от материала, 
          верижката е прекъсната и не можеш да продължиш напред. Това се явява пречка за усвояване на 
          новия материал и децата се отказват от предмета, понеже няма кой да обърне внимание на частта, 
          която им липсва. Ние намираме неясностите и знаем как да ги изчистим. След това 
          математиката лесна и забавна за всекиго, тъй като развива логическото ни мислене и ни помага 
          да се справим с всеки проблем. 
        </v-col>
      </v-row>
      <v-row>
        <v-col md="4" sm="5" xs="12" offset-md="2" offset-sm="1">
          <v-card
            height="100%"
            :raised="active1"
            :elevation="active1 ? 3 : 0"
            @mouseover="active1 = true"
            @mouseleave="active1 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline">Теодор Илиев</v-list-item-title>
                <v-list-item-subtitle>Съосновател / Учител</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
              src="@/assets/images/Teodor.png"
              height="300"
            ></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Следва компютърни науки в СУ. Завършил паралелката с най-висок бал в страната - СМГ с немски език
              </div>
              <br>
              <v-divider />
              <br>
              Занимавам се с преподаване на математика на ученици вече две години. Това, че съм завършил толкова скоро, 
              ми дава възможността да гледам на проблемите по по-различен начин - близък до мисленето на учениците. 
              Включвам се в тази инициатива, понеже ще ми даде възможност да помогна на възможно най-много хора.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="4" sm="5" xs="12">
          <v-card
            height="100%"
            :raised="active2"
            :elevation="active2 ? 3 : 0"
            @mouseover="active2 = true"
            @mouseleave="active2 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline">Кристиян Цветанов</v-list-item-title>
                <v-list-item-subtitle>Съосновател</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
              src="@/assets/images/Kris.jpg"
              height="300"
            ></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Завършил Компютърни науки и Мениждмънт в <i>Университетът в Единбург (The University of Edinburgh)</i>
                с отличие и медал за най-висок резултат в класа
                Завършил Софийска Математическа гимназия (5-12 клас)
              </div>
              <br>
              <v-divider />
              <br>
              Занимавам се с програмиране професионално от 3 години. Това ми позволи да работя по достатъчно софтуерни проекти,
              които ни помагат да решим ежедневни проблеми по-ефикасно и по-качествено. Вярвам, че в това отношение, 
              образованието е една от сферите, които заслужава, но все още не е получила достатъчно внимание.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      active1: false,
      active2: false
    }
  }
};
</script>

<style scoped lang="sass">
.about
  background-color: #f7f9fa
  padding: 50px 0px
.about-us
  text-align: justify
</style>