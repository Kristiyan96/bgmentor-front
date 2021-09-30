<template>
  <section class="contacts" id="contacts">
    <h2 class="text-center">Свържете се</h2>
    <v-container>
      <v-row>
        <v-col class="col-lg-4 col-md-4 col-sm-10 offset-lg-2 offset-sm-1">
          <table>
            <tr>
              <td><v-icon>mdi-phone</v-icon></td>
              <td>
                <a color="primary" href="tel:+35988 762 7776"
                  >+(359)88 762 7776</a
                >
              </td>
            </tr>
            <tr>
              <td><v-icon>mdi-email</v-icon></td>
              <td>
                <a color="primary" class="mr-4" href="mailto:bgmentor@abv.bg"
                  >bgmentor@abv.bg</a
                ><a color="primary" href="mailto:sofia.bgmentor@gmail.com"
                  >sofia.bgmentor@gmail.com</a
                >
              </td>
            </tr>
            <tr>
              <td><v-icon>mdi-facebook</v-icon></td>
              <td>
                <a color="primary" href="">Facebook</a>
              </td>
            </tr>
            <tr>
              <td><v-icon>mdi-instagram</v-icon></td>
              <td>
                <a color="primary" href="">Instagram</a>
              </td>
            </tr>
          </table>
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
      selected: 0
    }
  }
}
</script>

<style scoped lang="sass">
h2
  margin-bottom: 50px
.contacts
  background: #f7f9fa
  padding: 50px 0px
.mapouter
  position: relative
  text-align: right
  max-height: 500px
  max-width: 600px
.gmap_canvas
  overflow: hidden
  background: none !important
  max-height: 500px
  width: 100%
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
