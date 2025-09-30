import { defineStore } from 'pinia';
import Toastify from 'toastify-js';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] // Array of cart items
  }),
  actions: {
    addToCart(item) {
  


      const existing = this.items.find(i => i.id === item.id);
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
        this.items.push({ ...item, quantity: 1 });
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
   
    

      const item = this.items.find(i => i.id === id);
      if (item) {
        this.items = this.items.filter(i => i.id !== id);
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
      this.items = [];
    }
  },
  persist: true
});
