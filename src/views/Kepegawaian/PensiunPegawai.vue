<script setup>
import { onMounted, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import Select2 from "@/components/Select2.vue";
import { useDebounceFn } from "@vueuse/core";
import { usePensiunStore } from "@/stores/pegawai/pensiun";
import { ArrowPathIcon, TrashIcon } from "@heroicons/vue/24/outline";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";

const route = useRoute();
const router = useRouter();

const pegawaiStore = usePegawaiStore();
const pensiunStore = usePensiunStore();

const search = ref("");

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  const result = await pegawaiStore.store();
  if (result) {
    router.push({ name: "list-pegawai" });
  }
}

function handleChosen(payload) {
  pensiunStore.addFormData(payload);
}
function destroy(index) {
  pensiunStore.form.list.splice(index, 1);
}

const find = useDebounceFn((x) => {
  pegawaiStore.searchName = search.value;
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
        <div class="relative mb-6">
          <label class="block font-bold mb-2">Cari Pegawai</label>
          <Select2
            :use-SSR="true"
            @ssr="find"
            :is-loading="pegawaiStore.isLoading"
            :use-loader="true"
            :data="pegawaiStore.items"
            v-model="search"
            placeholder="Cari data pegawai .."
            @chosen="handleChosen"
          ></Select2>
        </div>

        <FormField label="Surat Keputusan">
          <FormControl
            :type="'textarea'"
            :disabled="pensiunStore.isStoreLoading"
            v-model="pensiunStore.form.sk"
            required
          />
        </FormField>

        <FormField label="Tanggal Keputusan">
          <vue-tailwind-datepicker
            :disabled="pensiunStore.isStoreLoading"
            required
            v-model="pensiunStore.form.date"
            :formatter="formatter"
            as-single
            input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
          />
        </FormField>

        <FormField label="Catatan">
          <FormControl
            :type="'textarea'"
            :disabled="pensiunStore.isStoreLoading"
            v-model="pensiunStore.form.notes"
          />
        </FormField>
      </CardBox>
      <CardBox class="w-full" has-table>
        <h1 class="p-6 block font-bold mb-2">Daftar Pegawai</h1>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="pensiunStore.form.list.length == 0">
              <td colspan="4" class="text-center">
                <span>Belum ada data</span>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in pensiunStore.form.list"
              :key="item.id"
            >
              <td class="text-center">
                {{ index + 1 }}
              </td>

              <td>
                {{ item.name.toUpperCase() ?? "" }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <TrashIcon
                  @click="destroy(index)"
                  class="w-5 h-5 hover:scale-105 duration-300 ease-in-out cursor-pointer"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CardBox>
    </div>
    <CardBox class="mt-2 flex flex-row">
      <BaseButton
        :disabled="pegawaiStore.isStoreLoading"
        @click="submit"
        color="info"
        ><span v-if="!pegawaiStore.isStoreLoading">Submit</span
        ><span class="flex flex-row items-center" v-else>
          <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
          Processing</span
        ></BaseButton
      >
    </CardBox>
  </SectionMain>
</template>
