/* eslint-disable no-unused-vars */
import { defineStore, getActivePinia } from "pinia";
import axiosIns from "@/services/axios";
import { useAuthStore } from "../auth";
import { useToast } from "vue-toastification";
const toast = useToast();
const authStore = useAuthStore();
export const usePengembanganStore = defineStore("pengembangan", {
  state: () => ({
    responses: null,
    singleResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    userData: null,
    form: {
      kegiatan: "",
      waktu: {
        startDate: "",
        endDate: "",
      },
      tempat: "",
      list: [],
      created_by: authStore.user.user.id,
    },
    filter: {
      date: [],
      searchQuery: "",
    },
<<<<<<< HEAD
    currentLimit: 5,
=======
    currentLimit: { id: 5, label: "5" },
>>>>>>> 68b1049 (seep)
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
    },
  },
  actions: {
    async getData(page = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(
<<<<<<< HEAD
          `/pengembangan?limit=${this.currentLimit}${this.searchQuery}${page}${this.dateQuery}`
=======
          `/pengembangan?limit=${this.currentLimit.id}${this.searchQuery}${page}${this.dateQuery}`
>>>>>>> 68b1049 (seep)
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
        const response = await axiosIns.post(`/pengembangan`, this.form);
        if (response.status == 200) {
          toast.success("Data berhasil dibuat", {
            timeout: 3000,
          });
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.info(error);
        toast.error(error.response.data.data, {
          timeout: 3000,
        });
      } finally {
        this.isStoreLoading = false;
      }
    },
    async showData(id = "") {
      this.isLoading = true;
      try {
        const response = await axiosIns.get(`/pengembangan/${id}`);
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data));
        this.originalSingleResponses = JSON.parse(
          JSON.stringify(response.data.data)
        );
      } catch (error) {
        toast.error("Data not found", {
          position: "bottom-right",
        });
      }
      this.isLoading = false;
    },
    async destroy(id) {
      this.isDestroyLoading = true;
      setTimeout(() => {}, 500);
      try {
        await axiosIns.delete(`/pengembangan/${id}`);
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
    async update() {
      this.isUpdateLoading = true;
      try {
        const response = await axiosIns.put(
          `/pengembangan/${this.singleResponses.id}`,
          this.singleResponses
        );
        if (response.status == 200) {
          toast.success(response.data.message, {
            timeout: 2000,
          });
          this.originalSingleResponses = JSON.parse(
            JSON.stringify(response.data.data)
          );
          return true;
        } else {
          return false;
        }
      } catch (error) {
        toast.error(error.message, {
          timeout: 2000,
        });
      } finally {
        this.isUpdateLoading = false;
      }
    },
    addFormDataEdit(payload) {
      const b = this.singleResponses.list.filter((x) => x.id == payload.id);
      if (b.length > 0) {
        toast.info(`Data sudah ada`, {
          timeout: 1200,
        });
      } else {
        this.singleResponses.list.push(payload);
      }
    },
    addFormData(payload) {
      const b = this.form.list.filter((x) => x.id == payload.id);
      if (b.length > 0) {
        toast.info(`Data sudah ada`, {
          timeout: 1200,
        });
      } else {
        this.form.list.push(payload);
      }
    },
    editReset() {
      this.singleResponses = JSON.parse(
        JSON.stringify(this.originalSingleResponses)
      );
    },
  },
});
