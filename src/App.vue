<template>
  <v-app id="app">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </v-app>
</template>

<script>
import DefaultLayout from '@/layout/DefaultLayout'
export default {
  components: {
    DefaultLayout
  },
  name: 'App'
}
</script>

<style></style>
