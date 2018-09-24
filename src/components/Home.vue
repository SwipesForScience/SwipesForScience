<template>
  <div class="home container">
    <div class="jumbotron landing" :style="landingStyle">
      <h1>{{title}}</h1>
      <p class="lead buttons mt-3">
        {{tagline}}
      </p>
      <p class="buttons mt-3">
        <router-link class="btn btn-primary white" to="/play"> Play Now </router-link>
      </p>
    </div>
    <!--<div class="container">
      <div class="row">
        <img class="mx-auto" src="../assets/mainGIF.gif"/>
      </div>
    </div>-->

  </div>


</template>

<script>
import config from '../config';

export default {
  name: 'Home',
  data() {
    return {
      title: config.home.title,
      tagline: config.home.tagline,
      landingStyle: {
        'background-image': `url("${config.home.backgroundUrl}")`,
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home {
  min-height: 100vh;
}

h1, h2 {
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
