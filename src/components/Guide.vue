<template>

<div>
<v-layout my-3>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-2">Overview</h3>
          <div>
            <p>MECVision is a Progressive Web App (PWA) that uses computer vision (object detection) to estimate the number of mosquito eggs on ovitrap paper.</p>
            <p>This website will work with most smartphones (iOS and Android), as well as desktop and laptop computers. The website, because it is a PWA, behaves in many ways like a native phone app, which allows it to be used offline, to use a phone's photos and camera, and to allow it to be placed on a phone home screen, alongside native apps.</p>
            <p>The algorithmic processing of the app uses a tool known as "OpenCV" (Open Computer Vision) which analyzes an image in order to highlight contrast, detect edges, find contours of objects within an image, and to make calculations based on that analysis. For MECVision, we use several algorithmic procedures tied together, in order to isolate the mosquito egg items and count them separately.</p>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</v-layout>

<v-layout my-3>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-2">Using MECVision</h3>
          <div>
            <h3>1. Load an Image</h3>
            <p>The app (or website) is very simple. Once it loads onto a device's web-browser, it loads all of the app code it needs to operate so that no information will be sent to a remote server or database -- everything is happening on the device to which it is loaded.</p>
            <h3>2. Adjust the Image</h3>
            <p>After the app loads, a user can either take a picture, or upload one from their device (or use the 'demo' pictures in memory to see it work). Once selected, the user then adjusts the image by zooming in and out (using 'pinch-and-zoom' on a phone or with the scroll function on a desktop), as well as things like rotating and cropping. Additionally, you can select the 'type' of image you're analyzing -- a classic ovitrap paper, or magnified or microscoped image (and more can be added later) -- this helps to analyze the image using the appropriate algorithm.</p>
            <h3>3. Analyze the Image</h3>
            <p>Once the image has been adjusted, the user presses the button to 'analyze' the image. At this point, the app uses a software technique (open-source library) to analyze the image and find matches within the image that match the pattern as close as possible to mosquito eggs and mosquito egg clusters. At this point, the user can see the algorithm run through its process of converting the image to black and white (threshold value), detecting objects in the image, sorting the detected objects by size, and then overlaying the detected objects on top of the original image.</p>
            <h3>4. Review the Analysis</h3>
            <p>When the analysis is complete, the total egg estimation will be displayed. The user can also see a disaggregation of single egg counts versus clustered egg counts, as well as additional 'details' in the pop-up button. Additionally, the user can 'compare' the output at each stage of the algorithm process by pressing the 'compare' button, along with toggling the left-right arrows to review the algorithm processes in order.</p>
            <h3>5. Adjust the Algorithm</h3>
            <p>Depending on the process and image used, it might be necessary to adjust the filters and threshold value. This can be done by selecting the 'show filters' button and reviewing the various settings, including ways to adjust the threshold value (where items become black or white), and the single egg minimum and maximum values, as well as maximum cluster size (to filter out large foreign objects like insects or dirt). When a value is changed here, the algorithm is updated automatically (without the animation) to reflect the new values.</p>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</v-layout>

<v-layout my-3>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-3">Tips for Accurate Results</h3>
          <div>
            <h3>Camera Quality</h3>
            <p>Use the highest-quality and resolution camera available, even if it is not with a smartphone device. The app can use images that are in the phone's photo library -- they do <em>not</em> have to be taken with that particular device.</p>
            <h3>Camera Placement</h3>
            <p>Capture the picture as close to the egg paper as possible while still capturing the entire paper. Ensure that the camera is perpendicular and directly above the image as much as possible -- and not taken from an angle.</p>
            <h3>Environment and Lighting</h3>
            <p>Capture the image in a place with bright and consistent lighting. Try to avoid using the camera flash, as this creates both shadows which can be misidentified as eggs. Additionally, try to do everything possible to increase the contrast in the image between the eggs and the paper -- this makes the algorithm work more accurately.</p>
            <h3>Egg Paper Type and Quality</h3>
            <p>There is a lot of variation in egg paper (ovitrap paper), and so try to have a consistent process throughout the various counts. Ensure that the egg paper is as flat as possible, with as few folds and wrinkles in the paper, as this causes shadows which may be misidentified as eggs. Additionally, try to use a background color that is different than the egg paper, as this will make it easier to crop the picture within the app.</p>
            <h3>Consistency and the Algorithm</h3>
            <p>The MECVision app works best when used in a controlled and consistent environment. The best types of images are ones that are consist in all their qualities except for the number of eggs on the paper, which the app should capture differently. The app itself is susceptible to changes in lighting, focus, and processing demands, and so there will be some small variation from picture to picture (similar to human counts!) The best ways to ensure consistency is to focus on finding a consistent process, and then using consistent filtering and thresholding values that match the image environment.</p>
            <h3>A Note about Data Retention</h3>
            <p>The app, because it is a web app, does <em>not</em> save data locally to a device, and it is never sent to a server or external database. Once the page is refreshed, the previous data is erased. It is much like a functional calculator in this way, with no history. Ensure that your counting process is consistent and is collected in another location prior to adapting the MECVision app entirely!</p>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</v-layout>

</div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>
