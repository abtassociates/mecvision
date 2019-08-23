<template>
<div>
<!-- class="white--text" @click="rerender()" -->
<v-toolbar color="primary" absolute app>

  <v-toolbar-title class="text-uppercase white--text" style="cursor: pointer">
    <v-layout align-center  @click="rerender()">
    <v-avatar tile size="20" class="mx-2"><img src="/img/bot.png" /></v-avatar>
    <span class="font-weight-black">MEC</span><span class="font-weight-thin">Vision</span>
    </v-layout>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <span class="caption mx-3">
    <v-btn-toggle :value="localeSelect" mandatory>
    <v-btn small flat @click="changeLocale('en')">EN</v-btn>
    <v-btn small flat @click="changeLocale('es')">ES</v-btn>
    </v-btn-toggle>
  </span>

  <v-toolbar-items class="hidden-sm-and-down">
    <v-btn
    v-for="(item) in menu[localeSelect]"
    :key="item.title"
    :to="item.link"
    flat dark
  >{{ item.title }}</v-btn>
    </v-toolbar-items>

    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile v-for="item in menu[localeSelect]" :key="item.title" :to="item.link">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

</v-toolbar>

</div>
</template>

<script>
import { eventBus } from '../main.js'
import i18n from '@/plugins/i18n'

export default {
  components: {
  },
  data () {
    return {
      menu: {
        0: [
          { title: 'Vision', link: '/' },
          { title: 'Guide', link: '/guide' },
          { title: 'About', link: '/about' }
        ],
        1: [
          { title: 'Visión', link: '/' },
          { title: 'Guía', link: '/guide-es' },
          { title: 'Acerca de...', link: '/about-es' }
        ]
      },
      languages: [
        { title: 'en', name: 'English' },
        { title: 'es', name: 'Español' }
      ],
      loading: false
    }
  },
  computed: {
    localeSelect () {
      if (this.$i18n.locale === 'en') {
        return 0
      } else {
        return 1
      }
    }
  },
  created () {
    eventBus.$on('appLoading', () => {
      this.loading = true
    })
  },
  methods: {
    rerender () {
      eventBus.$emit('forceRerender')
    },
    menuItems () {
      return this.menu
    },
    changeLocale (locale) {
      i18n.locale = locale
    }
  }
}
</script>
