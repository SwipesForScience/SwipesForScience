<template>
  <div class="paper" oncontextmenu="return false;">
      <resize-observer @notify="onresize" />
      <canvas :id="id" resize v-on:click="activate"></canvas>
      <!-- resize -->
  </div>

</template>

<script>
import chai from 'chai';
import Hammer from 'hammerjs';
import Vue from 'vue';
import { ResizeObserver } from 'vue-resize';
import 'vue-resize/dist/vue-resize.css';
import paper from '../../../../node_modules/paper/dist/paper-core.min';

Vue.component('resize-observer', ResizeObserver);

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Thanks https://github.com/licson0729/CanvasEffects

function copyImageData(ctx, src) {
  const dst = ctx.createImageData(src.width, src.height);
  dst.data.set(src.data);
  return dst;
}

paper.Raster.prototype.process = function process(func) {
  const pix = copyImageData(this.getContext('2d'), this.origImg);

  // Loop through the pixels
  for (let x = 0; x < this.width; x += 1) {
    for (let y = 0; y < this.height; y += 1) {
      const i = ((y * this.width) + x) * 4;
      const r = pix.data[i];
      const g = pix.data[i + 1];
      const b = pix.data[i + 2];
      const a = pix.data[i + 3];
      const ret = func(r, g, b, a, x, y);
      pix.data[i] = ret[0];
      pix.data[i + 1] = ret[1];
      pix.data[i + 2] = ret[2];
      pix.data[i + 3] = ret[3];
    }
  }

  this.setImageData(pix);
};

paper.Raster.prototype.brightness_contrast = function brightnessContrast(bright, L) {
  let level = L;
  level = ((level + 100) / 100) ** 2;
  return this.process((r, g, b, a) =>
    [((((r / 255) - 0.5) * level) + 0.5) * 255 * bright,
      ((((g / 255) - 0.5) * level) + 0.5) * 255 * bright,
      ((((b / 255) - 0.5) * level) + 0.5) * 255 * bright, a,
    ],
  );
};

function initializeBaseRaster(raster, scope) {
  /*
    Initialize the base image raster so that its visible, centered, and takes up
    the width of the window.

    Also make a copy of it to save as the original image so we can manipulate
    brightness and contrast
  */

  /* eslint no-param-reassign: ["error", { "props": false }] */

  raster.visible = true;
  raster.position = scope.view.center;
  raster.fitBounds(scope.view.bounds);

  const tmpCanvas = document.createElement('canvas');
  console.log(tmpCanvas);
  tmpCanvas.width = raster.width;
  tmpCanvas.height = raster.height;
  const tmpCtx = tmpCanvas.getContext('2d');
  // console.log(raster, raster.canvas.getContext('2d'));
  // TODO: uncomment this for brightness/contrast!
  raster.origImg = copyImageData(tmpCtx,
  raster.canvas.getContext('2d').getImageData(0, 0, raster.width, raster.height));
}

/* =============================================================================
                          TRANSFORMATION FUNCTIONS
============================================================================= */

const xfm = {};

xfm.clamp = function clamp(number, Min, Max) {
  /*
    returns the number if number is between min or max. If number is > max,
    returns max. If number < min, returns min
  */
  const max = Max || 0;
  const min = Min || 0;
  return Math.max(min, Math.min(number, max));
};

xfm.clampPoint = function clampPoint(point, Min, Max, minh, maxh) {
  /*
    returns a Point w/ point.x and point.y clamped between min,max
  */
  const min = Min || 0;
  const max = Max || 0;
  return new paper.Point({
    x: xfm.clamp(point.x, min, max),
    y: xfm.clamp(point.y, minh, maxh),
  });
};

xfm.get_local = function getLocal(e, baseRaster) {
  /*
    super weird coordinate transform. Make the center of the image 0,0 (because
    that is how the local coordinate system is referenced), then
    clamp the point, and then move 0,0 back to the top left for raster pixel
    refence space.
  */
  const width = baseRaster.size.width;
  const height = baseRaster.size.height;
  const halfW = width / 2;
  const halfH = height / 2;
  let local = baseRaster.globalToLocal(e.point);
  local = xfm.clampPoint(local, 0 - halfW, halfW, 0 - halfH, halfH);
  local.x = Math.floor(local.x + halfW);
  local.y = Math.floor(local.y + halfH);
  return local;
};


/* =============================================================================
                              MAIN APP
============================================================================= */

export default {
  name: 'Paper',
  data() {
    return {
      base: null,
      mask: null,
      contour: null,
      view: null,
      viewHeight: null,
      zoomFactor: 1,
      touch: {
        startScale: null,
        mode: null,
      },
      // paintVal: 1,
      // paintSize: 1,
      scope: null,
      panFactor: { x: 0, y: 0 },
      panMouseDown: null,
      drawOrPan: 'draw',
      draw: {
        last: null,
        counter: 0,
        history: [
          [],
        ],
      },

    };
  },
  methods: {
    activate() {
      this.scope.activate();
    },
    doZoom(e) {
      e.preventDefault();
      /* console.log("zooming") */
      const zoomFactor = this.zoomFactor + (e.deltaY / 200);
      this.zoomFactor = xfm.clamp(zoomFactor, 0.3, 3);
      this.view.setZoom(this.zoomFactor);
    },

    doPan(e) {
      if (this.panMouseDown == null) {
        this.panMouseDown = e;
        this.drawOrPan = 'pan';
      }
      // console.log('panMouseDown', this.panMouseDown);

      this.panFactor.x = e.point.x - this.panMouseDown.point.x;
      this.panFactor.y = e.point.y - this.panMouseDown.point.y;
      // console.log("panning?", this.panFactor.x, this.panFactor.y)
      this.view.translate(this.panFactor.x, this.panFactor.y);
    },

    add_roi(data, type, doDrag, lut) {
      this.scope.activate();
      chai.assert.oneOf(type, ['fp', 'tp', 'fn']);
      this[type] = new paper.Raster({});
      this[type].setSize(this.base.size);

      this[type].opacity = 0.5;
      this[type].position = this.view.center;
      this[type].initPixelLog();

      const colors = {
        fp: this.LUT[2], // '#87BCDE',
        tp: this.LUT[1],
        fn: this.LUT[3], // '#FF595E',
      };
      const LUT = lut || { 0: this.LUT[0], 1: colors[type] };
      this[type].fillPixelLog(data, LUT);
      this[type].fitBounds(this.base.bounds);
      const self = this;
      if (doDrag) {
        // TODO: this[type].onMouseDrag =
        this[type].onMouseDrag = function onMouseDrag(e) {
          if (e.event.buttons === 2 || self.touch.mode) {
            // right click and drag

            self.doPan(e);
          }
        };
        this[type].onMouseUp = function onMouseUp(e) {
          self.reset_draw(e);
        };
      }
      // fp.onMouseDrag = dragHandlerPan
    },

    onresize() {
      /*
        When the window size changes, change the bounds of all rasters
      */

      // allRasters.map(function(r){r.fitBounds(view.bounds)})
      // console.log("resizing")
      // console.log('resizing', this.id);
      // console.log('scrollHeight', document.body.scrollHeight, this.viewHeight);

      if (document.body.scrollHeight !== this.viewHeight) {
        // this.viewHeight = document.body.scrollHeight;
        if (this.base) {
          this.view.setZoom(1);
          this.base.fitBounds(this.view.bounds);
          this.mask.fitBounds(this.view.bounds);
          this.contour.fitBounds(this.view.bounds);
          this.zoomFactor = 1;
        }
      }
    },

    drawSplat(e, me) {
      const local = xfm.get_local(e, me);
      const shape = new paper.Shape.Circle(e.point, this.splatRadius);
      shape.strokeColor = this.splatColor;
      shape.strokeWidth = 2;
    },

    dragHandler(e) {
      if (e.event.buttons === 2 || this.touch.mode) {
        // not a right click
        this.doPan(e);
      }
    },

    clickHandler(e) {
      if (e.event.button !== 2) {
        this.drawSplat(e, this.base);
      }
    },

    brightcont() {
      const bright = ((parseInt(this.brightness, 10) - 50) / 50) + 1;
      const cont = (parseInt(this.contrast, 10) * 2) - 100;
      this.base.brightness_contrast(bright, cont);
    },

    removeEvents() {
      const el = document.getElementById(this.id);
      if (el) {
        // console.log('removing events');
        el.removeEventListener('resize', this.onresize);
        el.removeEventListener('mousewheel', this.doZoom);
      }
    },

    clearImg() {
      // console.log("paper source changed")
      this.scope.paper.project.clear();
      // console.log(paper.projects)
      this.draw.history = [
        [],
      ];
      this.zoomFactor = 1;

      this.view.setZoom(1);
      this.panFactor = {
        x: 0,
        y: 0,
      };
    },

    initImg() {
      // console.log('activating scope', this.id);
      this.scope.activate();
      this.base = new this.scope.paper.Raster({
        source: this.paperSrc,
        crossOrigin: 'anonymous',
      });

      this.base.visible = true;
      this.view = this.scope.view;
      // console.log("center is", view.center)
      const self = this;

      this.base.onLoad = function onLoad() {
        this.visible = true;
        // console.log("mounted canvas")
        initializeBaseRaster(this, self.scope);
        self.base.onMouseDrag = self.dragHandler;
        self.base.onClick = self.clickHandler;

        self.mask = new self.scope.paper.Raster(self.maskSrc);
        self.mask.onLoad = function onLoad2() {
          self.mask.visible = true;
          self.mask.setSize(self.base.size);
          self.mask.position = self.scope.view.center;
          self.mask.fitBounds(self.scope.view.bounds);
          self.mask.onMouseDrag = self.dragHandler;
          self.mask.onClick = self.clickHandler;
          self.mask.opacity = 0.5;
        };

        self.contour = new self.scope.paper.Raster(self.contourSrc);
        self.contour.onLoad = function onLoad3() {
          self.contour.visible = true;
          self.contour.setSize(self.base.size);
          self.contour.position = self.scope.view.center;
          self.contour.fitBounds(self.scope.view.bounds);
          self.contour.onMouseDrag = self.dragHandler;
          self.contour.onClick = self.clickHandler;
          self.contour.opacity = 0.5;
        };

        self.brightcont();
        self.$emit('loaded_image', self.id);
      };
    },
  },

  watch: {
    paperSrc() {
      this.clearImg();
      this.initImg();
    },
    brightness() {
      this.brightcont();
    },
    contrast() {
      this.brightcont();
    },
  },
  props: {
    paperSrc: {
      type: String,
      default: null,
    },
    maskSrc: {
      type: String,
      default: null,
    },
    contourSrc: {
      type: String,
      default: null,
    },
    brightness: {
      type: Number,
      default: 50,
    },
    contrast: {
      type: Number,
      default: 50,
    },
    id: {
      type: String,
      default: 'canvas-id',
    },
    splatRadius: {
      type: Number,
      default: 10,
    },
    splatColor: {
      type: String,
      default: '#ffc107',
    },
  },

  // ['paperSrc', 'fillErrorStart', 'fillErrorEnd',
  // 'paintSize', 'paintVal', 'brightness',
  // 'contrast', 'id', 'mouseUp'],

  beforeDestroy: function beforeDestroy(to, from, next) {
    // ('destroying', this.id);
    this.removeEvents();
    if (next) {
      next();
    }
  },

  mounted() {
    // console.log('mounting canvas', this.id);
    const scope = new paper.PaperScope();
    scope.setup(document.getElementById(this.id));
    // console.log("scope is", scope, "id is", this.id)
    this.scope = scope;
    this.initImg();

    // this.viewHeight = document.body.scrollHeight;

    const el = document.getElementById(this.id);
    // console.log(el);
    el.addEventListener('resize', this.onresize);
    el.addEventListener('mousewheel', this.doZoom);

    const self = this;

    const mc = new Hammer.Manager(el, {
      stopPropagation: true,
      preventDefault: true,
    });
    const Pinch = new Hammer.Pinch();

    // add the recognizer
    mc.add(Pinch);

    let tmpzoom = 1;

    // subscribe to events
    mc.on('pinch', (e) => {
        // do something cool

      if (e) {
        e.preventDefault();
        tmpzoom = xfm.clamp((e.scale / self.touch.startScale) * self.zoomFactor, 1, 5);
        self.view.setZoom(tmpzoom);
      }
    });

    mc.on('pinchend', (e) => {
        // do something cool
        // console.log("pinchend", window.mode)
      // console.log('ending pinch');
      self.touch.mode = false;
      if (e) {
        e.preventDefault();

        self.zoomFactor = tmpzoom;
        self.panMouseDown = null;
      }
    });

    mc.on('pinchstart', (e) => {
      // do something cool
      // console.log('starting pinch');
      if (e) {
        self.touch.mode = true;
        e.preventDefault();
        self.touch.startScale = e.scale;
      }
    });
  },
};

</script>

<style>



</style>
