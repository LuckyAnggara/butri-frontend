/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const usePensiunStore = defineStore("pensiun", {
  state: () => ({
    responses: null,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    userData: null,
    form: {
      sk: "",
      notes: "",
      date: "",
      list: [],
      created_by: authStore.user.user.id,
    },
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
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
          `/employee?limit=${this.currentLimit.id}${this.searchQuery}${page}`
        );
        this.responses = response.data.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
      return false;
    },
    async store() {
      this.isStoreLoading = true;
      try {
        const response = await axiosIns.post(`/employee`, this.newPegawai);
        if (response.status == 200) {
          toast.success(response.message, {
            timeout: 3000,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        toast.error(error.response.data.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },
    addFormData(payload) {
      const b = this.form.list.filter((x) => x.id == payload.id);
      console.info(b);
      if (b.length > 0) {
        toast.info(`Data sudah ada`, {
          timeout: 1200,
        });
      } else {
        this.form.list.push(payload);
      }
    },
  },
});
