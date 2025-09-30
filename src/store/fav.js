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
        this.arr.push({ ...item, isFavorited: true });
        Toastify({text: `${item.title} added to the Favourites!`,duration: 3000,close: true,gravity: "top",position: "right",backgroundColor: "#4caf50",}).showToast();
      } 
      else {
        existing.isFavorited = true;
      }
    },
    remove(itemId) {
      const index = this.arr.findIndex(i => i.id === itemId);
      if (index !== -1) {
        const item = this.arr[index];
        item.isFavorited = false;
        Toastify({
          text: `${item.title} removed from the Favourites.`, duration: 3000,close: true,gravity: "top",position: "right",backgroundColor: "#f44336",
        }).showToast();
      }
      this.arr = this.arr.filter(i => i.id !== itemId);
    }
  },
  persist: true
});
