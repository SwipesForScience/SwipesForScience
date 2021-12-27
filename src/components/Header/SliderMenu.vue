<template>
  <div class="slider-menu">
    <a class="slider-menu__toggle" @click="toggleMenu()" ref="slider-menu-toggle">
      <svg
        width="31px"
        height="22px"
        viewBox="0 0 31 22"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;"
      >
        <g transform="matrix(1,0,0,1,-26.8461,-27.8461)">
          <path
            d="M52,33L32,33M47,44L32,44"
            style="fill:none;stroke:rgb(88,65,171);stroke-width:2.5px;"
          />
        </g>
      </svg>
    </a>
    <div
      class="slider-menu__drawer"
      v-if="isActive"
      v-click-outside="{exclude: ['slider-menu-toggle'], handler: 'onClose'}"
    >
      <ul>
        <li v-for="menuItem in menuItems" :key="menuItem.name">
          <router-link :to="menuItem.path">{{menuItem.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.slider-menu {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
}
.slider-menu__toggle {
  display: flex;
  justify-content: flex-start;
  width: 50px;
  height: 50px;
}
.slider-menu__drawer {
  background-color: hsl(0, 0%, 100%);
  position: absolute;
  left: 1.25em;
  top: 50px;
  right: 1.25em;
  z-index: 100;
  border-radius: 7px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
.slider-menu__drawer ul li {
  line-height: 50px;
  font-weight: 400;
  font-size: 1.125em;
}

@media (min-width: 65em) {
    .slider-menu {
        display: none;
    }
}

</style>

<script>
// eslint-disable-next-line
import ClickOutside from '../../directives/ClickOutside.js';

export default {
  name: 'SliderMenu',
  data() {
    return {
      isActive: false,
      menuItems: [
        { path: '/', name: 'Home' },
        { path: '/leaderboard', name: 'Leaderboard' },
        { path: '/chats', name: 'Chats' },
        { path: '/admin', name: 'Admin' },
        { path: '/tutorial', name: 'Tutorial' },
      ],
    };
  },
  props: {
    needsTutorial: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onClose() {
      this.isActive = false;
    },
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
  directives: {
    ClickOutside,
  },
  watch: {
    $route() {
      this.isActive = false;
    },
  },
};
</script>