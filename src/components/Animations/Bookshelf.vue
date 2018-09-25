<template>
  <!-- bookshelf code from https://codepen.io/ikoshowa/pen/qOMvpy -->
  <div class="bookshelf_wrapper">
    <ul class="books_list">
      <li class="book_item first"></li>
      <li class="book_item second"></li>
      <li class="book_item third"></li>
      <li class="book_item fourth"></li>
      <li class="book_item fifth"></li>
      <li class="book_item sixth"></li>
    </ul>
    <div class="shelf"></div>
  </div>
</template>



<script>
export default {
  name: 'bookshelf',
};
</script>

<style>
  .bookshelf_wrapper {
    position: relative;
    top: 60%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }

  .books_list {
    margin: 0 auto;
    width: 300px;
    padding: 0;
  }

  .book_item {
    position: absolute;
    top: -120px;
    box-sizing: border-box;
    list-style: none;
    width: 40px;
    height: 120px;
    opacity: 0;
    background-color: #dc3545;
    border: 5px solid white;
    -webkit-transform-origin: bottom left;
            transform-origin: bottom left;
    -webkit-transform: translateX(300px);
            transform: translateX(300px);
    -webkit-animation: travel 2500ms linear infinite;
            animation: travel 2500ms linear infinite;
  }
  .book_item.first {
    top: -140px;
    height: 140px;
  }
  .book_item.first:before, .book_item.first:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: white;
  }
  .book_item.first:after {
    top: initial;
    bottom: 10px;
  }
  .book_item.second:before, .book_item.second:after, .book_item.fifth:before, .book_item.fifth:after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 17.5px;
    border-top: 5px solid white;
    border-bottom: 5px solid white;
  }
  .book_item.second:after, .book_item.fifth:after {
    top: initial;
    bottom: 10px;
  }
  .book_item.third:before, .book_item.third:after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 10px;
    left: 9px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .book_item.third:after {
    top: initial;
    bottom: 10px;
  }
  .book_item.fourth {
    top: -130px;
    height: 130px;
  }
  .book_item.fourth:before {
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 46px;
    left: 0;
    width: 100%;
    height: 17.5px;
    border-top: 5px solid white;
    border-bottom: 5px solid white;
  }
  .book_item.fifth {
    top: -100px;
    height: 100px;
  }
  .book_item.sixth {
    top: -140px;
    height: 140px;
  }
  .book_item.sixth:before {
    box-sizing: border-box;
    content: '';
    position: absolute;
    bottom: 31px;
    left: 0px;
    width: 100%;
    height: 5px;
    background-color: white;
  }
  .book_item.sixth:after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    bottom: 10px;
    left: 9px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .book_item:nth-child(2) {
    -webkit-animation-delay: 416.6666666667ms;
            animation-delay: 416.6666666667ms;
  }
  .book_item:nth-child(3) {
    -webkit-animation-delay: 833.3333333333ms;
            animation-delay: 833.3333333333ms;
  }
  .book_item:nth-child(4) {
    -webkit-animation-delay: 1250ms;
            animation-delay: 1250ms;
  }
  .book_item:nth-child(5) {
    -webkit-animation-delay: 1666.6666666667ms;
            animation-delay: 1666.6666666667ms;
  }
  .book_item:nth-child(6) {
    -webkit-animation-delay: 2083.3333333333ms;
            animation-delay: 2083.3333333333ms;
  }

  .shelf {
    width: 300px;
    height: 5px;
    margin: 0 auto;
    background-color: white;
    position: relative;
  }
  .shelf:before, .shelf:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #dc3545;
    background-image: radial-gradient(rgba(255, 255, 255, 0.5) 30%, transparent 0);
    background-size: 10px 10px;
    background-position: 0 -2.5px;
    top: 200%;
    left: 5%;
    -webkit-animation: move 250ms linear infinite;
            animation: move 250ms linear infinite;
  }
  .shelf:after {
    top: 400%;
    left: 7.5%;
  }

  @-webkit-keyframes move {
    from {
      background-position-x: 0;
    }
    to {
      background-position-x: 10px;
    }
  }

  @keyframes move {
    from {
      background-position-x: 0;
    }
    to {
      background-position-x: 10px;
    }
  }
  @-webkit-keyframes travel {
    0% {
      opacity: 0;
      -webkit-transform: translateX(300px) rotateZ(0deg) scaleY(1);
              transform: translateX(300px) rotateZ(0deg) scaleY(1);
    }
    6.5% {
      -webkit-transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);
              transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);
    }
    8.8% {
      -webkit-transform: translateX(273.6px) rotateZ(0deg) scaleY(1);
              transform: translateX(273.6px) rotateZ(0deg) scaleY(1);
    }
    10% {
      opacity: 1;
      -webkit-transform: translateX(270px) rotateZ(0deg);
              transform: translateX(270px) rotateZ(0deg);
    }
    17.6% {
      -webkit-transform: translateX(247.2px) rotateZ(-30deg);
              transform: translateX(247.2px) rotateZ(-30deg);
    }
    45% {
      -webkit-transform: translateX(165px) rotateZ(-30deg);
              transform: translateX(165px) rotateZ(-30deg);
    }
    49.5% {
      -webkit-transform: translateX(151.5px) rotateZ(-45deg);
              transform: translateX(151.5px) rotateZ(-45deg);
    }
    61.5% {
      -webkit-transform: translateX(115.5px) rotateZ(-45deg);
              transform: translateX(115.5px) rotateZ(-45deg);
    }
    67% {
      -webkit-transform: translateX(99px) rotateZ(-60deg);
              transform: translateX(99px) rotateZ(-60deg);
    }
    76% {
      -webkit-transform: translateX(72px) rotateZ(-60deg);
              transform: translateX(72px) rotateZ(-60deg);
    }
    83.5% {
      opacity: 1;
      -webkit-transform: translateX(49.5px) rotateZ(-90deg);
              transform: translateX(49.5px) rotateZ(-90deg);
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      -webkit-transform: translateX(0px) rotateZ(-90deg);
              transform: translateX(0px) rotateZ(-90deg);
    }
  }
  @keyframes travel {
    0% {
      opacity: 0;
      -webkit-transform: translateX(300px) rotateZ(0deg) scaleY(1);
              transform: translateX(300px) rotateZ(0deg) scaleY(1);
    }
    6.5% {
      -webkit-transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);
              transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);
    }
    8.8% {
      -webkit-transform: translateX(273.6px) rotateZ(0deg) scaleY(1);
              transform: translateX(273.6px) rotateZ(0deg) scaleY(1);
    }
    10% {
      opacity: 1;
      -webkit-transform: translateX(270px) rotateZ(0deg);
              transform: translateX(270px) rotateZ(0deg);
    }
    17.6% {
      -webkit-transform: translateX(247.2px) rotateZ(-30deg);
              transform: translateX(247.2px) rotateZ(-30deg);
    }
    45% {
      -webkit-transform: translateX(165px) rotateZ(-30deg);
              transform: translateX(165px) rotateZ(-30deg);
    }
    49.5% {
      -webkit-transform: translateX(151.5px) rotateZ(-45deg);
              transform: translateX(151.5px) rotateZ(-45deg);
    }
    61.5% {
      -webkit-transform: translateX(115.5px) rotateZ(-45deg);
              transform: translateX(115.5px) rotateZ(-45deg);
    }
    67% {
      -webkit-transform: translateX(99px) rotateZ(-60deg);
              transform: translateX(99px) rotateZ(-60deg);
    }
    76% {
      -webkit-transform: translateX(72px) rotateZ(-60deg);
              transform: translateX(72px) rotateZ(-60deg);
    }
    83.5% {
      opacity: 1;
      -webkit-transform: translateX(49.5px) rotateZ(-90deg);
              transform: translateX(49.5px) rotateZ(-90deg);
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      -webkit-transform: translateX(0px) rotateZ(-90deg);
              transform: translateX(0px) rotateZ(-90deg);
    }
  }
</style>
