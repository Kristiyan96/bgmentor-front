<template>
  <v-footer app absolute color="primary lighten-1 pt-3 mt-5 pb-5" inset>
    <v-layout justify-center row wrap>
      <div class="bg-mentor">
        <v-row>
          <v-col></v-col>
          <v-col v-for="section in sections" :key="section.title">
            <div class="overline white--text font-weight-bold">
              {{ section.title }}
            </div>
            <v-list-item
              v-for="link in section.links"
              dense
              :key="link.title"
              :href="link.href"
            >
              <v-list-item-content class="white--text">
                <v-list-item-icon>
                  <font-awesome-icon :icon="link.icon" />
                </v-list-item-icon>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </div>
      <v-row
        py-3
        class="text-center white--text bg-mentor primary lighten-2"
        white--text
        xs12
      >
        <v-col>
          &copy;{{ new Date().getFullYear() }}
          <strong class="ml-2">Бг Ментор</strong>
        </v-col>

        <v-col>
          <ChooseLanguage />
        </v-col>

        <v-col>
          <v-btn small color="white" text rounded to="/terms"> Условия </v-btn>
          <v-btn small color="white" text rounded to="/privacy">
            Поверителност
          </v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-footer>
</template>
<script>
import ChooseLanguage from '@/components/ChooseLanguage'
export default {
  components: {
    ChooseLanguage
  },
  data() {
    return {
      sections: [
        {
          title: 'Products',
          links: [
            {
              title: 'Teachers',
              href: '/teachers'
            },
            {
              title: 'Students',
              href: '/students'
            }
          ]
        },
        {
          title: 'Resources',
          links: [
            {
              title: 'FAQ',
              href: '/faq'
            },
            {
              title: 'Blog',
              href: '/blog'
            },
            {
              title: 'About',
              href: '/about'
            }
          ]
        },
        {
          title: 'Socials',
          links: [
            {
              title: 'Facebook',
              href: 'https://www.facebook.com/bgmentorr',
              icon: ''
            },
            {
              title: 'Telegram',
              href: 'https://www.t.me/kr1stiyan',
              icon: ''
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped lang="sass">
footer
  overflow: hidden
.bg-mentor
  width: 100%
  display: flex
  justify-content: center
  margin: 20px 0px 0px 0px
</style>
