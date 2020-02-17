<template>
  <section class="contacts" id="contacts">
    <h2 class="text-center">Свържете се</h2>
    <v-container>
      <v-row>
        <v-col class="col-lg-4 col-md-4 col-sm-10 offset-lg-2 offset-sm-1">
          <table>
            <tr>
              <td><v-icon>mdi-phone</v-icon></td>
              <td><a color="primary" href="tel:+35988 762 7776">088 762 7776</a></td>
            </tr>
            <tr>
              <td><v-icon>mdi-email</v-icon></td>
              <td>
                <a color="primary" href="mailto:bgmentor@abv.bg">bgmentor@abv.bg</a><br> 
                <a color="primary" href="mailto:sofia.bgmentor@gmail.com">sofia.bgmentor@gmail.com</a>
              </td>
            </tr>
            <tr>
              <td><v-icon>mdi-city</v-icon></td>
              <td>София, ул. "Св. Св. Кирил и Методий 27" (Офис 1)</td>
            </tr>
            <tr>
              <td><v-icon>mdi-city</v-icon></td>
              <td>София, ул. "Николай Гогол" 21 (Офис 2)</td>
            </tr>
          </table>
        </v-col>
        <v-col class="col-lg-4 col-md-4 col-sm-10">
          <v-card
            :raised="active"
            :elevation="active ? 3 : 0"
            @mouseover="active = true"
            @mouseleave="active = false"
            shaped
            flat
          >
            <div class="mapouter">
              <div class="gmap_canvas">
                <v-tabs v-model="selected">
                  <v-tab v-for="address in addresses" :key="address.title">{{address.title}}</v-tab>
                </v-tabs>
                <iframe 
                  height="450" 
                  id="gmap_canvas" 
                  :src="addresses[selected].link" 
                  frameborder="0" 
                  scrolling="no" 
                  marginheight="0" 
                  marginwidth="0">
                </iframe>
              </div>
            </div>
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
      active: false,
      addresses: [
        {
          title: 'Офис 1',
          link: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.045412837181!2d23.326595115467185!3d42.70275917916532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x160e33202ab13629!2z0KjQutC-0LvQsCAi0JHQsyDQnNC10L3RgtC-0YAi!5e0!3m2!1sen!2sbg!4v1573422803711!5m2!1sen!2sbg'
        },
        {
          title: 'Офис 2',
          link: 'https://maps.google.com/maps?q=ul%20Nikolai%20Gogol%2021&t=&z=15&ie=UTF8&iwloc=&output=embed'
        }
        
      ],
      selected: 0
    }
  }
};
</script>

<style scoped lang="sass">
h2
  margin-bottom: 50px
.contacts
  background: #f7f9fa
  padding: 50px 0px
.mapouter
  position:relative
  text-align:right
  max-height:500px
  max-width:600px
.gmap_canvas
  overflow: hidden
  background: none !important
  max-height:500px
  width:100%
  iframe
    min-width: 100%
table
  width: 100%
  padding-top: 50px
  td
    padding: 10px
a
  font-weight: bold
  text-decoration: none
</style>