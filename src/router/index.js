import { createRouter, createWebHashHistory } from "vue-router";
import UserDashboard from "@/views/Dashboard/UserDashboard.vue";
import { useAuthStore } from "@/stores/auth";
<<<<<<< HEAD
import { kepegawaian } from "./kepegawaian";
import { all } from "./all";
=======
>>>>>>> 1795eef (ok)

const routes = [
  {
    meta: {
<<<<<<< HEAD
=======
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
>>>>>>> 1795eef (ok)
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
<<<<<<< HEAD
=======
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
>>>>>>> 1795eef (ok)
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
<<<<<<< HEAD
=======
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1795eef (ok)
=======
      title: "Tambah Pegawai",
=======
      title: "Tambah Data Pegawai",
>>>>>>> 68b1049 (seep)
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/new",
    name: "new-pegawai",
    component: () => import("@/views/Kepegawaian/NewPegawai.vue"),
  },
  {
    meta: {
      title: "Edit Data Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/:id/edit",
    name: "edit-pegawai",
    component: () => import("@/views/Kepegawaian/EditDataPegawai.vue"),
  },
  {
    meta: {
      title: "Pensiun Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pensiun/list",
    name: "list-pensiun-pegawai",
    component: () => import("@/views/Kepegawaian/DataPensiunPegawai.vue"),
  },
  {
    meta: {
      title: "Pensiun Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pensiun/new",
    name: "new-pensiun-pegawai",
    component: () => import("@/views/Kepegawaian/NewPensiunPegawai.vue"),
  },
  {
    meta: {
      title: "Pengembangan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pengembangan/list",
    name: "list-pengembangan-pegawai",
    component: () => import("@/views/Kepegawaian/DataPengembanganPengawai.vue"),
  },
  {
    meta: {
      title: "Pengembangan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pengembangan/new",
    name: "new-pengembangan-pegawai",
    component: () => import("@/views/Kepegawaian/NewPengembanganPengawai.vue"),
  },
  {
    meta: {
      title: "Edit Data Pengembangan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pengembangan/:id/edit",
    name: "edit-pengembangan-pegawai",
    component: () => import("@/views/Kepegawaian/EditPengembanganPegawai.vue"),
  },
  {
    meta: {
      title: "Mutasi Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/mutasi/list",
    name: "list-mutasi-pegawai",
    component: () => import("@/views/Kepegawaian/DataMutasiPegawai.vue"),
  },
  {
    meta: {
      title: "Mutasi Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/mutasi/new",
    name: "new-mutasi-pegawai",
    component: () => import("@/views/Kepegawaian/NewMutasiPegawai.vue"),
  },
  {
    meta: {
      title: "Pengembangan Pegawai",
      layout: "layout-authenticated",
      requiresAuth: false,
    },
    path: "/pegawai/pengembangan",
    name: "pengembangan-pegawai",
    component: () => import("@/views/Kepegawaian/PengembanganPegawai.vue"),
  },
  {
    meta: {
>>>>>>> 7a8945a (ok)
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
<<<<<<< HEAD
=======

>>>>>>> 1795eef (ok)
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
<<<<<<< HEAD
  ...kepegawaian,
  ...all,
=======
>>>>>>> 1795eef (ok)
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
