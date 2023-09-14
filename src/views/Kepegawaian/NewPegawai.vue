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

const route = useRoute();
const router = useRouter();

const pegawaiStore = usePegawaiStore();
const jabatanStore = useJabatanStore();
const pangkatStore = usePangkatStore();
const unitStore = useUnitStore();

const selectOptions = [
  { id: 1, label: "LAKI LAKI" },
  { id: 2, label: "PEREMPUAN" },
];
const formatter = ref({
  date: "DD MMMM YYYY",
});

async function submit() {
  const result = await pegawaiStore.store();
  if (result) {
    router.push({ name: "list-pegawai" });
  }
}

onMounted(() => {
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
    <CardBox>
      <form @submit.prevent="submit()">
        <div class="flex space-x-4">
          <FormField label="Nama Lengkap *" class="w-1/2">
            <FormControl
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.name"
              required
            />
          </FormField>
          <FormField label="NIP *" class="w-1/2">
            <FormControl
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.nip"
              required
            />
          </FormField>
        </div>

        <FormField label="Jenis Kelamin *" class="w-1/2">
          <FormControl
            :disabled="pegawaiStore.isStoreLoading"
            v-model="pegawaiStore.newPegawai.gender"
            :options="selectOptions"
          />
        </FormField>

        <div class="flex space-x-4">
          <FormField label="Email" class="w-1/2">
            <FormControl
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.email"
            />
          </FormField>
          <FormField label="Nomor HP / WA" class="w-1/2">
            <FormControl
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.phone_number"
            />
          </FormField>
        </div>

        <div class="flex space-x-4">
          <FormField label="Pangkat *" class="w-1/2">
            <select
              :disabled="pegawaiStore.isStoreLoading"
              required
              v-model="pegawaiStore.newPegawai.pangkat"
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
              :disabled="pegawaiStore.isStoreLoading"
              required
              v-model="pegawaiStore.newPegawai.tmt_pangkat"
              :formatter="formatter"
              as-single
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>
        </div>

        <div class="flex space-x-4">
          <FormField label="Jabatan *" class="w-1/2">
            <select
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.jabatan"
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
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.tmt_jabatan"
              :formatter="formatter"
              as-single
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>
        </div>

        <div class="flex space-x-4">
          <FormField label="Unit Kerja *" class="w-1/2">
            <select
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.unit"
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
              :disabled="pegawaiStore.isStoreLoading"
              v-model="pegawaiStore.newPegawai.tmt_pensiun"
              :formatter="formatter"
              as-single
              input-classes="h-12 border  px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800"
            />
          </FormField>
        </div>

        <BaseDivider />

        <div class="flex justify-start space-x-3 items-center">
          <BaseButton
            :disabled="pegawaiStore.isStoreLoading"
            type="submit"
            color="info"
            ><span v-if="!pegawaiStore.isStoreLoading">Submit</span
            ><span class="flex flex-row items-center" v-else>
              <ArrowPathIcon class="h-5 w-5 animate-spin mr-3" />
              Processing</span
            ></BaseButton
          >
          <BaseButton
            :disabled="pegawaiStore.isStoreLoading"
            type="reset"
            color="info"
            outline
            label="Reset"
          />
        </div>
      </form>
    </CardBox>
  </SectionMain>
</template>
