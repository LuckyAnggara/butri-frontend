/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";

export const usePegawaiStore = defineStore("pegawai", {
  state: () => ({
    responses: null,
    isLoading: false,
    userData: null,
    searchName: "",
    currentLimit: { id: 5, label: "5" },
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? [];
    },
    currentPage(state) {
      return state.responses?.current_page;
    },
    pageLength(state) {
      return Math.round(state.responses?.total / state.responses?.per_page);
    },
    lastPage(state) {
      return state.responses?.last_page;
    },
    from(state) {
      return state.responses?.from;
    },
    to(state) {
      return state.responses?.to;
    },
    total(state) {
      return state.responses?.total;
    },
    searchQuery(state) {
      if (state.searchName == "" || state.searchName == null) {
        return "";
      }
      return "&name=" + state.searchName;
    },
  },
  actions: {
    async getData() {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/employee?limit=${this.currentLimit.id}${this.searchQuery}`
        );

        this.responses = response.data.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
  },
});
