<script setup>
import SectionMain from "@/components/SectionMain.vue";

import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { useRoute, useRouter } from "vue-router";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import { computed, onMounted } from "vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useDebounceFn } from "@vueuse/core";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  EllipsisVerticalIcon,
  DocumentTextIcon,
  TrashIcon,
  ArchiveBoxIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";
import { useMainStore } from "@/stores/main";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import NotificationBar from "@/components/NotificationBar.vue";

const search = useDebounceFn(() => {
  pegawaiStore.getData();
}, 500);
const route = useRoute();
const router = useRouter();
const pegawaiStore = usePegawaiStore();
const mainStore = useMainStore();

const itemMenu = [
  {
    function: () => {},
    label: "Detail",
    icon: DocumentTextIcon,
  },
  {
    function: () => {},
    label: "Archive",
    icon: ArchiveBoxIcon,
  },
  {
    function: destroy,
    label: "Hapus",
    icon: TrashIcon,
  },
];

const previousPage = computed(() => {
  return "&page=" + (pegawaiStore.currentPage - 1);
});

const nextPage = computed(() => {
  return "&page=" + (pegawaiStore.currentPage + 1);
});

function toNewPegawai() {
  router.push({ name: "new-pegawai" });
}

function destroy(item) {
  pegawaiStore.destroy(item.id);
}

pegawaiStore.$subscribe((mutation, state) => {
  if (mutation.events.key == "currentLimit") {
    pegawaiStore.getData();
  }
});

onMounted(() => {
  pegawaiStore.getData();
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />

    <CardBox class="mb-4 px-4" has-table>
      <div class="w-full my-4 flex flex-row space-x-4">
        <div class="w-3/12">
          <FormField label="Show">
            <FormControl
              v-model="pegawaiStore.currentLimit"
              :options="mainStore.limitDataOptions"
            />
          </FormField>
        </div>
        <div class="w-6/12">
          <FormField label="Search">
            <FormControl
              @keyup="search"
              v-model="pegawaiStore.searchName"
              type="tel"
              placeholder="Cari berdasarkan nama / nip"
            />
          </FormField>
        </div>
        <div class="w-3/12 flex justify-end">
          <BaseButton
            @click="toNewPegawai()"
            class="mt-8"
            type="submit"
            color="info"
            label="Tambah"
          />
        </div>
      </div>
    </CardBox>

    <NotificationBar
      v-if="pegawaiStore.isDestroyLoading"
      color="info"
      :icon="mdiTableOff"
    >
      <span class="flex flex-row items-center">
        <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
        Deleting data on progress</span
      >
    </NotificationBar>

    <CardBox class="mb-6" has-table>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>NIP</th>
            <th>Name</th>
            <th>Jenis Kelamin</th>
            <th>Pangkat</th>
            <th>Jabatan</th>
            <th>Unit</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-if="pegawaiStore.isLoading">
            <td colspan="8" class="text-center">
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
          <tr v-else v-for="(item, index) in pegawaiStore.items" :key="item.id">
            <td>
              {{ pegawaiStore.from + index }}
            </td>
            <td>
              {{ item.nip }}
            </td>
            <td>
              {{ item.name.toUpperCase() ?? "" }}
            </td>
            <td>
              {{ item.gender.toUpperCase() ?? "" }}
            </td>
            <td>
              {{ item.pangkat.pangkat.toUpperCase() ?? "" }}
            </td>
            <td>
              {{ item.jabatan.name.toUpperCase() ?? "" }}
            </td>
            <td>
              {{ item.unit.name.toUpperCase() ?? "" }}
            </td>

            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <div>
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white"
                    >
                      <EllipsisVerticalIcon
                        class="h-5 w-5 text-black dark:text-white"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                    >
                      <div class="px-2 py-1">
                        <MenuItem v-for="menu in itemMenu" v-slot="{ active }">
                          <button
                            @click="menu.function(item)"
                            :class="[
                              active
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-900 dark:text-white',
                              'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                          >
                            <component :is="menu.icon" class="w-5 h-5 mr-3" />
                            {{ menu.label }}
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 flex justify-end"
      >
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="
                pegawaiStore.currentPage == 1
                  ? ''
                  : pegawaiStore.getData(previousPage)
              "
              :disabled="pegawaiStore.currentPage == 1 ? true : false"
              :class="
                pegawaiStore.currentPage == 1
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Previous</a
            >
          </li>

          <li>
            <a
              @click="
                pegawaiStore.lastPage == pegawaiStore.currentPage
                  ? ''
                  : pegawaiStore.getData(nextPage)
              "
              :class="
                pegawaiStore.lastPage == pegawaiStore.currentPage
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Next {{
            }}</a>
          </li>
        </ul>
      </div>
    </CardBox>
  </SectionMain>
</template>
@/stores/pegawai/pegawai
