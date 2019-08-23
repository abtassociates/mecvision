import Vue from 'vue'
import manifestJSON from '../public/manifest.json'
import * as easings from 'vuetify/es5/util/easing-patterns'

import {
  Vuetify,
  VApp,
  VBtn,
  VNavigationDrawer,
  VBtnToggle,
  VCard,
  VCheckbox,
  VDivider,
  VGrid,
  VIcon,
  VList,
  VProgressLinear,
  VTextField
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VNavigationDrawer,
    VBtnToggle,
    VCard,
    easings,
    VCheckbox,
    VDivider,
    VGrid,
    VIcon,
    VList,
    VProgressLinear,
    VTextField
  },
  theme: {
    primary: manifestJSON.theme_color
  }
})
