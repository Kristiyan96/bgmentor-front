<template>
  <v-list-item :to="`/profile/${teacher.id}`">
    <v-list-item-avatar size="190" rounded>
      <ProfileAvatar :teacher="teacher" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-card-title>
        <span class="h2">
          {{ teacher.first_name }}
        </span>
        <v-spacer />
        <v-chip class="ma-2" color="primary" label text-color="white">
          <font-awesome-icon icon="dollar-sign" class="mr-2" />
          <TeacherPricing :teacher="teacher" dontEdit />
        </v-chip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <TeacherTitle :teacher="teacher" />
          </v-col>
          <v-col><ProfileLocation :profile="teacher" /></v-col>
        </v-row>
      </v-card-text>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import ProfileLocation from '@/views/Profile/ProfileLocation'
import TeacherPricing from '@/views/Profile/TeacherPricing'
import TeacherTitle from '@/views/Profile/TeacherTitle'
import ProfileAvatar from '@/views/Profile/ProfileAvatar'

export default {
  name: 'TeacherItem',
  components: {
    ProfileAvatar,
    ProfileLocation,
    TeacherPricing,
    TeacherTitle
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
  methods: {
  }
}
</script>

<style scoped lang="sass">
.img
  border-radius: 5px
.left-border
  border-left: 1px solid rgb(200,200,200)
</style>
