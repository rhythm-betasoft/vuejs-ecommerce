import { defineStore } from 'pinia';
import Toastify from 'toastify-js';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(item) {
      const existing = this.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
        console.log(`${item.title} quantity updated`, existing); 
      } else {
        this.items.push({ ...item, quantity: 1 });
        Toastify({
          text: `${item.title} added to the cart!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#4caf50", 
        }).showToast();
      }
    },
    removeFromCart(itemId) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        this.items = this.items.filter(i => i.id !== itemId);
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
    clearCart() {
      this.items = [];
    }
  },
  persist: true
});
