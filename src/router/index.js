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
  // mode: 'history',
  routes: [
    {
      path: '*', // redirect to login view
      redirect: '/BCP/',
    },
    {
      path: '/BCP/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/BCP/about',
      name: 'About',
      component: About,
    },
    {
      path: '/BCP/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/BCP/play',
      name: 'Play',
      component: Play,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/BCP/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/BCP/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/BCP/terms',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/BCP/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized,
    },
    {
      path: '/BCP/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard,
    },
    {
      path: '/BCP/tutorial',
      name: 'Tutorial',
      component: Tutorial,
    },
    {
      path: '/BCP/chats',
      name: 'Chats',
      component: Chats,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/BCP/review/:key',
      name: 'Review',
      component: Review,
    },
    {
      path: '/BCP/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/about',
      redirect: '/BCP/about',
    },
    {
      path: '/profile',
      redirect: '/BCP/profile',
    },
    {
      path: '/play',
      redirect: '/BCP/play',
    },
    {
      path: '/login',
      redirect: '/BCP/login',
    },
    {
      path: '/signup',
      redirect: '/BCP/signup',
    },
    {
      path: '/terms',
      redirect: '/BCP/terms',
    },
    {
      path: '/unauthorized',
      redirect: '/BCP/unauthorized',
    },
    {
      path: '/leaderboard',
      redirect: '/BCP/leaderboard',
    },
    {
      path: '/tutorial',
      redirect: '/BCP/tutorial',
    },
    {
      path: '/chats',
      redirect: '/BCP/chats',
    },
    {
      path: '/review/:key',
      redirect: '/BCP/review/:key',
    },
    {
      path: '/admin',
      redirect: '/BCP/admin',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !currentUser) {
    next({ path: '/login', query: from.query });
  }
  // make sure the user has take the tutorial
  if (to.name === 'Play') {
    if (currentUser) {
      firebase.database().ref(`/users/${currentUser.displayName}`).once('value')
        .then((snap) => {
          const data = snap.val();
          if (!data.taken_tutorial && config.needsTutorial) {
            next({ path: '/tutorial', query: from.query });
          }
        });
    } else {
      next({ path: '/login', query: from.query });
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
