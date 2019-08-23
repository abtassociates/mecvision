import Vue from 'vue'
import Router from 'vue-router'
import AppVision from './components/Vision.vue'
import AppGuide from './components/Guide.vue'
import AppGuideEs from './components/Guide-es.vue'
import AppAbout from './components/About.vue'
import AppAboutEs from './components/About-es.vue'

Vue.use(Router)

// The 'vision' component holds both the image and analysis steps, whereas 'guide' and 'about' take you to those specific pages.

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'vision',
      component: AppVision
    },
    {
      path: '/guide',
      name: 'guide',
      component: AppGuide
    },
    {
      path: '/guide-es',
      name: 'guide-es',
      component: AppGuideEs
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    },
    {
      path: '/about-es',
      name: 'about-es',
      component: AppAboutEs
    }
  ]
})
