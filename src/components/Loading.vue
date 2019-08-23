<template>
<div class="loading text-xs-center">
  <v-dialog
    v-model="loadingDialog"
    persistent
    width="500"
  >
    <v-card
      color="primary"
      dark
    >
      <v-card-text>
        <v-layout align-center>
        <v-avatar id="bot" tile size="24" class="mr-2">
              <v-img src="/mecvision/img/bot.gif"></v-img></v-avatar>
        {{ $t('Analyzing Image...') }}
        </v-layout>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
          height="15"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import { eventBus } from '../main.js'

export default {
  data () {
    return {
      loadingDialog: false
    }
  },
  created () {
    eventBus.$on('loadingDialog', () => {
      this.loadingDialog = true
    })
  },
  watch: {
    loadingDialog (val) {
      if (!val) return
      setTimeout(() => (this.loadingDialog = false), 3000)
    }
  }
}
</script>
