<template>

<div class="title my-4">

  <v-layout justify-center row @click="rerender()" style="cursor: pointer">
    <v-avatar tile size="48" class="mr-2 ml-0"><img src="/img/bot.png" /></v-avatar>
    <span class="display-2 font-weight-black text-uppercase black--text pb-0"><span>MEC</span><span class="font-weight-thin">Vision</span></span>
  </v-layout>

  <v-layout align-center justify-center wrap>
    <h2 class="headline mt-4">{{ $t('subtitle') }}</h2>
  </v-layout>

  <v-layout align-center justify-center wrap>
    <v-flex xs12 md10 lg10 xl6>
      <p class="subheading my-3">{{ $t('description') }}</p>
    </v-flex>
  </v-layout>

</div>

</template>

<script>
import { eventBus } from '../main.js'

export default {
  methods: {
    rerender () {
      eventBus.$emit('forceRerender')
    }
  }
}
</script>
