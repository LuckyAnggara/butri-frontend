<script setup>
import { computed, onMounted, ref } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useRoute, useRouter } from "vue-router";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useJabatanStore } from "@/stores/pegawai/jabatan";
import { usePangkatStore } from "@/stores/pegawai/pangkat";
import { usePegawaiStore } from "@/stores/pegawai/pegawai";
import { useUnitStore } from "@/stores/pegawai/unit";
import NotificationBar from "@/components/NotificationBar.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();

const pegawaiStore = usePegawaiStore();
const jabatanStore = useJabatanStore();
const pangkatStore = usePangkatStore();
const unitStore = useUnitStore();

const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  const result = await pegawaiStore.update();
}

const id = computed(() => {
  return route.params.id ?? null;
});

onMounted(async () => {
  await pegawaiStore.showData(id.value);
  if (jabatanStore.items.length <= 0) {
    jabatanStore.getData();
  }
  if (pangkatStore.items.length <= 0) {
    pangkatStore.getData();
  }
  if (unitStore.items.length <= 0) {
    unitStore.getData();
  }
});
</script>

<template>
  <SectionMain>
    <SectionTitleLineWithButton :title="route.meta.title" main />
    <template v-if="pegawaiStore.singleResponses == null">
      <NotificationBar color="info">
        <span class="flex flex-row items-center">
          <ArrowPathIcon class="h-6 w-6 animate-spin mr-3" />
          Fetching data ... please wait ...</span
        >
      </NotificationBar>
    </template>
    <template v-else>
      <CardBox>
        <form @submit.prevent="submit()">
          <div class="flex space-x-4">
            <FormField label="Nama Lengkap *" class="w-1/2">
              <FormControl
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.name"
                required
              />
            </FormField>
            <FormField label="NIP *" class="w-1/2">
              <FormControl
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.nip"
                required
              />
            </FormField>
          </div>

          <FormField label="Jenis Kelamin *" class="w-1/2">
            <select
              :disabled="pegawaiStore.isUpdateLoading"
              required
              v-model="pegawaiStore.singleResponses.gender"
              class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            >
              <option value="LAKI LAKI">LAKI LAKI</option>
              <option value="PEREMPUAN">PEREMPUAN</option>
            </select>
          </FormField>

          <div class="flex space-x-4">
            <FormField label="Email" class="w-1/2">
              <FormControl
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.email"
              />
            </FormField>
            <FormField label="Nomor HP / WA" class="w-1/2">
              <FormControl
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.phone_number"
              />
            </FormField>
          </div>

          <div class="flex space-x-4">
            <FormField label="Pangkat *" class="w-1/2">
              <select
                :disabled="pegawaiStore.isUpdateLoading"
                required
                v-model="pegawaiStore.singleResponses.pangkat.id"
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in pangkatStore.items"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.pangkat.toUpperCase() }} -
                  {{ option.ruang.toUpperCase() }}
                </option>
              </select>
            </FormField>
            <FormField label="TMT Pangkat *" class="w-1/2">
              <vue-tailwind-datepicker
                :auto-apply="false"
                :disabled="pegawaiStore.isUpdateLoading"
                required
                v-model="pegawaiStore.singleResponses.tmt_pangkat"
                :formatter="{ date: 'DD MMMM YYYY' }"
                as-single
                input-classes="h-12 border px-3 py-2 max-w-full focus:ring
              focus:outline-none border-gray-700 rounded w-full
              dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              />
            </FormField>
          </div>

          <div class="flex space-x-4">
            <FormField label="Jabatan *" class="w-1/2">
              <select
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.jabatan_id"
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in jabatanStore.items"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </FormField>
            <FormField label="TMT Jabatan *" class="w-1/2">
              <vue-tailwind-datepicker
                required
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.tmt_jabatan"
                :formatter="formatter"
                as-single
                input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              />
            </FormField>
          </div>

          <div class="flex space-x-4">
            <FormField label="Unit Kerja *" class="w-1/2">
              <select
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.unit_id"
                class="h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              >
                <option
                  v-for="option in unitStore.items"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.name.toUpperCase() }}
                </option>
              </select>
            </FormField>
            <FormField label="TMT Pensiun *" class="w-1/2">
              <vue-tailwind-datepicker
                required
                :disabled="pegawaiStore.isUpdateLoading"
                v-model="pegawaiStore.singleResponses.tmt_pensiun"
                :formatter="formatter"
                as-single
                input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
              />
            </FormField>
          </div>

          <BaseDivider />

          <div class="flex justify-start space-x-3 items-center">
            <BaseButton
              :disabled="pegawaiStore.isUpdateLoading"
              type="submit"
              color="info"
              ><span v-if="!pegawaiStore.isUpdateLoading">Update</span
              ><span class="flex flex-row items-center" v-else>
                <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
                Processing</span
              ></BaseButton
            >
            <BaseButton
              :disabled="pegawaiStore.isUpdateLoading"
              @click="pegawaiStore.editReset()"
              color="info"
              outline
              label="Reset"
            />

            <BaseButton
              :disabled="pegawaiStore.isUpdateLoading"
              @click="router.push({ name: 'list-pegawai' })"
              color="success"
              outline
              label="Kembali"
            />
          </div>
        </form>
      </CardBox>
    </template>
  </SectionMain>
</template>
