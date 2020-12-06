<template>
  <div class="account-menu">
    <!-- Dropdown menu only available if user is logged in -->
    <div v-if="loggedIn" ref="account-menu-toggle" @click="toggleMenu">
      <!-- Please replace with user's actual icon and data-->
      <img src="../../assets/kesh-profile-icon.svg" alt="Profile Avatar" class="avatar" />
      <div class="account-menu__user-information">
        <span class="username">{{userInfo.displayName}}</span>
        <span class="user-score">{{ userData.score }}</span>
      </div>
    </div>
    <!-- The login option shows if the user is not authenticated -->
    <ul v-else>
      <li>
        <router-link to="/login" class="nav__link">
          <i class="fa fa-user" aria-hidden="true"></i>
          Login
        </router-link>
      </li>
    </ul>
    <div
      class="account-menu__dropdown"
      v-if="isActive"
      v-click-outside="{exclude: ['account-menu-toggle'], handler: 'onClose'}"
    >
      <ul>
        <li>Profile</li>
        <li>
          <span v-on:click="onClickLogout">Sign out</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import ClickOutside from '../../directives/ClickOutside.js';

export default {
  name: 'AccountMenu',
  data() {
    return {
      isActive: false,
    };
  },
  props: {
    loggedIn: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
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
    onClickLogout() {
      this.$emit('logout');
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

<style>
/* Account Menu */
.account-menu {
  display: block;
  user-select: none;
  font-weight: 700;
  color: hsl(253, 45%, 46%);
  font-weight: 600;
  cursor: pointer;
}

.account-menu .avatar,
.account-menu .user-score {
  display: none;
}

.account-menu__dropdown {
  display: block;
  width: 14.5em;
  background-color: hsl(0, 0%, 100%);
  position: absolute;
  right: 1.25em;
  top: 50px;
  z-index: 100;
  padding: 1em 1.25em;
  border-radius: 7px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
.account-menu__dropdown ul li {
  line-height: 50px;
  font-weight: 400;
  font-size: 1.125em;
}

@media (min-width: 65em) {
  .account-menu > div {
    display: flex;
  }
  .account-menu .avatar {
    display: block;
    width: 4em;
    margin-right: 1em;
  }
  .account-menu .user-score {
    display: block;
  }
  .account-menu__user-information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 5em;
    font-size: 0.75em;
  }
  .account-menu__user-information .username {
    position: relative;
    font-weight: 700;
    font-size: 1.375em;
    color: hsl(273, 9%, 46%);
  }
  .account-menu__user-information .username:after {
    content: 'NEW';
    position: absolute;
    top: 1.6em;
    left: 0px;
    padding: 0px 5px;
    border-radius: 3px;
    font-size: 0.8em;
    line-height: 1.5em;
    background-color: hsl(252, 38%, 95%);
  }
  .account-menu__dropdown {
    top: 100px;
  }
}
</style>