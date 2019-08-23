<template>

<!-- Using Vuetify, the main structure of the app is 'v-container » v-layout » v-flex', separated between the various component files (Image, Analysis, etc.).
The remaining component files are separated for organizational purposes (About, Guide), and design purposes (Loading, Toolbar, Top). -->

<div id="app">
<v-app>

<!-- The toolbar is the constant header.  -->
<app-toolbar></app-toolbar>

<!-- This operates mainly as a single-page app (SPA), where the client-side view is controlled by the 'router-view' component.
The ':key' here is used to reset the app either through the reset button, or through clicking on the MECVision logo.
The loading dialogue only fires after the analysis button is clicked -- but it stays here as it is an app-wide view. -->
<v-content>
  <router-view :key="componentKey"></router-view>
  <loading-dialogue></loading-dialogue>
</v-content>

</v-app>
</div>
</template>

<script>
// Import eventBus (not complex enough for Vuex yet), Toolbar, and Loading screen
import { eventBus } from './main.js'
import AppToolbar from './components/Toolbar.vue'
import LoadingDialogue from './components/Loading.vue'

export default {
  name: 'MECVision',
  components: {
    AppToolbar,
    LoadingDialogue
  },
  data () {
    return {
      componentKey: 0 // This number is what gets reset by a forced re-render
    }
  },
  created () { // A forced re-render pushes user back to default URL ("/"), increments componentKey which resets all the Vue components, and resets the scroll position.
    eventBus.$on('forceRerender', () => {
      this.$router.push('/')
      this.componentKey += 1
      this.$vuetify.goTo(0, {
        offset: 0
      })
    })
  },
  mounted () {
    // Mount openCV module after component is loaded, as the JS library isn't part of Webpack (explicitly because it tries to transcode everything which doesn't work), and just log that it worked.
    let opencv = document.createElement('script')
    opencv.setAttribute('src', 'opencv.js')
    document.head.appendChild(opencv)
    console.log('OpenCV Loaded')
  }
}
</script>
