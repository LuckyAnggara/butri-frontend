import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],

<<<<<<< HEAD
    limitDataOptions: [5, 50, 100, 100000],
    jenisKegiatanOptions: [
      "RAPAT INTERNAL",
      "RAPAT EKSTERNAL",
      "DINAS LUAR",
      "KOORDINASI",
      "KONSINYERING",
=======
    limitDataOptions: [
      { id: 5, label: "5" },
      { id: 50, label: "50" },
      { id: 100, label: "100" },
      { id: 100000, label: "Semua" },
>>>>>>> 1795eef (ok)
    ],
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },

    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
