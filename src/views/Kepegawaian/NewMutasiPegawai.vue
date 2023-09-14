<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import Select2 from "@/components/Select2.vue";
import { useDebounceFn } from "@vueuse/core";
import { ArrowPathIcon, TrashIcon } from "@heroicons/vue/24/outline";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useToast } from "vue-toastification";
import { useMutasiStore } from "@/stores/pegawai/mutasi";
import { useJabatanStore } from "@/stores/pegawai/jabatan";
import { useUnitStore } from "@/stores/pegawai/unit";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const pegawaiStore = usePegawaiStore();
const jabatanStore = useJabatanStore();
const unitStore = useUnitStore();
const mutasiStore = useMutasiStore();

const search = ref("");

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  if (
    mutasiStore.form.list.length > 0 &&
    (mutasiStore.form.kegiatan ||
      mutasiStore.form.tempat ||
      mutasiStore.form.waktu.startDate ||
      mutasiStore.form.waktu.endDate)
  ) {
    const result = await mutasiStore.store();
    if (result) {
      router.push({ name: "list-pengembangan-pegawai" });
    }
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

function handleChosen(payload) {
  mutasiStore.addFormData(payload);
}
function destroy(index) {
  mutasiStore.form.list.splice(index, 1);
}

const find = useDebounceFn((x) => {
  pegawaiStore.searchName = search.value;
  pegawaiStore.getData();
}, 500);

onMounted(() => {
  if (pegawaiStore.items.length <= 0) {
    pegawaiStore.getData();
  }
  if (jabatanStore.items.length <= 0) {
    jabatanStore.getData();
  }

  if (unitStore.items.length <= 0) {
    unitStore.getData();
  }
});
onUnmounted(() => {
  mutasiStore.$reset();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <div class="flex space-x-2">
      <CardBox class="w-full">
        <FormField label="Nomor Surat Keputusan">
          <FormControl
            :disabled="mutasiStore.isStoreLoading"
            v-model="mutasiStore.form.kegiatan"
            required
          />
        </FormField>

        <FormField label="Catatan">
          <FormControl
            :disabled="mutasiStore.isStoreLoading"
            v-model="mutasiStore.form.tempat"
          />
        </FormField>

        <FormField label="Tmt Jabatan">
          <vue-tailwind-datepicker
            :disabled="mutasiStore.isStoreLoading"
            required
            placeholder="Mulai sampai dengan berakhir"
            v-model="mutasiStore.form.waktu"
            :formatter="formatter"
            input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
          />
        </FormField>

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

        <CardBox class="w-full" has-table>
          <h1 class="p-6 block font-bold mb-2">Daftar Pegawai</h1>
          <table>
            <thead>
              <tr>
                <td rowspan="2" class="text-center">No</td>
                <td rowspan="2" class="text-center">Nama</td>
                <td colspan="2" class="text-center">Jabatan</td>
                <td colspan="2" class="text-center">Unit</td>
                <td></td>
              </tr>
              <tr>
                <td>Baru</td>
                <td>Lama</td>
                <td>Baru</td>
                <td>Lama</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="mutasiStore.form.list.length == 0">
                <td colspan="7" class="text-center">
                  <span>Belum ada data</span>
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in mutasiStore.form.list"
                :key="item.id"
              >
                <td class="text-center">
                  {{ index + 1 }}
                </td>

                <td>
                  {{ item.name.toUpperCase() ?? "" }}
                </td>

                <td>
                  {{ item.jabatan.name }}
                </td>

                <td>
                  <select
                    :disabled="pegawaiStore.isStoreLoading"
                    required
                    v-model="pegawaiStore.newPegawai.pangkat"
                    class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                  >
                    <option
                      v-for="option in jabatanStore.items"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.name.toUpperCase() }}
                    </option>
                  </select>
                </td>

                <td>
                  {{ item.unit.name }}
                </td>

                <td>
                  <select
                    :disabled="pegawaiStore.isStoreLoading"
                    required
                    v-model="pegawaiStore.newPegawai.unit"
                    class="border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
                  >
                    <option
                      v-for="option in unitStore.items"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.name.toUpperCase() }}
                    </option>
                  </select>
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
      </CardBox>
    </div>
    <CardBox class="mt-2">
      <div class="flex flex-col space-y-4">
        <BaseButton
          class="w-fit"
          :disabled="mutasiStore.isStoreLoading"
          @click="submit"
          color="info"
          ><span v-if="!mutasiStore.isStoreLoading">Submit</span
          ><span class="flex flex-row items-center px-3" v-else>
            <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
            Processing</span
          ></BaseButton
        >
      </div>
    </CardBox>
  </SectionMain>
</template>
