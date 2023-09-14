<script setup>
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref } from "vue";

const emit = defineEmits(["update:modelValue", "ssr", "chosen"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
    default: "Enter text here.",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  useSSR: {
    type: Boolean,
    default: false,
  },
  useLoader: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    required: true,
  },
  inputClass: {
    type: String,
    required: false,
    default:
      "block w-full p-4 pl-10 h-12 border px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800",
  },
  dropdownClass: {
    type: String,
    required: false,
    default:
      "absolute z-50 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 bg-gray-100 shadow-lg dark:bg-slate-700",
  },
});

const showOptions = ref(false);
const chosenOption = ref("");
const searchTerm = ref("");

const searchResults = computed(() => {
  return props.data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

function reset() {
  emit("update:modelValue", "");
  showOptions.value = true;
}

async function handleInput(evt) {
  emit("update:modelValue", evt.target.value);
  if (props.useSSR == true) {
    emit("ssr", evt.target.value);
  } else {
    searchTerm.value = evt.target.value;
  }
  showOptions.value = true;
}

function handleClick(item) {
  // emit("update:modelValue", item.name);
  emit("chosen", item);
  // showOptions.value = false;
}

function clickedOutside() {
  showOptions.value = false;

  if (!chosenOption.value) {
    emit("input", "");
  }
}
</script>

<template>
  <section>
    <div class="relative" v-click-outside="clickedOutside">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <MagnifyingGlassIcon
          v-if="!isLoading"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
        <ArrowPathIcon
          v-else
          class="animate-spin w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </div>

      <input
        :disabled="disabled"
        :value="modelValue"
        :placeholder="placeholder"
        @input="handleInput"
        ref="input"
        tabindex="0"
        :class="inputClass"
      />

      <span
        v-if="modelValue"
        @click.prevent="reset()"
        class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
      >
        <XMarkIcon
          v-if="!isLoading"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </span>
    </div>

    <div>
      <div
        v-show="modelValue && showOptions"
        @click.self="handleSelf()"
        @focusout="showOptions = false"
        tabindex="0"
        :class="dropdownClass"
      >
        <ul class="py-1">
          <li
            v-for="(item, index) in searchResults"
            :key="index"
            @click="handleClick(item)"
            class="py-2 px-4 cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-600"
          >
            {{ item.name }}
          </li>
          <li v-if="!searchResults.length" class="px-3 py-2 text-center">
            No Matching Results
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mh-48 {
  max-height: 10rem;
}
</style>
