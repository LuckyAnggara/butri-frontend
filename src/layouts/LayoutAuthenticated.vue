<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
<<<<<<< HEAD
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
=======
import { ref } from "vue";
import { useRouter } from "vue-router";
import menuAside from "@/menuAside.js";
>>>>>>> 1795eef (ok)
import menuNavBar from "@/menuNavBar.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import { useAuthStore } from "@/stores/auth";
<<<<<<< HEAD
import kepegawaian from "@/router/menu/kepegawaian";
import sip from "@/router/menu/sip";
import umum from "@/router/menu/umum";
import program from "@/router/menu/program";
import keuangan from "@/router/menu/keuangan";
import wilayah from "@/router/menu/wilayah";
=======
>>>>>>> 1795eef (ok)

// useMainStore().setUser({
//   name: "John Doe",
//   email: "john@example.com",
//   avatar:
//     "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93",
// });

const layoutAsidePadding = "xl:pl-60";

const styleStore = useStyleStore();

const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);
const authStore = useAuthStore();

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});
const menuClick = async (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    const success = await authStore.logout();
    if (success) {
      router.push({ name: "login" });
    }
  }
};
<<<<<<< HEAD
const menu = computed(() => {
  if (authStore.user.user?.role.name == "kepegawaian") return kepegawaian;
  if (authStore.user.user?.role.name == "program dan pelaporan") return program;
  if (authStore.user.user?.role.name == "humas dan sip") return sip;
  if (authStore.user.user?.role.name == "umum") return umum;
  if (authStore.user.user?.role.name == "keuangan") return keuangan;
  if (authStore.user.user?.role.name == "inspektorat wilayah") return wilayah;
});
=======
>>>>>>> 1795eef (ok)
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
<<<<<<< HEAD
        :menu="menu"
=======
        :menu="menuAside"
>>>>>>> 1795eef (ok)
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <RouterView />
      <FooterBar> </FooterBar>
    </div>
  </div>
</template>
