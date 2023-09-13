/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { syncRef } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    /* User */
    form: {
      username: null,
      password: null,
    },
    isLoading: false,
    userData: null,
  }),
  actions: {
    async login() {
      this.isLoading = true;
      try {
        const response = await axiosIns.post(`/login`, {
          username: this.form.username,
          password: this.form.password,
        });
        const payload = response.data.data;
        localStorage.setItem("token", JSON.stringify(payload.token));
        localStorage.setItem("userDataLawas", JSON.stringify(payload));
        setTimeout(() => {}, 500);
        if (response.status == 200) {
          return true;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
    async logout() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/logout`);
        if (response.status == 200) {
          if (response.data == "error") {
            localStorage.clear();
          } else {
            localStorage.removeItem("userDataLawas");
            localStorage.removeItem("token");
          }
          const pinia = getActivePinia();
          // pinia._s.forEach((store) => store.$reset());
          return true;
        } else {
          return false;
        }
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false;
      }
    },
    isLoggedIn() {
      const user = localStorage.getItem("userDataLawas");
      if (user) {
        this.userData = JSON.parse(user);
        return true;
      }
      return false;
    },
  },
});
