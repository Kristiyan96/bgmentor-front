<template>
  <LayoutColumn class="lesson-list">
    <template v-slot:title> {{ $t('nav.myLessons') }} </template>

    <template v-slot:header-actions>
      <v-btn icon @click="setLesson(null)">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
      <div class="wrapper">
        <v-text-field
          v-model="search"
          append-icon="search"
          :label="$t('lessons.searchPlaceholder')"
          single-line
          solo
          hide-details
          class="pt-0 px-2 mt-2"
        ></v-text-field>
        <v-container class="px-2 pb-0">
          <v-data-table
            v-if="filteredLessons.length"
            :items="filteredLessons"
            hide-default-footer
            :items-per-page="filteredLessons.length"
            class="table-scroll"
          >
            <template v-slot:item="{ item }">
              <tr
                @click="setLesson(item)"
                :class="{ active: lesson && item.id == lesson.id }"
              >
                <td>
                  <!-- <router-link
                    text
                    :to="`/lessons/${item.id}`"
                    class="subtitle-2"
                    >{{ item.student.first_name }}</router-link
                  > -->
                </td>
                <td class="text-center"></td>
              </tr>
            </template>
          </v-data-table>
          <div v-else class="mt-2">{{ $t('lessons.emptyList') }}</div>
        </v-container>
      </div>
    </template>
  </LayoutColumn>
</template>

<script>
import LayoutColumn from '@/layout/LayoutColumn'
import { mapGetters } from 'vuex'
export default {
  props: {
    lesson: {
      type: Object,
      default: () => {},
      description: 'Selected lesson'
    }
  },
  components: {
    LayoutColumn
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    setLesson(item) {
      this.$emit('setLesson', item)
    }
  },
  computed: {
    ...mapGetters(['lessons']),
    filteredLessons() {
      return this.lessons.filter(
        (l) =>
          (l.student.first_name || '')
            .toLowerCase()
            .search(this.search.toLowerCase()) !== -1
      )
    }
  },
  watch: {
    filteredLessons: {
      immediate: true,
      handler() {
        if (this.filteredLessons.length) {
          this.setLesson(this.filteredLessons[0])
        } else {
          this.setLesson(null)
        }
      }
    }
  }
}
</script>

<style lang="sass">
.lesson-list
  tr.active
    background: #e3f0ff !important
  th:nth-child(2), td:nth-child(2)
    width: 20%
  .subtitle-2
    text-decoration: none
  .wrapper
    position: relative
    max-height: 100%
    overflow: hidden
</style>
