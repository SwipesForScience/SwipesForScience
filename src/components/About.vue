<template>
  <div id="about">
    <h1>About</h1>

    <b-container>
      <p class="mt-3">
        Fibr is an app for quality control of diffusion MRI images from the
        <a href="https://healthybrainnetwork.org/">Healthy Brain Network.</a>
      </p>
      <p class="mt-3">
        It is inspired by the previous success of the
        <a href="https://braindr.us/">braindr</a> app for structural MRI images.
      </p>
      <p class="mt-3">
        Your objective is to classify these slices as "Pass" or "Fail" by
        swiping right or left
      </p>
      <p class="mt-3">
        You get points for each sample you annotate.
      </p>
      <p class="mt-3">
        You can unlock the following animals based on the number of points you
        have:
      </p>

      <b-container fluid class="p-4">
        <b-row>
          <b-col v-for="lev in levels" :key="lev.level">
            <div>
              <b-img
                fluid
                class="pokemon"
                :src="lev.img_grey"
                alt="Thumbnail"
              />
              <br />
              Level {{ lev.level }}
              <br />
              <span>{{ lev.min }} points</span>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<style>
.pokemon {
  min-width: 25px;
  min-height: 25px;
  width: 100px;
  height: 100px;
}

#about {
  min-height: 100vh;
}
</style>

<script>
/**
 * This is the about page for the route /about.
 * Right now this page only shows the various badges you can win if you play
 * the game. Eventually, we should fill the content with text that the researcher
 * provides, in markdown.
 */
export default {
  name: "about",
  data() {
    return {};
  },
  props: {
    /**
     * the various levels, the points need to reach the levels,
     * and the badges (colored and greyed out) to display
     */
    levels: {
      type: Object,
      required: false
    }
  }
};
</script>
