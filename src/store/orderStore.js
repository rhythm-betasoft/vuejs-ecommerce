import { defineStore } from 'pinia';
import { authStore } from './authStore';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: {}
  }),
  actions: {
    placeOrder(cartItems, total, address) {
      const userId = authStore().user?.id;
      if (!userId) return;

      const order = {
        id: Date.now(),
        items: [...cartItems],
        total,
        date: new Date().toLocaleString(),
        address: address || ''
      };

      this.orders[userId] = this.orders[userId] || [];
      this.orders[userId].push(order);
    }
  },
  persist: true
});
