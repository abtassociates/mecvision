<template>
    <component :key="componentKey" :is="visionComponent"></component>
</template>

<script>
import { eventBus } from '../main.js'
import AppImage from './Image.vue'
import AppAnalysis from './Analysis.vue'

export default {
  components: {
    AppImage,
    AppAnalysis
  },
  data () {
    return {
      componentKey: 0, // Just as with the main app, the 'reset image' button the bottom bar resets this specific component.
      visionComponent: AppImage // Starts with AppImage by default, waiting for the eventBus to fire to tell it to switch to Analysis.
    }
  },
  created () {
    eventBus.$on('toAnalysis', () => {
      this.visionComponent = 'AppAnalysis' // Switches to Analysis component.
    })
  }
}
</script>
