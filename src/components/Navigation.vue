<template>
  <header>
    <nav>
      <router-link :to="{ name: 'Home' }"
        ><Logo class="nav-logo"
      /></router-link>
      <ul>
        <li>
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li>Documentation</li>
        <li>FAQ</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  name: "Navigation",
  components: {
    Logo,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.nav-logo {
  width: 10rem;
}
header {
  position: absolute;
  z-index: 100;
  width: 100%;
  padding: 0 2.4rem 3rem;
}
nav {
  display: none;
  max-width: 996px;
  margin: space(4) auto;
  justify-content: space-between;
  align-items: center;
  @include media("≥tablet") {
    display: flex;
  }
}
ul {
  font-weight: 600;
  display: flex;
  li {
    margin-left: space(4);
  }
}
</style>
