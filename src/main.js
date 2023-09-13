import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
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
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vClickOutside from "v-click-outside";

>>>>>>> 1795eef (ok)
import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
<<<<<<< HEAD
<<<<<<< HEAD
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

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

<<<<<<< HEAD
=======
/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

>>>>>>> 1795eef (ok)
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
const defaultDocumentTitle = "Laporan Pengawasan";
=======
const defaultDocumentTitle = "Admin One Vue 3 Tailwind";
>>>>>>> 1795eef (ok)

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
