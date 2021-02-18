<template>
  <div class="home container">
    <div class="jumbotron landing" :style="landingStyle">
      <h1>{{ title }}</h1>
      <p class="lead buttons mt-3">
        {{ tagline }}
      </p>
      <p class="buttons mt-3">
        <router-link
          class="btn btn-primary white"
          :to="{ name: 'Play', query: routerQuery }"
        >
          Play Now
        </router-link>
        <router-link
          class="btn btn-primary white mx-1"
          :to="{ name: 'Tutorial', query: routerQuery }"
        >
          Tutorial
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
/**
 * The landing page, on the route `/`. This component displays a title, tagline,
 * and background image splash page that's defined on the config property.
 */

export default {
  name: "Home",
  props: {
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    config: {
      type: Object,
      required: true
    },
    routerQuery: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    /**
     * The title to display. Defined in `config.home.title`
     */
    title() {
      return this.config.home.title;
    },
    /**
     * The tagline to display. Defined in `config.home.tagline`
     */
    tagline() {
      return this.config.home.tagline;
    },
    /**
     * The background image to display. Defined in `config.home.backgroundUrl`
     */
    landingStyle() {
      return { "background-image": `url("${this.config.home.backgroundUrl}")` };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  min-height: 100vh;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.home {
  text-align: left;
}

.home h1 {
  text-align: center;
}

.buttons {
  text-align: center;
}

.landing {
  background-color: white;
  /* background-image: url('../assets/whaldrStatic.png'); */
  background-repeat: no-repeat;
  background-position: center;
  height: 80vh;
}

.landing h1 {
  background-color: black;
  color: white;
  max-width: 350px;
  margin: auto;
}

.landing .lead {
  background-color: black;
  color: white;
  max-width: 250px;
  margin: auto;
}

.white {
  color: white;
}
</style>
