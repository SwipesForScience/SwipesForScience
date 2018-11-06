<template>
  <svg class="arrows">
    <!-- codepen from https://codepen.io/postor/pen/mskxI -->
		<path class="a1" d="M0 0 L30 32 L60 0"></path>
		<path class="a2" d="M0 20 L30 52 L60 20"></path>
		<path class="a3" d="M0 40 L30 72 L60 40"></path>
	</svg>
</template>

<style>

  .arrows {
  	width: 60px;
  	height: 72px;
  	position: fixed;
  	left: 50%;
  	margin-left: -30px;
  	bottom: 20px;
  }

  .arrows path {
  	stroke: #2994D1;
  	fill: transparent;
  	stroke-width: 1px;
  	animation: arrow 2s infinite;
  	-webkit-animation: arrow 2s infinite;
  }

  @keyframes arrow
  {
  0% {opacity:0}
  40% {opacity:1}
  80% {opacity:0}
  100% {opacity:0}
  }

  @-webkit-keyframes arrow /*Safari and Chrome*/
  {
  0% {opacity:0}
  40% {opacity:1}
  80% {opacity:0}
  100% {opacity:0}
  }

  .arrows path.a1 {
  	animation-delay:-1s;
  	-webkit-animation-delay:-1s; /* Safari 和 Chrome */
  }

  .arrows path.a2 {
  	animation-delay:-0.5s;
  	-webkit-animation-delay:-0.5s; /* Safari 和 Chrome */
  }

  .arrows path.a3 {
  	animation-delay:0s;
  	-webkit-animation-delay:0s; /* Safari 和 Chrome */
  }
</style>

<script>
/**
 * This is the arrow down animation used in the Tutorial component.
 */
  export default {
    name: 'Arrow',
  };
</script>
