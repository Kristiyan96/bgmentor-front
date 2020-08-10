<template>
  <div>
    <b>Моите предмети</b>
    <v-list two-line v-if="skills.length">
      <v-list-item-group>
        <template v-for="(item, index) in skills">
          <ListItem :item="item" :key="`${item.id}-item`" />
          <v-divider v-if="index + 1 < skills.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <div v-else>Нямате добавени предмети.</div>
    <v-btn color="primary" outlined depressed @click="skillsDialog = true">
      Добави предмет
    </v-btn>
    <NewSkillDialog :open="skillsDialog" @closeDialog="skillsDialog = false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListItem from "./SkillItem";
import NewSkillDialog from "./NewSkillDialog";

export default {
  components: {
    ListItem,
    NewSkillDialog
  },
  data() {
    return { skillsDialog: false };
  },
  methods: {},
  computed: {
    ...mapGetters(["subjects", "levels", "skills"])
  }
};
</script>
