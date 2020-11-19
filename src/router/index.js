import Vue from "vue";
import Router from "vue-router";
import About from "@/components/About";
import Admin from "@/components/Admin";
import Home from "@/components/Home";
import Profile from "@/components/Profile";
import Play from "@/components/Play";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import Terms from "@/components/Terms";
import Unauthorized from "@/components/Unauthorized";
import Leaderboard from "@/components/Leaderboard";
import Tutorial from "@/components/Tutorial";
import Review from "@/components/Review";
import Chats from "@/components/Chats";
import firebase from "firebase";
import config from "../config";

Vue.use(Router);

const router = new Router({
  scrollBehavior() {
    // args can be (to, from, savedPosition)
    // return desired position
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "*", // redirect to login view
      redirect: "/login"
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "Fibr",
        metaTags: [
          {
            name: "description",
            content: "The fibr home page."
          },
          {
            property: "og:description",
            content: "The fibr home page."
          }
        ]
      }
    },
    {
      path: "/about",
      name: "About",
      component: About,
      meta: {
        title: "Fibr - about",
        metaTags: [
          {
            name: "description",
            content: "The fibr about page."
          },
          {
            property: "og:description",
            content: "The fibr about page."
          }
        ]
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true,
        title: "Fibr - profile",
        metaTags: [
          {
            name: "description",
            content: "The fibr profile page."
          },
          {
            property: "og:description",
            content: "The fibr profile page."
          }
        ]
      }
    },
    {
      path: "/play",
      name: "Play",
      component: Play,
      meta: {
        requiresAuth: true,
        title: "Fibr - play",
        metaTags: [
          {
            name: "description",
            content: "The fibr game page."
          },
          {
            property: "og:description",
            content: "The fibr game page."
          }
        ]
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "Fibr - login",
        metaTags: [
          {
            name: "description",
            content: "The fibr login page."
          },
          {
            property: "og:description",
            content: "The fibr login page."
          }
        ]
      }
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
      meta: {
        title: "Fibr - sign up",
        metaTags: [
          {
            name: "description",
            content: "The fibr sign-up page."
          },
          {
            property: "og:description",
            content: "The fibr sign-up page."
          }
        ]
      }
    },
    {
      path: "/terms",
      name: "Terms",
      component: Terms,
      meta: {
        title: "Fibr - terms",
        metaTags: [
          {
            name: "description",
            content: "The fibr terms and conditions page."
          },
          {
            property: "og:description",
            content: "The fibr terms and conditions page."
          }
        ]
      }
    },
    {
      path: "/unauthorized",
      name: "Unauthorized",
      component: Unauthorized,
      meta: {
        title: "Fibr - unauthorized"
      }
    },
    {
      path: "/leaderboard",
      name: "Leaderboard",
      component: Leaderboard,
      meta: {
        title: "Fibr - leaderboard",
        metaTags: [
          {
            name: "description",
            content: "The fibr leaderboard page."
          },
          {
            property: "og:description",
            content: "The fibr leaderboard page."
          }
        ]
      }
    },
    {
      path: "/tutorial",
      name: "Tutorial",
      component: Tutorial,
      meta: {
        title: "Fibr - tutorial",
        metaTags: [
          {
            name: "description",
            content: "The fibr tutorial page."
          },
          {
            property: "og:description",
            content: "The fibr tutorial page."
          }
        ]
      }
    },
    {
      path: "/chats",
      name: "Chats",
      component: Chats,
      meta: {
        requiresAuth: true,
        title: "Fibr - chats",
        metaTags: [
          {
            name: "description",
            content: "The fibr chat page."
          },
          {
            property: "og:description",
            content: "The fibr chat page."
          }
        ]
      }
    },
    {
      path: "/review/:key",
      name: "Review",
      component: Review,
      meta: {
        title: "Fibr - review",
        metaTags: [
          {
            name: "description",
            content: "The fibr image review page."
          },
          {
            property: "og:description",
            content: "The fibr image review page."
          }
        ]
      }
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        title: "Fibr - admin",
        metaTags: [
          {
            name: "description",
            content: "The fibr admin page."
          },
          {
            property: "og:description",
            content: "The fibr admin page."
          }
        ]
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !currentUser) {
    next({ path: "/login", query: from.query });
  }
  // make sure the user has take the tutorial
  if (to.name === "Play") {
    if (currentUser) {
      firebase
        .database()
        .ref(`/users/${currentUser.displayName}`)
        .once("value")
        .then(snap => {
          const data = snap.val();
          if (!data.taken_tutorial && config.needsTutorial) {
            next({ path: "/tutorial", query: from.query });
          }
        });
    } else {
      next({ path: "/login", query: from.query });
    }
  }

  if (requiresAdmin) {
    // console.log('requires admin');
    firebase
      .database()
      .ref(`/settings/admins/${currentUser.displayName}`)
      .once("value")
      .then(snap => {
        // console.log('snap is', snap.val());
        if (requiresAdmin && !snap.val()) next("unauthorized");
        else next();
      });
  } else {
    next();
  }
});

export default router;
