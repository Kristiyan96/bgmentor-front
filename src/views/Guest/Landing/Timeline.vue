<template>
  <section class="timeline">
    <h2 class="text-center">Учебен план за 2019/2020</h2>
    <v-container>
      <v-row class="grade-picker">
        <v-btn-toggle
          v-model="grade"
          borderless
          dense
          tile
          color="primary accent-3"
          group
        >
          <v-btn value="seven">
            7-ми клас
          </v-btn>

          <!-- <v-btn value="eight">
            8-ми клас
          </v-btn>

          <v-btn value="nine">
            9-ти клас
          </v-btn> -->

          <v-btn value="ten">
            10-ти клас
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row align-content="center">
        <v-col lg="6" md="8" sm="10" xs="12" offset-lg="3" offset-md="2" offset-sm="1">
          <v-timeline dense>
            <v-timeline-item
              v-for="(range, i) in material[grade]"
              :key="i"
              :color="range.color"
              small
            >
              <span
                :class="`font-weight-bold ${range.color}--text`"
                v-text="range.year"
              ></span>
              <div class="py-4">
                <h2 :class="`headline font-weight-light mb-4 ${range.color}--text`">{{ range.title }}</h2>
                <div>
                  {{range.description}}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      grade: "seven",
      material: {
        "seven": [
          {
            color: 'cyan',
            year: '28.10 - 24.11',
            title: 'Цели изрази',
            description: ''
          },
          {
            color: 'green',
            year: '25.11 - 22.12',
            title: 'Уравнения',
            description: ''
          },
          {
            color: 'pink',
            year: '06.01 - 05.02',
            title: 'Основни геометрични фигури',
            description: ''
          },
          {
            color: 'amber',
            year: '10.02 - 08.03',
            title: 'Еднакви триъгълници',
            description: ''
          },
          {
            color: 'cyan',
            year: '09.03 - 05.04',
            title: ' Неравенства',
            description: ''
          },
          {
            color: 'green',
            year: '06.04 - 10.05',
            title: 'Успоредник, Елементи от вероятност и статистика',
            description: ''
          },
          {
            color: 'pink',
            year: '11.05 - 07.06',
            title: 'Упражнение',
            description: ''
          }
        ],
        "eight": [

        ],
        "nine": [

        ],
        "ten": [
          {
            color: 'cyan',
            year: '28.10 - 24.11',
            title: 'Ирационални изрази',
            description: ''
          },
          {
            color: 'green',
            year: '25.11 - 22.12',
            title: 'Ирационални уравнения',
            description: ''
          },
          {
            color: 'pink',
            year: '06.01 - 05.02',
            title: 'Прогресии. Статистика и обработка на данни',
            description: ''
          },
          {
            color: 'amber',
            year: '10.02 - 08.03',
            title: 'Увод в тригонометрията',
            description: ''
          },
          {
            color: 'cyan',
            year: '09.03 - 05.04',
            title: ' Решаване на триъгълник',
            description: ''
          },
          {
            color: 'green',
            year: '06.04 - 10.05',
            title: 'Елементи от стереометрията',
            description: ''
          },
          {
            color: 'pink',
            year: '11.05 - 07.06',
            title: 'Преговор и упражнение',
            description: ''
          }
        ]
      },
    }
  }
};
</script>

<style scoped lang="sass">
.timeline
  background: white
  padding: 50px 0px
h2
  margin-bottom: 50px
.grade-picker
  display: flex
  justify-content: center
</style>