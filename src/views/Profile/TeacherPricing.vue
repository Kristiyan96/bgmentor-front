<template>
  <span class="h5 font-weight-bold">
    <font-awesome-icon icon="dollar-sign" />
    {{ $t(`profile.titles.price`) }}
    {{ teacher.price || $t(`profile.titles.negotiate`) }}
  </span>
</template>

<script>
export default {
  name: 'TeacherPricing',
  props: {
    teacher: {
      type: Object,
      default: () => {},
      description: 'Teacher being displayed'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
