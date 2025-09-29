import { defineStore } from 'pinia';
import Toastify from 'toastify-js';
export const favStore = defineStore('fav', {
  state: () => ({
    arr: []
  }),
  actions: {
    addToFav(item) {
      const existing = this.arr.find(i => i.id === item.id);
      if (!existing) {
        this.arr.push({ ...item });
          Toastify({
                  text: `${item.title} added to the Favourites!`,
                  duration: 3000,
                  close: true,
                  gravity: "top",
                  position: "right",
                  backgroundColor: "#4caf50", 
                }).showToast();
      }
    },
    remove(itemId) {
      this.arr = this.arr.filter(i => i.id !== itemId);
      Toastify({
                text: `${item.title} removed from the cart.`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336",
              }).showToast();
    }
  },
  persist: true 
});