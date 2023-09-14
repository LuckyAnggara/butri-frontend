<script setup>
import { computed, onMounted, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import NotificationBar from "@/components/NotificationBar.vue";
import { ArrowPathIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { usePengembanganStore } from "@/stores/pegawai/pengembangan";
import { useDebounceFn } from "@vueuse/core";
import Select2 from "@/components/Select2.vue";

const route = useRoute();
const router = useRouter();

const pegawaiStore = usePegawaiStore();
const pengembanganStore = usePengembanganStore();

const search = ref("");

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  if (
    pengembanganStore.singleResponses.list.length > 0 &&
    (pengembanganStore.singleResponses.kegiatan ||
      pengembanganStore.singleResponses.tempat ||
      pengembanganStore.singleResponses.waktu.startDate ||
      pengembanganStore.singleResponses.waktu.endDate)
  ) {
    const result = await pengembanganStore.update();
  } else {
    toast.error("Data belum lengkap", { timeout: 2000 });
    return false;
  }
}

function handleChosen(payload) {
  pengembanganStore.addFormDataEdit(payload);
}
function destroy(index) {
  pengembanganStore.singleResponses.list.splice(index, 1);
}

const find = useDebounceFn((x) => {
  pegawaiStore.searchName = search.value;
  pegawaiStore.getData();
}, 500);

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  await pengembanganStore.showData(id.value);
  if (pegawaiStore.items.length <= 0) {
    pegawaiStore.getData();
  }
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <NotificationBar
      v-if="pengembanganStore.singleResponses == null"
      color="info"
    >
      <span class="flex flex-row items-center">
        <ArrowPathIcon class="h-6 w-6 animate-spin mr-3" />
        Fetching data ... please wait ...</span
      >
    </NotificationBar>
    <template v-else>
      <div class="flex space-x-2">
        <CardBox class="w-full">
          <div class="relative mb-6">
            <label class="block font-bold mb-2">Cari Pegawai</label>
            <Select2
              :disabled="pengembanganStore.isUpdateLoading"
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

          <FormField label="Nama Kegiatan">
            <FormControl
              :disabled="pengembanganStore.isUpdateLoading"
              v-model="pengembanganStore.singleResponses.kegiatan"
              required
            />
          </FormField>

          <FormField label="Tempat Pelaksanaan">
            <FormControl
              :disabled="pengembanganStore.isUpdateLoading"
              v-model="pengembanganStore.singleResponses.tempat"
              required
            />
          </FormField>

          <FormField label="Jumlah Peserta">
            <input
              :disabled="true"
              :value="pengembanganStore.singleResponses.list.length"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>

          <FormField label="Tanggal Kegiatan">
            <vue-tailwind-datepicker
              :disabled="pengembanganStore.isUpdateLoading"
              required
              placeholder="Mulai sampai dengan berakhir"
              v-model="pengembanganStore.singleResponses.waktu"
              :formatter="formatter"
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>

          <FormField label="Catatan">
            <FormControl
              :type="'textarea'"
              :disabled="pengembanganStore.isUpdateLoading"
              v-model="pengembanganStore.singleResponses.notes"
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
              <tr v-if="pengembanganStore.singleResponses.list.length == 0">
                <td colspan="4" class="text-center">
                  <span>Belum ada data</span>
                </td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in pengembanganStore.singleResponses.list"
                :key="item.id"
              >
                <td class="text-center">
                  {{ index + 1 }}
                </td>

                <td>
                  {{
                    item.pegawai?.name.toUpperCase() ?? item.name.toUpperCase()
                  }}
                </td>

                <td class="before:hidden lg:w-1 whitespace-nowrap">
                  <TrashIcon
                    @click="
                      !pengembanganStore.isUpdateLoading ? destroy(index) : ''
                    "
                    class="w-5 h-5 hover:scale-105 duration-300 ease-in-out cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </CardBox>
      </div>
      <CardBox class="mt-2">
        <div class="flex justify-start space-x-3 items-center">
          <BaseButton
            class="w-fit"
            :disabled="pengembanganStore.isUpdateLoading"
            @click="submit"
            color="info"
            ><span v-if="!pengembanganStore.isUpdateLoading">Update</span
            ><span class="flex flex-row items-center px-3" v-else>
              <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
              Processing</span
            ></BaseButton
          >
          <BaseButton
            :disabled="pengembanganStore.isUpdateLoading"
            @click="pengembanganStore.editReset()"
            color="info"
            outline
            label="Reset"
          />

          <BaseButton
            :disabled="pengembanganStore.isUpdateLoading"
            @click="router.push({ name: 'list-pengembangan-pegawai' })"
            color="success"
            outline
            label="Kembali"
          />
        </div>
      </CardBox>
    </template>
  </SectionMain>
</template>
