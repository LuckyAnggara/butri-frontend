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
<<<<<<< HEAD
      nomor_sk: "",
      tentang: "",
=======
      sk: "",
>>>>>>> b48c708 (ok)
      notes: "",
      date: "",
      list: [],
      created_by: authStore.user.user.id,
    },
<<<<<<< HEAD
    filter: {
      date: [],
      searchQuery: "",
    },
    currentLimit: 5,
=======
    searchName: "",
    currentLimit: { id: 5, label: "5" },
>>>>>>> b48c708 (ok)
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
<<<<<<< HEAD
    dateQuery(state) {
      if (state.filter.date.length == 0 || state.filter.date.length == null) {
        return "";
      }
      return (
        "&start-date=" +
        state.filter.date[0] +
        "&end-date=" +
        state.filter.date[1]
      );
    },
    searchQuery(state) {
      if (state.filter.searchQuery == "" || state.filter.searchQuery == null) {
        return "";
      }
      return "&query=" + state.filter.searchQuery;
=======
    searchQuery(state) {
      if (state.searchName == "" || state.searchName == null) {
        return "";
      }
      return "&name=" + state.searchName;
>>>>>>> b48c708 (ok)
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
<<<<<<< HEAD
          `/pensiun?limit=${this.currentLimit}${this.searchQuery}${page}${this.dateQuery}`
=======
          `/employee?limit=${this.currentLimit.id}${this.searchQuery}${page}`
>>>>>>> b48c708 (ok)
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
<<<<<<< HEAD
        const response = await axiosIns.post(`/pensiun`, this.form);
        if (response.status == 200) {
          toast.success("Data berhasil dibuat", {
=======
        const response = await axiosIns.post(`/employee`, this.newPegawai);
        if (response.status == 200) {
          toast.success(response.message, {
>>>>>>> b48c708 (ok)
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
<<<<<<< HEAD
    async destroy(id) {
      this.isDestroyLoading = true;
      setTimeout(() => {}, 500);
      try {
        await axiosIns.delete(`/pensiun/${id}`);
        toast.success("Data berhasil di hapus", {
          timeout: 2000,
        });
        const index = this.items.findIndex((item) => item.id === id);
        this.responses.data.splice(index, 1);
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        });
      } finally {
        this.isDestroyLoading = false;
      }
    },
    addFormData(payload) {
      const b = this.form.list.filter((x) => x.id == payload.id);
=======
    addFormData(payload) {
      const b = this.form.list.filter((x) => x.id == payload.id);
      console.info(b);
>>>>>>> b48c708 (ok)
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
