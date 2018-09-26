import Vue from 'vue';
import Router from 'vue-router';
import About from '@/components/About';
import Admin from '@/components/Admin';
import Home from '@/components/Home';
import Profile from '@/components/Profile';
import Play from '@/components/Play';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import Terms from '@/components/Terms';
import Unauthorized from '@/components/Unauthorized';
import Leaderboard from '@/components/Leaderboard';
import Tutorial from '@/components/Tutorial';
import Review from '@/components/Review';
import Chats from '@/components/Chats';
import firebase from 'firebase';
import config from '../config';

Vue.use(Router);

const router = new Router({
  scrollBehavior() {
    // args can be (to, from, savedPosition)
    // return desired position
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '*', // redirect to login view
      redirect: '/login',
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/play',
      name: 'Play',
      component: Play,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized,
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard,
    },
    {
      path: '/tutorial',
      name: 'Tutorial',
      component: Tutorial,
    },
    {
      path: '/chats',
      name: 'Chats',
      component: Chats,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/review/:key',
      name: 'Review',
      component: Review,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !currentUser) {
    next('login');
  }
  // make sure the user has take the tutorial
  if (to.name === 'Play') {
    if (currentUser) {
      firebase.database().ref(`/users/${currentUser.displayName}`).once('value')
        .then((snap) => {
          const data = snap.val();
          if (!data.taken_tutorial && config.needsTutorial) {
            next('tutorial');
          }
        });
    } else {
      next('login');
    }
  }

  if (requiresAdmin) {
    // console.log('requires admin');
    firebase.database().ref(`/settings/admins/${currentUser.displayName}`).once('value')
    .then((snap) => {
      // console.log('snap is', snap.val());
      if (requiresAdmin && !snap.val()) next('unauthorized');
      else next();
    });
  } else {
    next();
  }
});

export default router;
