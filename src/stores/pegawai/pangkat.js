/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import axiosIns from "@/services/axios";

export const usePangkatStore = defineStore("pangkat", {
  state: () => ({
    responses: null,
    isLoading: false,
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? [];
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/pangkat`);

        this.responses = response.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
  },
});
