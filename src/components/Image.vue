<template>

<v-container>

<!-- Main navigation bar here -- mostly just for aesthetic reasons -->
<app-top></app-top>

<!-- Selection of image style -- which affects crop window as well as emit of egg size data for analysis -->
<v-layout>
  <v-flex xs12 md6 offset-md3>
    <v-container grid-list-xl class="pt-0">
      <h2 class="subheading text-xs-center pb-2">{{ $t('Select the ovitrap image type') }}</h2>

      <v-item-group v-model="imageType" mandatory>
      <v-layout row wrap justify-center>

        <v-flex xs12 md4>
          <v-item>
            <v-card slot-scope="{ active, toggle }" :style="active ? 'border: 2px solid var(--v-primary-base)' : ''" :class="active ? 'elevation-5' : ''" @click="toggle(), resetCroppa()">
              <v-img src="/mecvision/img/type-paper-thumb.jpg" aspect-ratio="2.00"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ $t('Paper Strip') }}</h3>
                  <div>{{ $t('Paper-Description') }}</div>
                </div>
              </v-card-title>
            </v-card>
          </v-item>
        </v-flex>

        <v-flex xs12 md4>
          <v-item>
            <v-card slot-scope="{ active, toggle }" :style="active ? 'border: 2px solid var(--v-primary-base)' : ''" :class="active ? 'elevation-5' : ''" @click="toggle(), resetCroppa()">
              <v-img src="/mecvision/img/type-magnified-thumb.jpg" aspect-ratio="2.00"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ $t('Magnified') }}</h3>
                  <div>{{ $t('Magnified-Description') }}</div>
                </div>
              </v-card-title>
            </v-card>
          </v-item>
        </v-flex>

        <v-flex xs12 md4>
          <v-item>
            <v-card slot-scope="{ active, toggle }" :style="active ? 'border: 2px solid var(--v-primary-base)' : ''" :class="active ? 'elevation-5' : ''" @click="toggle(), resetCroppa()">
              <v-img src="/mecvision/img/type-microscope-thumb.jpg" aspect-ratio="2.00"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ $t('Microscope') }}</h3>
                  <div>{{ $t('Microscope-Description') }}</div>
                </div>
              </v-card-title>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
      </v-item-group>

    </v-container>

  </v-flex>
</v-layout>

<!-- Using Vue Croppa for image handling and manipulation.
The one thing to note is the image selection changes the styling of the crop box.
The image itself is then passed on via the 'accept' method below. -->
<v-layout id="croppaBox" :key="croppaKey" :style="this.croppaDimensions">
  <croppa
    v-model="croppa"
    auto-sizing
    :zoom-speed="5"
    placeholder=""
    :show-loading="true"
    :placeholder-font-size="20"
    :loading-size="100"
    :show-remove-button="false"
    :prevent-white-space="false"
    :initial-image="initialImage"
    @initial-image-loaded="showBottomOptions = true"
    @new-image="showBottomOptions = true"
    @image-remove="showBottomOptions = false"
    >

  <!-- 'Select image' button serves the same function as drag/drop image into boundary area, exept allows for file chooser explicitely. -->
  <!-- Icons are loaded with Google Material icons. -->
  <v-btn
    id="croppaButton" v-show="!croppa.imageSet" @click="croppa.chooseFile()" flat large depressed absolute>
    {{ $t('Select Image') }}
    <v-icon large right>photo</v-icon>
  </v-btn>

  <!-- Allowed to load a demo image as a way to test and demonstrate app functionality. -->
  <v-btn v-show="!croppa.imageSet" @click="loadDemoImage()" absolute  right style="top: 25px">
    {{ $t('Demo Image') }}
    <v-icon right>grain</v-icon>
  </v-btn>

  </croppa>
</v-layout>

<v-bottom-nav app fixed :value="this.showBottomOptions" height='70'>

  <v-btn flat color="primary" @click="croppa.rotate()">
    <span>{{ $t('Rotate') }}</span>
    <v-icon>rotate_right</v-icon>
  </v-btn>

  <v-btn flat color="primary" @click="croppa.remove()">
    <span>{{ $t('Remove') }}</span>
    <v-icon>cancel</v-icon>
  </v-btn>

  <v-btn flat color="secondary" @click="accept()">
    <span>{{ $t('Analyze') }}</span>
    <v-icon>check_circle</v-icon>
  </v-btn>

</v-bottom-nav>

</v-container>

</template>

<script>
import { eventBus } from '../main.js'
import AppTop from './Top.vue'

export default {
  components: {
    AppTop
  },
  data () {
    return {
      croppa: {},
      croppaKey: 0,
      initialImage: '',
      dataUrl: '',
      imageAccepted: false,
      loading: false,
      loadingDialog: false,
      analysisStarted: false,
      showBottomOptions: false,
      imageType: 0
    }
  },
  computed: {
    croppaDimensions () {
      if (this.imageType === 0) return 'width: 100%; height: 400px;'
      if (this.imageType === 1) return 'width: 100%; height: 800px;'
      if (this.imageType === 2) return 'width: 80%; height: 600px;'
      return 'width = 100%; height: 400px;'
    }
  },
  watch: { // This gets fired when the loading dialog needs to takeover.
    loadingDialog (val) {
      if (!val) return
      setTimeout(() => (this.loadingDialog = false), 500)
    }
  },

  methods: {
    // testOpenCV () { // For debugging purposes, ensure that OpenCV is loaded and registered correctly
    //   let info = cv.getBuildInformation()
    //   console.log('main created', info, cv)
    // },
    resetCroppa () {
      this.initialImage = null
      this.croppaKey += 1
    },
    next () { // Used to increment through the loading screens
      const active = parseInt(this.active)
      this.active = (active < 5 ? active + 1 : 0)
    },
    loadDemoImage () {
      let image = new Image()
      if (this.imageType === 0) { image.src = '/mecvision/img/type-paper.jpg' }
      if (this.imageType === 1) { image.src = '/mecvision/img/type-magnified.jpg' }
      if (this.imageType === 2) { image.src = '/mecvision/img/type-microscope.jpg' }
      this.initialImage = image
      this.croppa.refresh()
      this.$vuetify.goTo('#croppaBox', {
      })
    },
    async accept () { // Using async/await for moving from image upload to analysis, where image is passed via 'generateDataUrl'
      eventBus.$emit('appLoading')
      eventBus.$emit('toAnalysis')
      eventBus.$emit('loadingScreen')
      this.analysisStarted = true
      this.rawImage = await this.croppa.generateDataUrl('', 1) // Change the number value for increased image resolution (after testing).
      eventBus.$emit('imageType', this.imageType)
      await eventBus.$emit('rawImageReady', this.rawImage)
      this.imageAccepted = true
      await new Promise((resolve, reject) => setTimeout(resolve, 500)) // Timeout of 500ms fixes some problems of trying to pass empty string to analysis.
    }
  }
}
</script>

<style scope>

p {
  line-height: 1.5;
}

a {
  text-decoration:none;
}

#croppaButton {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#croppaButton.v-btn:hover:before, #croppaButton.v-btn:focus:before {
  color: transparent;
}

#croppaBox {
  margin: auto;
  display: block;
  border: 3px dashed var(--v-primary-base);
  border-radius: 0px;
}

.croppa-container {
  width: 100%;
  height: 100%;
}

.placeholder_icon {
  width: 100px;
  margin: auto;
  display: block;
}

</style>
