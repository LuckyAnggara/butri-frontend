import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
<<<<<<< HEAD
<<<<<<< HEAD

import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vClickOutside from "v-click-outside";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import moment from "moment";
=======
=======

>>>>>>> 68b1049 (seep)
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vClickOutside from "v-click-outside";
<<<<<<< HEAD

>>>>>>> 1795eef (ok)
=======
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import moment from "moment";
>>>>>>> 68b1049 (seep)
import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 68b1049 (seep)
const app = createApp(App);

app.config.globalProperties = {
  moment: moment,
};

app.use(router);
app.use(pinia);
app.use(vClickOutside);
app.use(VueTailwindDatepicker);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.mount("#app");
<<<<<<< HEAD
=======
createApp(App).use(router).use(pinia).mount("#app");
>>>>>>> 1795eef (ok)
=======
createApp(App)
  .use(router)
  .use(pinia)
  .use(vClickOutside)
  .use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
  })
  .mount("#app");
>>>>>>> 7a8945a (ok)
=======
>>>>>>> 68b1049 (seep)

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

<<<<<<< HEAD
<<<<<<< HEAD
=======
/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

>>>>>>> 1795eef (ok)
=======
>>>>>>> 68b1049 (seep)
/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
<<<<<<< HEAD
<<<<<<< HEAD
const defaultDocumentTitle = "Laporan Pengawasan";
=======
const defaultDocumentTitle = "Admin One Vue 3 Tailwind";
>>>>>>> 1795eef (ok)
=======
const defaultDocumentTitle = "Laporan Pengawasan";
>>>>>>> 68b1049 (seep)

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
