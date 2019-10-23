<template>
  <section class="contacts" id="contacts">
    <h2 class="text-center">Свържете се</h2>
    <v-container>
      <v-row>
        <v-col class="col-lg-4 col-md-4 col-sm-10 offset-lg-2 offset-sm-1">
          <table>
            <tr>
              <td><v-icon>mdi-phone</v-icon></td>
              <td><a href="tel:359897802497">089 780 2497<a/></td>
            </tr>
            <tr>
              <td><v-icon>mdi-email</v-icon></td>
              <td>
                <a href="mailto:bgmentor@abv.bg">bgmentor@abv.bg</a><br> 
                <a href="mailto:sofia.bgmentor@gmail.com">sofia.bgmentor@gmail.com</a>
              </td>
            </tr>
            <tr>
              <td><v-icon>mdi-city</v-icon></td>
              <td>София, ул. "Св. Св. Кирил и Методии 27"</td>
            </tr>
          </table>
        </v-col>
        <v-col class="col-lg-4 col-md-4 col-sm-10">
          <v-card
            :raised="active"
            @mouseover="active = true"
            @mouseleave="active = false"
            shaped
            flat
          >
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe 
                  height="500" 
                  id="gmap_canvas" 
                  src="https://maps.google.com/maps?q=%D1%81%D0%BE%D1%84%D0%B8%D1%8F%2C%20%D0%BA%D0%B8%D1%80%D0%B8%D0%BB%20%D0%B8%20%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D0%B8%2027&t=&z=15&ie=UTF8&iwloc=&output=embed" 
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
      active: false
    }
  }
};
</script>

<style scoped lang="sass">
h2
  margin-bottom: 50px
.contacts
  margin-bottom: 200px
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
</style>