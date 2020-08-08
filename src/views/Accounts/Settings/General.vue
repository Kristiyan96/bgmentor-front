<template>
  <LayoutColumn paddingless v-if="user">
    <template v-slot:title>
      Лична информация
    </template>

    <template v-slot:content>
      <v-form @submit.prevent="submit">
        <v-text-field v-model="user.name" label="Име" required>
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'user']"
            slot="prepend"
          />
        </v-text-field>
        <v-text-field disabled v-model="user.email" label="Имейл" required>
          <font-awesome-icon
            class="grey--text"
            :icon="['fa', 'at']"
            slot="prepend"
          />
        </v-text-field>
        <!-- The following line submits the form when pressing enter -->
        <input type="submit" value="Submit" class="d-none" />
      </v-form>
    </template>

    <template v-slot:actions>
      <v-btn :disabled="false" depressed @click="alert()" text>
        Върни промените
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        :disabled="!dirty"
        depressed
        :loading="loading"
        @click="submit"
      >
        Редактирай
      </v-btn>
    </template>
  </LayoutColumn>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { UPDATE_PROFILE, FETCH_PROFILE } from "@/store/actions.type";
import LayoutColumn from "@/layout/LayoutColumn";

export default {
  components: {
    LayoutColumn
  },
  data() {
    return {
      show: false,
      loading: false,
      user: null
    };
  },
  mounted() {
    this.user = {
      ...this.current_user
    };
  },
  methods: {
    submit() {
      this.loading = true;
      store.dispatch(UPDATE_PROFILE, this.user).then(response => {
        this.loading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["current_user"]),
    dirty() {
      return this.user.name != this.current_user.name;
    }
  },
  watch: {
    current_user: {
      immediate: true,
      handler() {
        store.dispatch(FETCH_PROFILE, { id: null });
      }
    }
  }
};
</script>
