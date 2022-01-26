<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 101 66"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 1.5;
    "
  >
    <g transform="matrix(1,0,0,1,-123.694,-205.009)">
      <g transform="matrix(0.539961,0,0,0.450646,63.3446,119.611)">
        <path
          id="swipe-stroke"
          d="M137.694,220.567C219.858,233.849 272.031,300.263 272.031,302.922"
          style="fill: none; stroke: white; stroke-width: 50px"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "SwipeAnimation",
};
</script>

<style scoped lang="scss">
svg {
  opacity: 0.3;
}
#swipe-stroke {
  animation-delay: 1s;
  stroke-dasharray: 180 180;
  stroke-dashoffset: 180;
  animation-duration: 2s;
  animation-name: swipein;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes swipein {
  0% {
    stroke-dashoffset: 180;
  }
  50% {
    stroke-dashoffset: -180;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: -180;
    opacity: 0;
  }
}
</style>
