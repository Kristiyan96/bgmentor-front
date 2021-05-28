<template>
  <v-container>
    <v-row> </v-row>
    <v-row>
      <div class="h2 pl-5">
        {{ $t(`search.titles.results`) }}: {{ results.length }}
      </div>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list three-line>
          <template v-for="(item, index) in results">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TeacherSearch',
  props: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters(['results'])
  }
}
</script>

<style scoped lang="sass"></style>
