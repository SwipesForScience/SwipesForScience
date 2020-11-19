<template>
  <div class="slider-menu">
    <a
      class="slider-menu__toggle"
      @click="toggleMenu()"
      ref="slider-menu-toggle"
    >
      <p class="h3 mb-2">
        <b-icon style="color: #341789;" icon="three-dots-vertical"></b-icon>
      </p>
    </a>
    <div
      class="slider-menu__drawer"
      v-if="isActive"
      v-click-outside="{ exclude: ['slider-menu-toggle'], handler: 'onClose' }"
    >
      <ul>
        <li v-for="menuItem in menuItems" :key="menuItem.name">
          <router-link :to="menuItem.path">{{ menuItem.name }}</router-link>
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
  name: "SliderMenu",
  data() {
    return {
      isActive: false,
      menuItems: [
        { path: "/", name: "Home" },
        { path: "/leaderboard", name: "Leaderboard" },
        { path: "/chats", name: "Chats" },
        { path: "/play", name: "Play" },
        { path: "/admin", name: "Admin" },
        { path: "/tutorial", name: "Tutorial" }
      ]
    };
  },
  props: {
    needsTutorial: {
      type: Boolean,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClose() {
      this.isActive = false;
    },
    toggleMenu() {
      this.isActive = !this.isActive;
    }
  },
  directives: {
    ClickOutside
  },
  watch: {
    $route() {
      this.isActive = false;
    }
  }
};
</script>
