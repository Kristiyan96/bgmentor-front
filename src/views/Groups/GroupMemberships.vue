<template>
  <v-data-table
    show-select
    :headers="headers"
    :items="memberships"
    :items-per-page="10"
  >
    <!-- <template v-slot:body.prepend="{ headers }">
      <tr>
        <td :colspan="headers.length">
          
        </td>
      </tr>
    </template> -->
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_MEMBERSHIPS, CREATE_MEMBERSHIP, UPDATE_MEMBERSHIP, DESTROY_MEMBERSHIP } from "@/store/actions.type";
import store from "@/store";

export default {
  props: {
    group: {
      type: Object,
      default: () => {},
      description: "Group to crud memberships in"
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Ученик',
          align: 'left',
          sortable: true,
          value: 'name',
        }
      ],
    }
  },
  computed: {
    ...mapGetters(["memberships"]),
  },
  watch: {
    group: {
      immediate: true,
      handler() {
        if(this.group) {
          store.dispatch(FETCH_MEMBERSHIPS, this.group.id);
        }
      }
    }
  }
}
</script>