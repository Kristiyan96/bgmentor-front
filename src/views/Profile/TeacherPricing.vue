<template>
  <span class="h5 font-weight-bold">
    <TeacherPricingForm :teacher="teacher" />
    <font-awesome-icon icon="dollar-sign" />
    {{ $t(`profile.titles.price`) }}
    {{ teacher.price || $t(`profile.titles.negotiate`) }}
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import DialogForm from '@/components/DialogForm'
import TeacherPricingForm from '@/views/Profile/TeacherPricingForm'

export default {
  name: 'TeacherPricing',
  components: {
    DialogForm,
    TeacherPricingForm
  },
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
  methods: {},
  computed: {
    ...mapGetters(['currentUser', 'profile'])
  }
}
</script>
