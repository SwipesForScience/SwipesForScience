<template>
  <footer>
    <div class="footer__container">
      <img src="../assets/eLife-logo.svg" alt="eLife logo" class="logo" />
      <nav>
        <router-link
          v-for="menuItem in menuItems"
          :key="menuItem.name"
          :to="menuItem.path"
          class="nav__link"
        >{{menuItem.name}}</router-link>
      </nav>

      <div class="configureButton">
        <b-button variant="info" @click="openConfig">
          <i class="fa fa-wrench" aria-hidden="true"></i> Configure
        </b-button>
      </div>
    </div>
  </footer>
</template>
<script>
/**
    Footer component with useful links and stuff.
  */
export default {
  name: 'Footer',
  props: {
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    config: {
      type: Object,
      required: true,
    },
    routerQuery: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menuItems: [
        { path: '/', name: 'Home' },
        { path: '/play', name: 'Game' },
        { path: '/chats', name: 'Chat' },
        { path: '/leaderboard', name: 'Leaderboard' },
        { path: '/about', name: 'About' },
        { path: '/contact', name: 'Contact us' },
      ],
    };
  },
  methods: {
    /**
     * The method to tell the parent component (App.vue) to open the config panel.
     */
    openConfig(e) {
      e.preventDefault();
      this.$emit('openConfig');
    },
  },
};
</script>
<style scoped>
footer {
  width: 100%;
  position: relative;
  padding: 1.25em;
}
.footer__container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer__container .logo {
  width: 6em;
}
.footer__container nav {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
}

.footer__container nav a {
  display: block;
  width: 50%;
  height: 2em;
  text-align: left;
}
@media (min-width: 65em) {
  footer {
    padding: 2em;
  }
  .footer__container .logo {
    width: 8em;
  }
  .footer__container {
    max-width: 65em;
    align-items: flex-end;
  }
  .footer__container nav {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .footer__container nav a {
    width: auto;
    height: auto;
  }
}

.configureButton {
  display: block;
  position: absolute;
  bottom: 5px;
  right: 5px;
}

/*footer*/
.col_white_amrc {
  color: #fff;
}
.pt2 {
  padding-top: 40px;
  margin-bottom: 20px;
}
footer p {
  font-size: 13px;
  color: #ccc;
  padding-bottom: 0px;
  margin-bottom: 8px;
}
.mb10 {
  padding-bottom: 15px;
}
.footer_ul_amrc {
  margin: 0px;
  list-style-type: none;
  font-size: 14px;
  padding: 0px 0px 10px 0px;
}
.footer_ul_amrc li {
  padding: 0px 0px 5px 0px;
}
.footer_ul_amrc li a {
  color: #ccc;
}
.footer_ul_amrc li a:hover {
  color: #fff;
  text-decoration: none;
}
.fleft {
  float: left;
}
.padding-right {
  padding-right: 10px;
}

.footer_ul2_amrc {
  margin: 0px;
  list-style-type: none;
  padding: 0px;
}
.footer_ul2_amrc li p {
  display: table;
}
.footer_ul2_amrc li a:hover {
  text-decoration: none;
}
.footer_ul2_amrc li i {
  margin-top: 5px;
}

.bottom_border {
  border-bottom: 1px solid #323f45;
  padding-bottom: 20px;
}
.foote_bottom_ul_amrc {
  list-style-type: none;
  padding: 0px;
  display: table;
  margin-top: 10px;
  margin-right: auto;
  margin-bottom: 10px;
  margin-left: auto;
}
.foote_bottom_ul_amrc li {
  display: inline;
}
.foote_bottom_ul_amrc li a {
  color: #999;
  margin: 0 12px;
}

.social_footer_ul {
  display: table;
  margin: 15px auto 0 auto;
  list-style-type: none;
}
.social_footer_ul li {
  padding-left: 20px;
  padding-top: 10px;
  float: left;
}
.social_footer_ul li a {
  color: #ccc;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 50%;
}
.social_footer_ul li i {
  width: 20px;
  height: 20px;
  text-align: center;
}
</style>
