import { createRouter, createWebHistory } from '@ionic/vue-router';
import firebase from 'firebase/app';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsPage.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/wifi',
    name: 'WiFi',
    component: () => import('../views/WiFiPage.vue'),
  },
  {
    path: '/hives',
    name: 'Hives',
    component: () => import('../views/HivesPage.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/tables',
    name: 'Tables',
    component: () => import('../views/TablesPage.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      hideForAuth: true
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupPage.vue'),
    meta: {
      hideForAuth: true
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot-Password',
    component: () => import('../views/ForgotPasswordPage.vue'),
    meta: {
      hideForAuth: true
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({ path: '/login' });
      } else {
        next();
      }
    }
    else if (to.matched.some(record => record.meta.hideForAuth)) {
      if (user) {
        next({ path: '/hives' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router
