<template>
  <div>
    <v-btn
      small
      color="white"
      v-for="lang in langs"
      :key="lang.value"
      rounded
      :text="$i18n.locale !== lang.value"
      @click="$i18n.locale = lang.value"
      >{{ lang.label }}</v-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: [
        {
          label: 'Бг',
          value: 'bg'
        },
        {
          label: 'En',
          value: 'en'
        }
      ]
    }
  }
}
</script>
