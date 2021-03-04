import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/views/Guest/Signin'
import Signup from '@/views/Guest/Signup'
import Verify from '@/views/Guest/Verify'
import ForgotPassword from '@/views/Guest/ForgotPassword'
import ResetPassword from '@/views/Guest/ResetPassword'
import UsersList from '@/views/admin/users/List'
import UserEdit from '@/views/admin/users/Edit'
import Account from '@/views/Account'
import Landing from '@/views/Landing/index'
import Payments from '@/views/Payments/index'
import MyLessons from '@/views/Lessons/index'
import MyFollows from '@/views/Follows/index'
import CalendarWrapper from '@/views/Schedule/CalendarWrapper'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/me',
      name: 'Account',
      component: Account,
      children: [
        {
          path: 'general',
          component: () => import('@/views/Account/General')
        },
        {
          path: 'teacher_profile',
          component: () => import('@/views/Account/TeacherProfile')
        },
        {
          path: 'security',
          component: () => import('@/views/Account/Security')
        },
        {
          path: 'notifications',
          component: () => import('@/views/Account/Notifications')
        }
      ]
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: CalendarWrapper
    },
    {
      path: '/my_lessons',
      name: 'MyLessons',
      component: MyLessons
    },
    {
      path: '/follows',
      name: 'Follows',
      component: MyFollows
    },
    {
      path: '/payments',
      name: 'Payments',
      component: Payments
    },
    {
      path: '/verify',
      name: 'Verify',
      component: Verify
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/forgot_password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/password_resets/:token',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/admin/users',
      name: 'UsersList',
      component: UsersList
    },
    {
      path: '/admin/users/:id',
      name: 'UserEdit',
      component: UserEdit
    }
  ]
})
