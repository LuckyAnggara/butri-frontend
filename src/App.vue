<script setup>
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";

import LayoutGuest from "@/layouts/LayoutGuest.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === "layout-authenticated") return LayoutAuthenticated;
  return LayoutGuest;
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
  <!-- <RouterView /> -->
</template>
