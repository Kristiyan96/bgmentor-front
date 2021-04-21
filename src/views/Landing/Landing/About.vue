<template>
  <section id="about">
    <h2 class="text-center">За нас</h2>
    <v-container>
      <v-row class="short-description">
        <v-col md="6" sm="8" xs="10" class="about-us">
          Екипът на БгМентор се стреми да подобри условията на преподаване като
          предоставя решения на проблеми като намирането на правилния за Вас
          учител, разплащане онлайн, намирането на удобна локация за Вашите
          уроци.
          <br /><br /><br />
        </v-col>
        <v-col lg="12">
          <v-row class="teachers">
            <v-col
              lg="5"
              md="4"
              sm="6"
              xs="12"
              founder
              v-for="founder in founders"
              :key="founder.name"
            >
              <TeacherCard :teacher="founder" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TeacherCard from '@/components/TeacherCard'
export default {
  components: {
    TeacherCard
  },
  data() {
    return {
      founders: [
        {
          name: 'Теодор Илиев',
          subjects: ['математика'],
          img_name: 'Teodor.png',
          cv_summary:
            'Следва компютърни науки във ФМИ. Завършил паралелката с най-висок бал в страната - СМГ с немски език',
          bio:
            'Занимавам се с преподаване на математика на ученици вече 3 години. Това, че съм завършил толкова скоро, ми дава възможността да гледам на проблемите по начин близък до този на учениците. Включвам се в тази инициатива, понеже ще ми даде възможност да помогна на възможно най-много хора.'
        },
        {
          name: 'Кристиян Цветанов',
          subjects: ['математика'],
          img_name: 'Kris.jpg',
          cv_summary:
            'Завършил Компютърни науки и Мениждмънт в Университетът в Единбург (The University of Edinburgh) с отличие и медал за най-висок резултат в класа. Завършил СМГ (5-12 клас)',
          bio:
            'Занимавам се с програмиране професионално от 4 години. Това ми позволи да работя по достатъчно софтуерни проекти, които ни помагат да решим ежедневни проблеми по-ефикасно и по-качествено. Вярвам, че в това отношение, образованието е една от сферите, които заслужават, но все още не са получили достатъчно внимание.'
        }
      ]
    }
  }
}
</script>

<style scoped lang="sass">
#about
  padding: 50px 0px
.about-us
  text-align: justify
.center-content
  justify-content: center
.short-description, .teachers
  justify-content: center
</style>
