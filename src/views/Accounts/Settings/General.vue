<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="user.name" label="Name" required
      ><font-awesome-icon
        class="grey--text"
        :icon="['fa', 'user']"
        slot="prepend"
    /></v-text-field>
    <v-text-field disabled v-model="user.email" label="Email" required
      ><font-awesome-icon class="grey--text" :icon="['fa', 'at']" slot="prepend"/>
    </v-text-field>
    <v-btn m-0 depressed color="success" @click="submit" :loading="loading"
      >Save</v-btn
    >
    <!-- The following line submits the form when pressing enter -->
    <input type="submit" value="Submit" class="d-none" />
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { UPDATE_USER, FETCH_USER } from "@/store/actions.type";

export default {
  data() {
    return {
      show: false,
      loading: false,
      user: { name: "", email: "", avatar: "" },
    };
  },
  mounted() {
    this.user = {
      ...this.current_user
    }
  },
  methods: {
    submit() {
      this.loading = true;
      store.dispatch(UPDATE_USER, this.user);
    }
  },
  computed: {
    ...mapGetters(["current_user"]),
  },
  watch: {
    current_user: {
      immediate: true,
      handler() {
        store.dispatch(FETCH_USER);
      }
    }
  }
};
</script>