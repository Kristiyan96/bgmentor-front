<template>
  <LayoutColumn class="user-list">
    <template v-slot:title> {{ $t('nav.myStudents') }} </template>

    <template v-slot:header-actions>
      <v-btn icon @click="setFollow(null)">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>

    <template v-slot:content>
      <div class="wrapper">
        <v-text-field
          v-model="search"
          append-icon="search"
          :label="$t('follows.searchPlaceholder')"
          single-line
          solo
          hide-details
          class="pt-0 px-2 mt-2"
        ></v-text-field>
        <v-container class="px-2 pb-0">
          <v-data-table
            v-if="filteredFollows.length"
            :headers="headers"
            :items="filteredFollows"
            hide-default-footer
            :items-per-page="filteredFollows.length"
            class="table-scroll"
          >
            <template v-slot:item="{ item }">
              <tr
                @click="setFollow(item)"
                :class="{ active: follow && item.id == follow.id }"
              >
                <td>
                  <router-link
                    text
                    :to="`/profiles/${item.followee_id}`"
                    class="subtitle-2"
                    >{{ item.name }}</router-link
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
          <div v-else class="mt-2">{{ $t('follows.emptyList') }}</div>
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
    follow: {
      type: Object,
      default: () => {},
      description: 'Selected follow'
    }
  },
  components: {
    LayoutColumn
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Име',
          align: 'left',
          value: 'name'
        }
      ]
    }
  },
  methods: {
    setFollow(item) {
      item = item || { ...this.newFollow }

      this.$emit('setFollow', item)
    }
  },
  computed: {
    ...mapGetters(['follows', 'newFollow']),
    filteredFollows() {
      return this.follows.filter(
        (f) =>
          f.phone_number.search(this.search.toLowerCase()) !== -1 ||
          f.name.toLowerCase().search(this.search.toLowerCase()) !== -1
      )
    }
  }
}
</script>

<style lang="sass">
.user-list
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
