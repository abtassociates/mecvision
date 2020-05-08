# MECVision

<p align="center">
  <img width="150" src="https://raw.githubusercontent.com/abtassociates/mecvision/master/public/img/bot.gif" alt="MECVision Logo GIF" />
</p>

The Mosquito Egg Computer Vision (MECVision) web-app is a Progressive Web App ([PWA]) prototype coding project that uses computer vision (object detection in this case) on mosquito trap papers (ovitraps) to estimate the number of mosquito eggs on that ovitrap, using computer vision.

This project uses [OpenCV.js], [Vue.js], [Vuetify], and [Vue Croppa].

MECVision was initially made possible by the generous support of the American people through the United States Agency for International Development (USAID) and is implemented under the [Zika AIRS Project](https://www.usaid.gov/documents/1862/zika-airs-project-zap). The information on this website and web app does not represent the views of USAID or the United States Government.

[PWA]: https://developers.google.com/web/progressive-web-apps
[OpenCV.js]: https://docs.opencv.org/3.4/index.html
[Vue.js]: https://vuejs.org
[Vuetify]: https://vuetifyjs.com
[Vue Croppa]: https://zhanziyang.github.io/vue-croppa/


<p align="center">
  <img src="https://raw.githubusercontent.com/abtassociates/mecvision/master/public/img/Screenshot-Descriptions.png" alt="MECVision Screenshot with Descriptions" />
</p>

---

## Background

### Challenge
Tracking mosquito populations is critical to stopping the spread of malaria and Zika, among other diseases. One way to track mosquito populations is through the use of ovitraps which are placed in various locations to attract mosquitoes who then lay their eggs on a uniform sheet of paper and are then collected for counting egg densities per sheet.

### Solution
We developed an app that uses the camera of a smartphone to photograph a paper sheet of collected mosquito eggs, and then analyze the images using computer vision to automatically identify individual eggs and count their total — a process that is currently done mostly by-hand and can be very time-consuming.

### Details
This app is notable for a few reasons — it's a "progressive web app" (PWA) meaning that it behaves like a native iOS or Android app (you can even put it on your home screen alongside other apps), and also as a traditional website from the phone's web browser or from a laptop or desktop computer.

And because it's a "progressive" app, the software to run the site and analysis is loaded into the website when you access the page for the first time, meaning that it works even when completely offline, including the analysis and egg counting.

The app has built-in filters to adjust for various paper type sizes, groupings of eggs themselves, different lighting environments, and so on.

The algorithmic processing of the app uses a tool known as "OpenCV" (Open Computer Vision) which analyzes an image in order to highlight contrast, detect edges, find contours of objects within an image, and to make calculations based on that analysis. For MECVision, we use several algorithmic procedures tied together, in order to isolate the mosquito egg items and count them separately.

Finally, the app and underlying technologies all rely on open-source technologies and libraries, meaning that the source code itself can be updated and tailored to other use cases.

---

## Technical Walkthrough

**1\. Load an Image**

- When the app (or website) is loaded onto a device's web-browser, it loads all of the app code it needs to operate so that no information needs to be sent or received from a remote server or database -- everything is happening on the device to which it is loaded.

- After the app loads, a user can either take a picture, or upload one from their device (or use the 'demo' pictures in memory to see it work).

**2. Adjust the Image**

- Once selected, the user then adjusts the image (rotation, resizing, and cropping) by zooming in and out using 'pinch-and-zoom' on a phone or with the scroll function on a desktop.

- The user then selects the 'type' of image to analyze, ensuring more precise default values for the analysis depending on the type of picture, (Current templates are: a *classic* ovitrap paper, a *magnified*, and a *micro-scoped* image. These just help to present default values, and the advanced controls are available after the initial analysis.

**3. Analyze the Image**

- Once the image has been loaded and adjusted, the user presses the button to 'analyze' the image.

- At this point, the app uses software --- mostly the open-source library of opencv.js, with input controls defined by the user interface of the app.

- The app combines several tools within the OpenCV.js library to analyze the image, step-by-step, that will allow it to eventually count the number of mosquito eggs in the image. The steps are as follows:

  - **Threshold Value**. This converting the image to binary black and white values --- removing the background and highlighting the foreground eggs, ideally. The advanced controls allow this value to be modified, as too high a value and the eggs are washed out of the image and subsequent analysis, but too low a value and paper shadows and creases are erroneously included in the analysis.

  - **Erode and Dilate**. These two steps work in conjunction to fine-tune and simplify the image. First is to "erode" the image by removing "noise", that is, to remove pixels that are too small to be objects and shouldn't be counted in the analysis. Then the image is slightly "dilated" to sharpen the remaining objects to be fully counted (and without internal holes, which cause other problems down the road).

  - **Object Detection**. Now the analysis runs a "watershed detection" algorithm (where the green boxes are created) to identify the location, size, and boundaries of detected regions of interest (ROIs) by their contours (from their so-called "blog centroids"). If you read more about OpenCV, you'll also learn about Canny Edge Detection, which was tried for this app, but did not yield as accurate results.

  - **Object Sort**. Now, through custom calculations within the app, the objects are run through a serious of simple calculations to ascertain the sizes of the various objects --- determining the total number of objects detected, the likely size of the median egg, the sizes of egg clusters, etc. As the calculations are performed, the various assigned groupings are assigned a color which then translates into the image of the app (default values are blue for single eggs, red for clusters, green for too small, etc.)

  - **Image Overlay**. Finally, the sorted images are overlaid on the original color image, which makes for easier comparison (through a button in the app) that allows for the user to determine that the analysis was successful, and whether or not the advanced controls need to be adjusted to refine the image analysis.

  - There are some key points to remember about this analysis --

  - **Recognizing eggs**. The algorithm is not as smart as to recognize *actual* mosquito eggs --- it is "looking" for black oval spots on a white background. That's why this app still works whether you are trying to identify mosquito eggs, or buttons, or M&M candies. One challenge that this presents is that things that might look like eggs in the image are mistaken for them, including clumps of dirt, other organic matter, and even shadows, folds, and imperfections of the egg paper. It should be noted that this is also difficult for human technicians to decipher.

  - **Single eggs versus egg clusters**. Mosquito eggs have a tendency sometimes to cluster up into groups, sometimes lying on top of each other in ways that are difficult to see and count. The app deals with this is by separating out "single" eggs from egg "clusters." It does this after identifying all of the ROIs in the image, and calculating their various size dimensions (pixel square area, in this case). There is an assumption that there will be *more* "single" eggs than clusters, and so it calculates the average single-egg size from using the median value for all of the ROIs. Then, using this single-egg size approximate value, it divides up the remaining clusters by this value. There are some accuracy challenges with this, but without moving to a more sophisticated model, this works pretty well in practice.

**4. Review the Analysis**

- When the analysis is complete, the total egg estimation will be displayed. The user can also see a disaggregation of single egg counts versus clustered egg counts, as well as additional 'details' in the pop-up button. Additionally, the user can 'compare' the output at each stage of the algorithm process by pressing the 'compare' button, along with toggling the left-right arrows to review the algorithm processes in order.

**5. Advanced Algorithm Controls**

- Depending on the process and image used, it might be necessary to adjust the filters and threshold value. This can be done by selecting the 'show filters' button and reviewing the various settings, including ways to adjust the threshold value (where items become black or white), and the single egg minimum and maximum values, as well as maximum cluster size (to filter out large foreign objects like insects or dirt). When a value is changed here, the algorithm is updated automatically (without the animation) to reflect the new values.

### Tips for Accurate Results

- **Camera Quality.** Use the highest-quality and resolution camera available, even if it is not with a smartphone device. The app can use images that are in the phone's photo library -- they do *not* have to be taken with that particular device.

- **Camera Placement.** Capture the picture as close to the egg paper as possible while still capturing the entire paper. Ensure that the camera is perpendicular and directly above the image as much as possible -- and not taken from an angle.

- **Environment and Lighting.** Capture the image in a place with bright and consistent lighting. Try to avoid using the camera flash, as this creates both shadows which can be misidentified as eggs. Additionally, try to do everything possible to increase the contrast in the image between the eggs and the paper -- this makes the algorithm work more accurately.

- **Egg Paper Type and Quality.** There is a lot of variation in egg paper (ovitrap paper), and so try to have a consistent process throughout the various counts. Ensure that the egg paper is as flat as possible, with as few folds and wrinkles in the paper, as this causes shadows which may be misidentified as eggs. Additionally, try to use a background color that is different than the egg paper, as this will make it easier to crop the picture within the app.

- **Consistency and the Algorithm.** The MECVision app works best when used in a controlled and consistent environment. The best types of images are ones that are consist in all their qualities except for the number of eggs on the paper, which the app should capture differently. The app itself is susceptible to changes in lighting, focus, and processing demands, and so there will be some small variation from picture to picture (similar to human counts!) The best ways to ensure consistency is to focus on finding a consistent process, and then using consistent filtering and thresholding values that match the image environment.

- **A Note about Data Retention.** The app, because it is a web app, does *not* save data locally to a device, and it is never sent to a server or external database. Once the page is refreshed, the previous data is erased. It is much like a functional calculator in this way, with no history. Ensure that your counting process is consistent and is collected in another location prior to adapting the MECVision app entirely!

---

## Installation & Setup

### Clone repository and install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
