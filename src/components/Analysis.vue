<template>
<div>

  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 lg8 xl9 v-show="analysisStarted">

<!-- Analysis window -- increments between analyses, using Vuetify window components -->
<v-window v-model="window" class="elevation-5">
  <v-window-item v-for="item in analyzedImages" :key="item.output" :transition="false" :reverse-transition="false">

    <!-- OpenCV injects to canvas items -->
    <canvas :id="item.output" class="imageCanvasOuter" v-show="showAnalysis">
      <img class="imageCanvasInner" id="analyzedImage" :src="analyzedImage" style="height:100px;"/>
    </canvas>

    <!-- Keep a copy of the original source hidden under the analysis, for comparison toggle to work -->
    <canvas :id="item.source" class="imageCanvasOuter" v-show="!showAnalysis">
      <img class="imageCanvasInner" id="analyzedImage" :src="analyzedImage" />
    </canvas>

  </v-window-item>
  </v-window>

  <!-- Options for the analysis windows -->
  <v-card class="my-3">
    <v-card-title>
      <v-layout align-center wrap>
        <v-flex>
          <h1 :class="{'title': $vuetify.breakpoint.smAndDown, 'display-1': $vuetify.breakpoint.mdAndUp}">{{ analyzedImagesPretty[this.window] }}</h1>
          <h2 :class="{'subheading': $vuetify.breakpoint.smAndDown, 'title mt-2': $vuetify.breakpoint.mdAndUp}">({{this.window+1}} {{ $t('of') }} {{this.length}})</h2>
        </v-flex>
        <v-spacer></v-spacer>
        <v-layout justify-end row :class="{'': $vuetify.breakpoint.smAndDown, 'shrink': $vuetify.breakpoint.mdAndUp}">
        <v-flex shrink class="text-xs-center">
          <v-btn icon color="primary" @click="previous"><v-icon>chevron_left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex shrink class="text-xs-center">
          <v-btn icon color="primary" @click="next"><v-icon>chevron_right</v-icon>
          </v-btn>
        </v-flex>
        </v-layout>
      </v-layout>
    </v-card-title>
  </v-card>

  </v-flex>

  <v-flex xs12 md4 lg3 xl3 :class="{'pl-0': $vuetify.breakpoint.smAndDown, 'pl-3': $vuetify.breakpoint.mdAndUp}" v-show="analysisComplete">

  <!-- Filters for fine-tuning image and analysis -->
  <div v-show="drawer">
    <v-card class="mb-2">
      <v-card-title>
        <h4 class="title">{{ $t('Filters') }}</h4>
      </v-card-title>
      <v-card-text class="pt-0">

      <v-layout>
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-flex class="subheading"><span v-on="on">{{ $t('Image Threshold Adjustment') }}</span></v-flex>
        </template>
        <span>{{ $t('Image Threshold Adjustment Details') }}</span>
        </v-tooltip>
      </v-layout>

      <v-layout row>
        <v-flex>
          <v-slider v-model="threshValue" :max="255" @change="analyze()"></v-slider>
        </v-flex>
        <v-flex xs3 md2 xl2 mx-2>
        <v-text-field solo v-model="threshValue" hide-details single-line class="filter"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-flex class="subheading"><span v-on="on">{{ $t('Minimum Egg Size') }}</span></v-flex>
        </template>
        <span>{{ $t("Minimum Egg Size Details") }}</span>
        </v-tooltip>
      </v-layout>

      <v-layout row>
        <v-flex mx-3>
          <v-slider v-model="minEggRadius" :min="0" :max="100" @change="analyze()"></v-slider>
        </v-flex>
        <v-flex xs8 md5 lg4 xl3>
        <v-text-field solo v-model="minEggRadius" hide-details single-line></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-flex class="subheading"><span v-on="on">{{ $t('Maximum Egg Size') }}</span></v-flex>
        </template>
        <span>{{ $t('Maximum Egg Size Details') }}</span>
        </v-tooltip>
      </v-layout>

      <v-layout row>
        <v-flex mx-3>
          <v-slider v-model="maxEggRadius" :min="0" :max="100" @change="analyze()"></v-slider>
        </v-flex>
        <v-flex xs8 md5 lg4 xl3>
        <v-text-field solo v-model="maxEggRadius" hide-details single-line></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-flex class="subheading"><span v-on="on">{{ $t('Maximum Cluster Size') }}</span></v-flex>
        </template>
        <span>{{ $t('Maximum Cluster Size Details') }}</span>
        </v-tooltip>
      </v-layout>

      <v-layout row>
        <v-flex mx-3>
          <v-slider v-model="maxEggCluster" :min="0" :max="100" @change="analyze()"></v-slider>
        </v-flex>
        <v-flex xs8 md5 lg4 xl3>
        <v-text-field solo v-model="maxEggCluster" hide-details single-line></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center>
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-flex class="subheading mb-1">
          <span v-on="on">
          <p class="mb-1">{{ $t('Egg Size Scale') }}</p>
          <p class="caption my-0"><v-icon small color="rgba(0, 0, 225, 255)">fiber_manual_record</v-icon> {{ $t('Minimum Egg Size') }}</p>
          <p class="caption my-0"><v-icon small color="rgba(225, 0, 0, 255)">fiber_manual_record</v-icon> {{ $t('Maximum Egg Size') }}</p>
          <p class="caption my-0"><v-icon small color="rgba(100, 100, 100, 255)">fiber_manual_record</v-icon> {{ $t('Too Large / Too Small') }}</p>
          </span>
          </v-flex>
        </template>
        <span>{{ $t('Egg Size Scale Details') }}</span>
        </v-tooltip>

        <v-flex>
          <canvas id="legendCanvas" style="margin: auto; display: block;"><img id="legendImage" src="/mecvision/img/legend.png" /></canvas>
        </v-flex>
      </v-layout>

    </v-card-text>
  </v-card>

  </div>

  <!-- Analysis Card -- showing details -->
  <v-card>
    <v-card-title class="justify-end">
      <h4 class="title">{{ $t('Analysis') }}</h4>
      <v-spacer></v-spacer>
      <v-btn class="mr-0" color="primary" dark @click="detailsDialog = true">{{ $t('Details') }}</v-btn>
    </v-card-title>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile>
        <v-list-tile-content class="body-2"><span><v-icon small color="rgba(0, 0, 225, 255)">fiber_manual_record</v-icon>{{ $t('Single Eggs') }}</span></v-list-tile-content>
        <v-list-tile-content class="body-2 align-end">{{ this.singlesCount }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content class="body-2"><span><v-icon small color="rgba(225, 0, 0, 255)">fiber_manual_record</v-icon>{{ $t('Calculated from Clusters') }}</span></v-list-tile-content>
        <v-list-tile-content class="body-2 align-end">{{ this.singlesCalculated }}</v-list-tile-content>
      </v-list-tile>

    <v-divider></v-divider>

    <v-list-tile>
      <v-list-tile-content class="body-2">{{ $t('Total Egg Estimation') }}</v-list-tile-content>
      <v-list-tile-content class="body-2 align-end">{{ this.totalEggs }}</v-list-tile-content>
    </v-list-tile>

  </v-list>
</v-card>
</v-flex>

<!-- Details pop-up window -->
<v-dialog v-model="detailsDialog" max-width="500px">

  <v-card>

    <v-card-title>
      <h2 class="title ml-2">{{ $t('Details') }}</h2>
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-tile>
          <v-list-tile-content class="body-1">{{ $t('Total Single Egg Area') }}</v-list-tile-content>
          <v-list-tile-content class="align-end body-1">{{ this.singlesTotalArea }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content class="body-1">{{ $t('Single Egg Average Size') }}</v-list-tile-content>
          <v-list-tile-content class="align-end body-1">{{ this.singlesAvg }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content class="body-1">{{ $t('Egg Clusters') }}</v-list-tile-content>
          <v-list-tile-content class="align-end body-1">{{ this.clustersCount }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content class="body-1">{{ $t('Total Egg Clusters Area') }}</v-list-tile-content>
          <v-list-tile-content class="align-end body-1">{{ this.clustersTotalArea }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content class="body-1">{{ $t('Average Cluster Area') }}</v-list-tile-content>
          <v-list-tile-content class="align-end body-1">{{ this.avgClusterArea }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content class="body-1">{{ $t('Average Eggs per Cluster') }}</v-list-tile-content>
          <v-list-tile-content class="align-end body-1">{{ this.avgEggsPerCluster }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content class="body-1">{{ $t('Image Size') }}</v-list-tile-content>
          <v-list-tile-content class="align-end body-1">{{ this.imageSize }}</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="detailsDialog=false">{{ $t('Close') }}</v-btn>
    </v-card-actions>

  </v-card>

</v-dialog>
</v-layout>

<v-bottom-nav app fixed :value="this.showBottom" height="70">

  <v-btn flat color="primary" @click="rerender()">
    <span>{{ $t('Reset') }}</span>
    <v-icon>refresh</v-icon>
  </v-btn>

  <v-btn flat color="primary" @click="showAnalysis = !showAnalysis">
    <span>{{ $t('Compare') }}</span>
    <v-icon>compare</v-icon>
  </v-btn>

  <v-btn flat color="primary" @click.stop="drawer = !drawer">
    <span>{{ $t('Show Filters') }}</span>
    <v-icon>tune</v-icon>
    </v-btn>

</v-bottom-nav>

</v-container>
</div>
</template>

<script>
import { eventBus } from '../main.js'

export default {
  data () {
    return {
      drawer: false,
      infoExpanded: false,
      eggsize: null,
      analyzedImage: null,
      imageSize: '',
      imageDepth: '',
      imageChannels: '',
      imageType: '',
      showAnalysis: true,
      showBottom: false,
      firstRun: true,
      active: null,
      analyzedImages: [{
        output: 'src', source: 'src2' }, {
        output: 'threshold', source: 'src3' }, {
        output: 'objects', source: 'src5' }, {
        output: 'outlines', source: 'src6' }, {
        output: 'overlay', source: 'src7'
      }],
      analyzedImagesPretty: [
        this.$i18n.t('Source Image'),
        this.$i18n.t('Threshold'),
        this.$i18n.t('Detected Objects'),
        this.$i18n.t('Sorted Markers'),
        this.$i18n.t('Outlined Overlay')
      ],
      analysisStarted: false,
      analysisComplete: false,
      threshValue: 104,
      minEggRadius: 5,
      maxEggRadius: 7,
      maxEggCluster: 20,
      singlesCount: 0,
      clustersCount: 0,
      singlesArray: [],
      singlesTotalArea: 0,
      clustersTotalArea: 0,
      avgClusterArea: 0,
      avgEggsPerCluster: 0,
      singlesAvg: 0,
      clustersArray: [],
      singlesCalculated: 0,
      eggBoxes: 0,
      detectedObjectsArray: [],
      detectedObjectsArrayList: [],
      totalEggs: 0,
      window: 0,
      length: 5,
      detailsDialog: false
    }
  },
  created () {
    eventBus.$on('imageType', (imageType) => {
      if (imageType === 0) {
        this.threshValue = 116
        this.minEggRadius = 1
        this.maxEggRadius = 8
        this.maxEggCluster = 8
      } else if (imageType === 1) {
        this.threshValue = 120
        this.minEggRadius = 4
        this.maxEggRadius = 5
        this.maxEggCluster = 8
      } else {
        this.threshValue = 120
        this.minEggRadius = 4
        this.maxEggRadius = 14
        this.maxEggCluster = 20
      }
    })
    eventBus.$on('rawImageReady', (data) => {
      this.analyzedImage = data
      this.load()
    })
  },
  methods: {
    async load () {
      eventBus.$emit('loadingDialog')
      await new Promise((resolve, reject) => setTimeout(resolve, 2000))
      this.analyze()
      this.turnImages()
    },
    rerender () {
      eventBus.$emit('forceRerender')
    },
    imageMenu (index) {
      this.active = index
    },
    next () {
      this.window = this.window + 1 === this.length
        ? 0
        : this.window + 1
    },
    previous () {
      this.window = this.window - 1 < 0
        ? this.length - 1
        : this.window - 1
    },
    async analyze () {
      // Show 'analysis' components in Vue
      this.analysisStarted = true

      // INITIALIZATION
      // Load image into OpenCV
      let src = cv.imread('analyzedImage')
      let overlay = src.clone()

      // Show source image via OpenCV
      cv.imshow('src', src)

      // Image Info for debugging
      this.imageSize = src.size().width + ' x ' + src.size().height
      this.imageDepth = src.depth()
      this.imageChannels = src.channels()
      this.imageType = src.type()

      // Create matrices for various analysis activites
      let gray = new cv.Mat()
      let threshold = new cv.Mat()
      let dilate = new cv.Mat()
      let boundingBoxes = new cv.Mat()
      let objects = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3)
      let outlines = new cv.Mat(src.rows, src.cols, cv.CV_8UC3, new cv.Scalar(255, 255, 255, 0))

      // TRANSFORMATIONS
      // Source to Grayscale
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)

      // Grayscale to Threshold (binary, not adaptive)
      cv.threshold(gray, threshold, this.threshValue, 255, cv.THRESH_BINARY)

      // Threshold to Dilate [and erode](create new matrix that can be written upon and anchor point (center))
      let M = cv.Mat.ones(3, 3, cv.CV_8U)
      let anchor = new cv.Point(-1, -1)
      cv.dilate(threshold, dilate, M, anchor, 0, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue())

      // DRAW CONTOURS
      // Create matrices to hold contour counts
      let contours = new cv.MatVector()
      let hierarchy = new cv.Mat()
      let contoursObject = []
      let contoursValues = []

      // Find contours
      cv.findContours(dilate, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

      // CALCULATE SINGLE EGGS AND CLUSTERS
      // Initialize and/or reset single and cluster arrays, counts, and area placeholders for computation
      let detectedObjectsArray = []
      this.singlesArray = []
      this.clustersArray = []
      this.singlesCount = 0
      this.clustersCount = 0
      this.singlesTotalArea = 0
      this.clustersTotalArea = 0

      // Define colors for contour object detection (boxes) and contour overlay (green=small, blue=single-egg, red=cluster)
      let contoursColor = new cv.Scalar(255, 255, 255)
      let green = new cv.Scalar(0, 225, 0, 255)
      let blue = new cv.Scalar(0, 0, 225, 255)
      let red = new cv.Scalar(255, 0, 0, 255)
      let grayColor = new cv.Scalar(100, 100, 100, 255)
      let minEggArea = Math.PI * (this.minEggRadius * this.minEggRadius)
      let maxEggArea = Math.PI * (this.maxEggRadius * this.maxEggRadius)
      let maxClusterArea = Math.PI * (this.maxEggCluster * this.maxEggCluster)

      // Main loop
      for (let i = 1; i < contours.size(); ++i) {
        contoursObject.push(cv.contourArea(contours.get(i)))
        contoursValues = Object.values(contoursObject)
        let contourMax = Math.max(...contoursValues)
        if (contourMax === cv.contourArea(contours.get(i))) {
        } else {
          // Draw contours and bounding boxes for all objects detected from 'contours' matrix
          let cnt = contours.get(i)
          let rect = cv.boundingRect(cnt)
          cv.drawContours(objects, contours, i, contoursColor, 1, 8, hierarchy, 100)
          let point1 = new cv.Point((rect.x - 5), (rect.y - 5))
          let point2 = new cv.Point(rect.x + rect.width + 5, rect.y + rect.height + 5)
          if (hierarchy.intPtr(0, i)[0] === -1 || hierarchy.intPtr(0, i)[1] === -1 || hierarchy.intPtr(0, i)[2] === -1 || hierarchy.intPtr(0, i)[3] === -1) {
            cv.rectangle(objects, point1, point2, green, 1, cv.LINE_AA, 0)
          } else {
            cv.rectangle(objects, point1, point2, green, 3, cv.LINE_AA, 0)
          }
          // Create matrix for points of objects for all objects, even if not calculated immediately (until individual boxes invoked)
          boundingBoxes = src.roi(rect)
          detectedObjectsArray.push(boundingBoxes)
          // Loop through all contours and sort/color by size, drawing on both outlines and overlay images (as well as counting towards array counts)
          if (cv.contourArea(contours.get(i)) <= minEggArea) {
            cv.drawContours(outlines, contours, i, grayColor, -1, cv.LINE_8, hierarchy, 0)
            cv.drawContours(overlay, contours, i, grayColor, 1, cv.LINE_8, hierarchy, 0)
          } else if (cv.contourArea(contours.get(i)) > minEggArea && cv.contourArea(contours.get(i)) <= maxEggArea) {
            cv.drawContours(outlines, contours, i, blue, -1, cv.LINE_8, hierarchy, 0)
            cv.drawContours(overlay, contours, i, blue, 1, cv.LINE_8, hierarchy, 0)
            this.singlesArray.push(cv.contourArea(contours.get(i)))
            ++this.singlesCount
          } else if (cv.contourArea(contours.get(i)) > maxEggArea && cv.contourArea(contours.get(i)) <= maxClusterArea) {
            cv.drawContours(outlines, contours, i, red, -1, cv.LINE_8, hierarchy, 0)
            cv.drawContours(overlay, contours, i, red, 1, cv.LINE_8, hierarchy, 0)
            this.clustersArray.push(cv.contourArea(contours.get(i)))
            ++this.clustersCount
          } else if (cv.contourArea(contours.get(i)) > maxClusterArea) {
            cv.drawContours(outlines, contours, i, grayColor, -1, cv.LINE_8, hierarchy, 0)
            cv.drawContours(overlay, contours, i, grayColor, 1, cv.LINE_8, hierarchy, 0)
          }
        }
      }

      // CALCULATIONS
      // Use array counts to calculate single size averages, single size area, cluster average, and cluster area
      for (let i = 0; i < this.singlesArray.length; i++) { this.singlesTotalArea += this.singlesArray[i] }
      this.singlesAvg = (this.singlesTotalArea / this.singlesArray.length).toFixed(2)
      if (isNaN(this.singlesAvg)) this.singlesAvg = 0

      // Calculate cluster area if not zero, append to total cluster area of image
      if (this.clustersCount === 0) {} else {
        for (let i = 0; i < this.clustersArray.length; i++) {
          this.clustersTotalArea += this.clustersArray[i]
        }
      }

      // Calculate and convert to output formats
      this.singlesCalculated = (this.clustersTotalArea / this.singlesAvg).toFixed(0)
      if (isNaN(this.singlesCalculated)) this.singlesCalculated = 0
      this.avgClusterArea = (this.clustersTotalArea / this.clustersCount).toFixed(2)
      if (isNaN(this.avgClusterArea)) this.avgClusterArea = 0
      this.avgEggsPerCluster = (this.avgClusterArea / this.singlesAvg).toFixed(1)
      if (isNaN(this.avgEggsPerCluster)) this.avgEggsPerCluster = 0
      this.totalEggs = +this.singlesCount + +this.singlesCalculated
      this.eggEstimate = contours.size() // Egg estimation from contours

      // Show images
      cv.imshow('src', src)
      cv.imshow('src2', src)
      cv.imshow('src3', src)
      cv.imshow('src5', src)
      cv.imshow('src6', src)
      cv.imshow('src7', src)
      cv.imshow('threshold', threshold)
      cv.imshow('objects', objects)
      cv.imshow('outlines', outlines)
      cv.imshow('overlay', overlay)

      // Show legend image
      let legend = cv.imread('legendImage')
      cv.circle(legend, new cv.Point(50, 50), this.minEggRadius, blue, 1) // Blue inner circle
      cv.circle(legend, new cv.Point(50, 50), this.maxEggRadius, red, 1) // Red outer circle
      cv.circle(legend, new cv.Point(50, 50), this.maxEggCluster, grayColor, 1) // Gray outer circle
      cv.imshow('legendCanvas', legend)
      legend.delete()

      // Delete matrices to save on memory
      src.delete()
      gray.delete()
      threshold.delete()
      dilate.delete()
      objects.delete()
      outlines.delete()
      overlay.delete()
      M.delete()
      contours.delete()
      hierarchy.delete()
    },
    async turnImages () {
      // Use time delays to display calculation images and rotate when done calculating
      for (let i = 4; this.window < i; ++this.window) {
        await new Promise((resolve, reject) => setTimeout(resolve, 500))
      }

      // After timeout, show analysis results
      await new Promise((resolve, reject) => setTimeout(resolve, 500))
      this.analysisComplete = true

      // After timeout, show bottom menu
      await new Promise((resolve, reject) => setTimeout(resolve, 500))
      this.showBottom = true
    }
  }
}
</script>

<style scope>

.imageCanvasOuter {
  width: 100%;
  height: 100%;
  /* border: 3px dashed grey; */
  display: flex;
}

.imageCanvasOuterBoxes {
  max-height: 200px;
  width: 100%;
  display: flex;
}

.imageCanvasInner {
  height: 100%;
}

.legendCanvas {
  width: 200px;
  height: 200px;
}

.v-text-field {
  font-size: .9em;
}

.v-input .filter {
  text-align: right;
}

</style>
