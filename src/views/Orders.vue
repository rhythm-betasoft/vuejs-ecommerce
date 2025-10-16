<template>
  <v-container class="py-10">
    <h1 class="text-h4 mb-6">My Orders</h1>

    <v-row>
      <v-col cols="12" v-for="order in userOrders" :key="order.id">
        <div class="border pa-6 mb-6">
          <div class="d-flex justify-space-between mb-2">
            <strong>Order ID:</strong> <span>{{ order.id }}</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <strong>Date:</strong> <span>{{ order.date }}</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <strong>Shipping Address:</strong> <span>{{ order.address || 'N/A' }}</span>
          </div>
          <div class="d-flex justify-space-between mb-4">
            <strong>Total:</strong> <span>${{ order.total.toFixed(2) }}</span>
          </div>

          <table class="w-100 border">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.quantity }}</td>
                <td>${{ item.price.toFixed(2) }}</td>
                <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useOrderStore } from '../store/orderStore'
import { authStore } from '../store/authStore'

export default {
  computed: {
    userOrders() {
      const userId = authStore().user?.id;
      return useOrderStore().orders[userId] || [];
    }
  }
}
</script>

<style scoped>
.border {
  border: 1px solid #e6e6e6;
}
th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}
th {
  background: #f9f9f9;
  font-weight: 600;
}
.pa-6 {
  padding: 24px;
}
</style>
