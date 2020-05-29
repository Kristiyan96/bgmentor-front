<template>
  <div>
    <v-btn
      text
      v-for="item in userTypes"
      :key="item.value"
      @click="setUserType(item.value)"
      :color="userType == item.value ? 'primary' : ''"
    >
      {{ item.text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    userType: {
      type: String,
      default: "students",
      description: "Selected user type"
    }
  },
  data() {
    return {
      userTypes: [
        {
          text: "Ученици",
          value: "students"
        },
        {
          text: "Родители",
          value: "guardians"
        },
        {
          text: "Учители",
          value: "teachers"
        }
      ]
    };
  },
  methods: {
    setUserType(type) {
      this.$emit("setUserType", type);
    }
  }
};
</script>