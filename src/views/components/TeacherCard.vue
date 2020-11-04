<template>
  <v-card
    height="100%"
    :raised="active"
    :elevation="active ? 3 : 0"
    @mouseover="active = true"
    @mouseleave="active = false"
    shaped
    flat
    class="mx-auto text-center"
  >
    <v-list-item>
      <v-list-item-content class="text-center">
        <v-list-item-title class="headline">{{
          teacher.name
        }}</v-list-item-title>
        <v-list-item-subtitle
          >Учител по {{ teacher.subjects.join(", ") }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <img
      :src="require(`../../assets/images/${teacher.img_name}`)"
      v-bind:alt="teacher.img_name"
      height="300"
    />
    <v-card-text>
      <div class="text-center grey--text">
        {{ teacher.cv_summary }}
      </div>
      <br />
      <v-divider />
      <br />
      <div class="text-center grey--text">
        {{ teacher.bio }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: "Teacher object"
    }
  },
  data() {
    return {
      active: false
    };
  }
};
</script>

<style scoped lang="sass"></style>
