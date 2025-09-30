import { defineStore } from 'pinia';
import Toastify from 'toastify-js';
import { authStore } from './authStore';
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: {} // Array of cart items
  }),
  actions: {
    addToCart(item) {

      const auth = authStore()
      const userId = auth.user?.id

      if (auth.loggedin && !this.items[userId]) {
        this.items[userId] = []
      }
      const existing = this.items[userId].find(i => i.id === item.id);
      if (existing) {
        existing.quantity++;
        Toastify({
          text: `${item.title} quantity updated!`,
          duration: 2000,
          close: true,
          gravity: 'top',
          position: 'right',
          style: { background: '#4caf50' }
        }).showToast();
      } else {
        this.items[userId].push({ ...item, quantity: 1 });
        Toastify({
          text: `${item.title} added to cart!`,
          duration: 2000,
          close: true,
          gravity: 'top',
          position: 'right',
          style: { background: '#4caf50' }
        }).showToast();
      }
    },
    removeFromCart(id) {
      const item = this.items[userId].find(i => i.id === id);
      if (item) {
        this.items[userId] = this.items[userId].filter(i => i.id !== id);
        Toastify({
          text: `${item.title} removed from cart!`,
          duration: 2000,
          close: true,
          gravity: 'top',
          position: 'right',
          style: { background: '#f44336' }
        }).showToast();
      }
    },
    clearCart() {
      this.items[userId] = [];
    }
  },
  persist: true
});
