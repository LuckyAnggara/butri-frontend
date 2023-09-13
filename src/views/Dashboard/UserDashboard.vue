<script setup>
import SectionMain from "@/components/SectionMain.vue";

import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
  </SectionMain>
</template>
