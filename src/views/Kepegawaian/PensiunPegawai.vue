<script setup>
import { onMounted, reactive, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import { ArrowPathIcon, DocumentTextIcon } from "@heroicons/vue/24/outline";
import { useRoute, useRouter } from "vue-router";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useJabatanStore } from "@/stores/pegawai/jabatan";
import { usePangkatStore } from "@/stores/pegawai/pangkat";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import { useUnitStore } from "@/stores/pegawai/unit";
import Select2 from "@/components/Select2.vue";
import { useDebounceFn } from "@vueuse/core";

const route = useRoute();
const router = useRouter();

const pegawaiStore = usePegawaiStore();
const jabatanStore = useJabatanStore();
const pangkatStore = usePangkatStore();
const unitStore = useUnitStore();

const selectOptions = [
  { id: 1, name: "LAKI LAKI" },
  { id: 2, name: "PEREMPUAN" },
];
const formData = ref({
  client: "",
});

async function submit() {
  const result = await pegawaiStore.store();
  if (result) {
    router.push({ name: "list-pegawai" });
  }
}

function handleChosen(v) {
  console.info(v);
}

const find = useDebounceFn((x) => {
  pegawaiStore.searchName = formData.value.client;
  pegawaiStore.getData();
}, 500);

onMounted(() => {
  if (pegawaiStore.items.length <= 0) {
    pegawaiStore.getData();
  }
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <div>
          <Select2
            :use-SSR="true"
            @ssr="find"
            :is-loading="pegawaiStore.isLoading"
            :use-loader="true"
            :data="pegawaiStore.items"
            v-model="formData.client"
            placeholder="Cari data pegawai .."
            @chosen="handleChosen"
          ></Select2>
        </div>
      </CardBox>
      <CardBox class="w-full" has-table>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Unit</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-if="pegawaiStore.isLoading">
              <td colspan="4" class="text-center">
                <div
                  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                  >
                </div>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in pegawaiStore.items"
              :key="item.id"
            >
              <td>
                {{ pegawaiStore.from + index }}
              </td>

              <td>
                {{ item.name.toUpperCase() ?? "" }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap"></td>
            </tr>
          </tbody>
        </table>
      </CardBox>
    </div>
  </SectionMain>
</template>
