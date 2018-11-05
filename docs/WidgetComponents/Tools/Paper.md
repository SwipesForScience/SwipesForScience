# paper 

This is a component to annotate X,Y coordinates of images with 2 overlays.
it is based on **Paper.js** rasters. 

## props 

- `paper-src` ***String*** (*optional*) `default: null` 

  a URL to a base image 

- `mask-src` ***String*** (*optional*) `default: null` 

  a URL to a mask image 

- `contour-src` ***String*** (*optional*) `default: null` 

  a URL to a contour image 

- `visibility` ***Object*** (*optional*) `default: [object Object]` 

  visibility of contour and mask overlays. 

- `brightness` ***Number*** (*optional*) `default: 50` 

  brightness level, from 0-100 

- `contrast` ***Number*** (*optional*) `default: 50` 

  contrast level, from 0-100 

- `id` ***String*** (*optional*) `default: 'canvas-id'` 

  canvas id 

- `splat-radius` ***Number*** (*optional*) `default: 10` 

  how sensitive we should be to delete an annotation. 

- `splat-color` ***String*** (*optional*) `default: '#ffc107'` 

  the color of the x,y annotation marker. 

## data 

- `base` 

  The base raster 

**initial value:** `null` 

- `mask` 

  The mask raster 

**initial value:** `null` 

- `contour` 

  The contour raster 

**initial value:** `null` 

- `view` 

  The paper.js view 

**initial value:** `null` 

- `viewHeight` 

  The view height 

**initial value:** `null` 

- `zoomFactor` 

  How much to zoom 

**initial value:** `1` 

- `touch` 

  Touchscreen controls 

**initial value:** `[object Object]` 

- `scope` 

  paper.js scope 

**initial value:** `null` 

- `panFactor` 

  how much to pan 

**initial value:** `[object Object]` 

- `panMouseDown` 

  the last place panned 

**initial value:** `null` 

- `drawOrPan` 

  drawing or panning mode 

**initial value:** `'draw'` 

- `draw` 

  annotation points and their shape objects 

**initial value:** `[object Object]` 

- `deleteRadius` 

  sensitivity radius to deleting a shape 

**initial value:** `6` 

## events 

- `loaded_image` 

## methods 

- `activate()` 

  activate the scope 

- `undo()` 

  undo the last annotation 

- `doZoom(e)` 

  zoom based on a mouse/touch event 

- `doPan(e)` 

  pan based on a mouse/touch event 

- `resetPan()` 

  reset the pan amount 

- `onresize()` 

  when the window size changes, change all the bounds of all the rasters. 

- `takeScreenshot()` 

  take a screenshot 

- `drawSplat(e, me)` 

  draw a shape based on a mouse/touch event coordinates 

- `checkToRemove(e, me)` 

  remove a point based on a mouse/touch event 

- `removeSplat(splats)` 

  remove a shape and point 

- `dragHandler(e)` 

  pan on drag 

- `clickHandler(e)` 

  handle a click event. remove a point if the user clicked close to an existing point.
  else, draw a point. 

- `brightcont()` 

  set the brightness and contrast of the base raster. 

- `removeEvents()` 

  remove the resize and mousewheel events. 

- `clearImg()` 

  clear all stuff from the paper scope 

- `initImg()` 

  initialize the base, mask, and contour rasters. 

