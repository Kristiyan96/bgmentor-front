<template>
  <Layout2x1>
    <template v-slot:col-left>
      <FollowList @setFollow="setFollow" :follow="follow" />
    </template>
    <template v-slot:col-right>
      <FollowPreview :follow="follow" />
    </template>
  </Layout2x1>
</template>

<script>
import store from '@/store'
import FollowPreview from '@/views/Follows/FollowPreview'
import FollowList from '@/views/Follows/FollowList'
import Layout2x1 from '@/layout/Layout2x1'
export default {
  components: {
    FollowPreview,
    FollowList,
    Layout2x1
  },
  data() {
    return {
      follow: null
    }
  },
  mounted() {
    store.dispatch('fetchFollows')
  },
  methods: {
    setFollow(follow) {
      this.follow = follow
    }
  }
}
</script>

<style lang="sass">
tr.active
  background: #e3f0ff !important
th:nth-child(2), td:nth-child(2)
  width: 20%
</style>
