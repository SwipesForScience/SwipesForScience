<template>
  <div id="about">
    <h1> About </h1>

    <b-container>

      <p>
        You get points for each sample you annotate.
      </p>

      <p>
        You can unlock the following animals based on the number of points you have:
      </p>

      <b-container fluid class="p-4">
        <b-row>
          <b-col v-for="lev in levels" v-if="lev.img" :key="lev.level">
            <div >
              <b-img fluid class="pokemon" :src="lev.img_grey" alt="Thumbnail"/>
              <br>
              Level {{lev.level}}
              <br>
              <span>{{lev.min}} points</span>
            </div>
          </b-col>
        </b-row>
      </b-container>

    </b-container>

  </div>

</template>

<style>

.pokemon{
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
  name: 'about',
  data() {
    return {
    };
  },
  props: {
    /**
     * the various levels, the points need to reach the levels,
     * and the badges (colored and greyed out) to display
     */
    levels: {
      type: Object,
      required: false,
    },
  },
};
</script>
