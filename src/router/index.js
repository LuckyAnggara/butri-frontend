import { createRouter, createWebHashHistory } from "vue-router";
import UserDashboard from "@/views/Dashboard/UserDashboard.vue";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    meta: {
      title: "Dashboard",
      layout: "layout-authenticated",
      requiresAuth: true,
    },
    path: "/",
    name: "dashboard",
    component: UserDashboard,
  },
  {
    meta: {
      title: "Login",
      layout: "layout-guest",
      requiresAuth: false,
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
    path: "/dashboard",
    name: "asd",
    component: UserDashboard,
  },
  {
    meta: {
      title: "Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/list",
    name: "list-pegawai",
    component: () => import("@/views/Kepegawaian/DataPegawai.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },

  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeResolve(async (to, _, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth == true && auth.isLoggedIn() == false)
    return next("/login");
  if (to.name == "login" && auth.isLoggedIn() == true) return next("/");
  return next();
});

export default router;

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return savedPosition || { top: 0 };
//   },
// });

// export default router;
