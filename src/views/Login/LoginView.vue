<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";

const router = useRouter();
const showPassword = ref(false);

const authStore = useAuthStore();

async function login() {
  const success = await authStore.login();
  console.info(success);
  if (success) {
    router.push({ name: "dashboard" });
  }
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Laporan Pengawasan
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                id="username"
                v-model="authStore.form.username"
                type="text"
                name="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <div class="relative">
                <input
                  id="password"
                  v-model="authStore.form.password"
                  :type="showPassword == true ? 'text' : 'password'"
                  name="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required=""
                />
                <span class="absolute right-2.5 bottom-2 text-gray-300">
                  <EyeSlashIcon
                    v-if="showPassword == true"
                    title="Hide Password"
                    class="cursor-pointer w-6 h-6"
                    @click="showPassword = false"
                  />
                  <EyeIcon
                    v-else
                    title="Show Password"
                    class="cursor-pointer w-6 h-6"
                    @click="showPassword = true"
                  />
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start"></div>
              <a
                href="#"
                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Lupa Password?</a
              >
            </div>
            <button
              :disabled="authStore.isLoading"
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span
                v-if="authStore.isLoading"
                class="flex flex-row w-full mx-auto"
              >
                <ArrowPathIcon class="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </span>
              <span v-else> Sign in </span>
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Belum punya akun? hubungi
              <a
                href="#"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Admin</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
