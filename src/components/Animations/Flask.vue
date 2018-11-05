<template>
  <div id="flask">
    <!-- Code from https://codepen.io/joeyclouvel/pen/gxKJp-->
  	<div class="background"></div>
  	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 113 130" xml:space="preserve">
  		<g>
  			<path fill="#FFFFFF" d="M0,0v130h112.084L111.75,0H0z M94.75,128C71,128,56,128,56,128s-14.873,0-38.623,0s-13.945-19.422-6.33-35.945S40,41.25,40,41.25V3h16h11v38.25c0,0,23.901,34.283,31.517,50.805S118.5,128,94.75,128z"/>
  			<path fill="none" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M56,127.5c0,0-14.873,0-38.623,0s-13.695-19.172-6.08-35.695C18.912,75.283,40.5,41.25,40.5,41.25V2.5h-9H56h19.5h-8v38.75c0,0,23.651,34.033,31.267,50.555c7.615,16.523,19.733,35.695-4.017,35.695S56,127.5,56,127.5z"/>
  		</g>
  	</svg>
  	<div class="bubble b0"></div>
  	<div class="bubble b1"></div>
  	<div class="bubble b2"></div>
  	<div class="bubble b3"></div>
  	<div class="bubble b4"></div>
  	<div class="bubble b5"></div>
  	<div class="bubble b6"></div>
  	<div class="bubble b7"></div>
  	<div class="bubble b8"></div>
  	<div class="bubble b9"></div>

  	<div class="swirl s0"></div>
  	<div class="swirl s1"></div>
  	<div class="swirl s2"></div>
  	<div class="swirl s3"></div>
  	<div class="swirl s4"></div>
  	<div class="swirl s5"></div>
  </div>
</template>

<style scoped>
  #flask {
  	width: 197px;
  	height: 230px;
  	margin: 0 auto;
  	margin-top: 200px;
  	position: relative;
  }
  #flask svg {
  	width: 200px;
  	height: 230px;
  	z-index: 1;
  	position: absolute;
  	top: 0;
  	left: 0;
  }
  #flask .background {
  	width: 197px;
  	height: 100px;
  	background-color: #5BBCFC;
  	position: absolute;
  	z-index: 0;
  	bottom: 0;
  	left: 0;
  	animation: liquid 3s infinite,liquid-color 80s infinite;
  }
  .bubble {
  	width: 40px;
  	height: 40px;
  	background: #5BBCFC;
  	border-radius: 40px;
  	position: absolute;
  	top: 180px;
  }


  @keyframes liquid {
  	0% {
  		height: 100px;
  	}
  	10% {
  		height: 97px;
  	}
  	35% {
  		height: 100px;
  	}
  	50% {
  		height: 102px;
  	}
  	80% {
  		height: 98px;
  	}
  	100% {
  		height: 100px;
  	}
  }
  @keyframes liquid-color {
    from {
      -webkit-filter: hue-rotate(-360deg);
    }
    to {
      -webkit-filter: hue-rotate(0deg);
    }
  }


  @keyframes bubble {
  	0% {
  		top: 200px;
  	}
  	100% {
  		top: -200px;
  		opacity: 0;
  	}
  }
  @keyframes side {
  	0% {
  		margin-right: 0px;
  	}
  	100% {
  		margin-right: 35px;
  	}
  }



  .b1,.b2,.b3 {
  	right: 60px;
  	transform: scale(0.4);
  	opacity: 0.6;
  	animation: bubble 8s linear infinite, liquid-color 80s infinite, side 2s ease-in-out infinite alternate;
  }
  .b2 {
  	right: 65px;
  	transform: scale(0.5);
  	animation-delay: 2s,0s,2s;
  }
  .b3 {
  	right: 70px;
  	animation-delay: 5s,0s,5s;
  	animation: bubble 10s linear infinite, liquid-color 80s infinite, side 3s ease-in-out infinite alternate;
  }
  .b4,.b5 {
  	right: 65px;
  	transform: scale(0.5);
  	opacity: 0.8;
  	animation: bubble 16s linear infinite, liquid-color 80s infinite, side 5s ease-in-out infinite alternate;
  	animation-delay: 4s,0s,4s;
  }
  .b5 {
  	right: 55px;
  	animation-delay: 5s,0s,5s;
  }
  .b6,.b7,.b8 {
  	right: 65px;
  	transform: scale(0.6);
  	opacity: 0.4;
  	animation: bubble 14s linear infinite, liquid-color 80s infinite, side 3s ease-in-out infinite alternate;
  	animation-delay: 9s,0s,9s;
  }
  .b7 {
  	right: 70px;
  	transform: scale(0.7);
  	animation-delay: 3s,0s,3s;
  }
  .b8 {
  	right: 65px;
  	animation-delay: 7s,0s,7s;
  }
  .b9,.b0 {
  	right: 70px;
  	transform: scale(0.65);
  	opacity: 0.7;
  	animation: bubble 20s linear infinite, liquid-color 80s infinite, side 5s ease-in-out infinite alternate;
  }
  .b0 {
  	right: 60px;
  	animation-delay: 13s,0s,13s;
  }



  .swirl {
  	width: 20px;
  	height: 20px;
  	background: #5BBCFC;
  	border-radius: 20px;
  	position: absolute;
  	top: 140px;
  	left: 80px;
  }


  @keyframes swirl {
  	0% {
  		top: 140px;
  	}
  	100% {
  		top: 128px;
  	}
  }



  .s0 {
  	animation: liquid-color 80s infinite, swirl 1s ease-in-out infinite alternate;
  }
  .s1 {
  	left: 100px;
  	transform: scale(1.2);
  	animation: liquid-color 80s infinite, swirl 2s ease-in-out infinite alternate;
  	animation-delay: 0s,2s;
  }
  .s2 {
  	left: 40px;
  	transform: scale(0.8);
  	animation: liquid-color 80s infinite, swirl 2s ease-in-out infinite alternate;
  	animation-delay: 0s,3s;
  }
  .s3 {
  	left: 60px;
  	transform: scale(1.4);
  	animation: liquid-color 80s infinite, swirl 1s ease-in-out infinite alternate;
  	animation-delay: 0s,5s;
  }
  .s4 {
  	left: 120px;
  	animation: liquid-color 80s infinite, swirl 2s ease-in-out infinite alternate;
  	animation-delay: 0s,3s;
  }
  .s5 {
  	left: 135px;
  	transform: scale(0.8);
  	animation: liquid-color 80s infinite, swirl 1s ease-in-out infinite alternate;
  	animation-delay: 0s,2s;
  }
</style>

<script>
/**
 * This is the flask animation used in the Play component, while data loads.
 */
  export default {
    name: 'flask',
  };
</script>
