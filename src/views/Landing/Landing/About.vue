<template>
  <section class="about">
    <h2 class="text-center">За нас</h2>
    <v-container>
      <v-row>
        <v-col
          md="6"
          sm="8"
          xs="10"
          offset-md="3"
          offset-sm="2"
          offset-xs="1"
          class="about-us"
        >
          Ние сме екип от младежи, възпитаници на СМГ (Софийска Математическа
          Гимназия “Паисий Хилендарски”) и ФМИ (Факултет по Математика и
          Информатика). Това, че доскоро сме били на мястото на учениците ни
          дава изключително важни предимства - позволява ни да предразположим
          учениците и съответно да разберем кой материал ги затруднява.
          <br /><br />
          Повечето деца изпитват проблеми именно с математиката, тъй като е
          предмет, който изисква постоянство и последователност. Щом изпуснеш
          част от материала, верижката е прекъсната и не можеш да продължиш
          напред. Това се явява пречка за усвояване на новия материал и децата
          се отказват от предмета, понеже няма кой да обърне внимание на частта,
          която им липсва. Ние намираме неясностите и знаем как да ги изчистим.
          След това математиката e лесна и забавна за всекиго, тъй като развива
          логическото ни мислене и ни помага да се справим с всеки проблем.
        </v-col>
      </v-row>
      <v-row class="center-content">
        <v-col md="3" sm="3" xs="12">
          <v-card
            height="100%"
            :raised="active3"
            :elevation="active3 ? 3 : 0"
            @mouseover="active3 = true"
            @mouseleave="active3 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline"
                  >Светослав Василев</v-list-item-title
                >
                <v-list-item-subtitle
                  >Учител по математика</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Svetlio.jpg" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Следва Приложна математика в СУ. Бивш състезател по математика
                от СМГ.
              </div>
              <br />
              <v-divider />
              <br />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" xs="12">
          <v-card
            height="100%"
            :raised="active4"
            :elevation="active4 ? 3 : 0"
            @mouseover="active4 = true"
            @mouseleave="active4 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline"
                  >Климентина Савова</v-list-item-title
                >
                <v-list-item-subtitle
                  >Учител по математика</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Kli.jpg" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Следва компютърни науки във ФМИ, завършила математическата
                гимназия в Пловдив.
              </div>
              <br />
              <v-divider />
              <br />
              <div class="text-center grey--text">
                В разширения национален отбор по физика за международното
                състезание International Young Physics Tournament.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" xs="12">
          <v-card
            height="100%"
            :raised="active5"
            :elevation="active5 ? 3 : 0"
            @mouseover="active5 = true"
            @mouseleave="active5 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline"
                  >Ема Евгениева</v-list-item-title
                >
                <v-list-item-subtitle
                  >Учител по математика</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Ema.png" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Следва компютърни науки във ФМИ
              </div>
              <br />
              <v-divider />
              <br />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" xs="12">
          <v-card
            height="100%"
            :raised="active6"
            :elevation="active6 ? 3 : 0"
            @mouseover="active6 = true"
            @mouseleave="active6 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline"
                  >Димитър Кюртев</v-list-item-title
                >
                <v-list-item-subtitle
                  >Учител по програмиране</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Dimitar.jpg" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Следва компютърни науки във ФМИ, бивш възпитаник на СМГ
              </div>
              <br />
              <v-divider />
              <br />
              Математиката ми е страст от най-ранна възраст. Получих държавна
              стипендия и стаж по програмата Study IT fisrt, която се дава само
              на 10 първокурсника всяка година, с отличителен опит в
              програмирането. Още в гимназията водих школа по математика и
              затова съм уверен, че имам нужния опит да помогна и на вас.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="center-content">
        <v-col md="3" sm="3" xs="12">
          <v-card
            height="100%"
            :raised="active7"
            :elevation="active7 ? 3 : 0"
            @mouseover="active7 = true"
            @mouseleave="active7 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline"
                  >Гери Чолакова</v-list-item-title
                >
                <v-list-item-subtitle
                  >Учител по математика</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Kli.jpg" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text"></div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="3" sm="3" xs="12">
          <v-card
            height="100%"
            :raised="active8"
            :elevation="active8 ? 3 : 0"
            @mouseover="active8 = true"
            @mouseleave="active8 = false"
            shaped
            flat
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title class="headline"
                  >Катерина Кунева</v-list-item-title
                >
                <v-list-item-subtitle
                  >Учител по математика</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Kli.jpg" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Последна година в СМГ с немски език
              </div>
              <br />
              <v-divider />
              <br />
              Обичам да преподавам и да виждам прогреса при моите ученици.
              Фактът, че съм още в училище ми дава много близък поглед до
              проблемите на децата.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="center-content">
        <v-col md="4" sm="5" xs="12">
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
                <v-list-item-title class="headline"
                  >Теодор Илиев</v-list-item-title
                >
                <v-list-item-subtitle
                  >Съосновател / Учител</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Teodor.png" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Следва компютърни науки във ФМИ. Завършил паралелката с
                най-висок бал в страната - СМГ с немски език
              </div>
              <br />
              <v-divider />
              <br />
              Занимавам се с преподаване на математика на ученици вече две
              години. Това, че съм завършил толкова скоро, ми дава възможността
              да гледам на проблемите по по-различен начин - близък до мисленето
              на учениците. Включвам се в тази инициатива, понеже ще ми даде
              възможност да помогна на възможно най-много хора.
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
                <v-list-item-title class="headline"
                  >Кристиян Цветанов</v-list-item-title
                >
                <v-list-item-subtitle
                  >Съосновател / Учител</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-img src="@/assets/images/Kris.jpg" height="300"></v-img>

            <v-card-text>
              <div class="text-center grey--text">
                Завършил Компютърни науки и Мениждмънт в
                <i>Университетът в Единбург (The University of Edinburgh)</i>
                с отличие и медал за най-висок резултат в класа Завършил
                Софийска Математическа гимназия (5-12 клас)
              </div>
              <br />
              <v-divider />
              <br />
              Занимавам се с програмиране професионално от 3 години. Това ми
              позволи да работя по достатъчно софтуерни проекти, които ни
              помагат да решим ежедневни проблеми по-ефикасно и по-качествено.
              Вярвам, че в това отношение, образованието е една от сферите,
              които заслужават, но все още не са получили достатъчно внимание.
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
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false,
      active7: false,
      active8: false
    };
  }
};
</script>

<style scoped lang="sass">
.about
  padding: 50px 0px
.about-us
  text-align: justify
.center-content
  justify-content: center
</style>
