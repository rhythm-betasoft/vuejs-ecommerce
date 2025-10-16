<template>
  <v-container class="py-10">
    <h1 class="text-h4 mb-8">Cart</h1>
 
    <v-row>
      <v-col cols="12" md="8">
        <table class="w-100 border">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td>
                <v-btn icon variant="text" @click="remove(item.id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </td>
              <td class="d-flex align-center">
                <v-img :src="item.image" width="70" height="70" class="mr-3"></v-img>
                {{ item.title }}
              </td>
              <td>${{ item.price.toFixed(2) }}</td>
              <td>
                <div class="qty-box">
                  <v-btn icon variant="text" size="small" @click="decreaseQty(item)">-</v-btn>
                  <span>{{ item.quantity }}</span>
                  <v-btn icon variant="text" size="small" @click="increaseQty(item)">+</v-btn>
                </div>
              </td>
              <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
 
      <v-col cols="12" md="4">
        <div class="border pa-6">
          <h3 class="text-h6 mb-4 font-weight-medium">Cart totals</h3>
          <div class="d-flex justify-space-between mb-3">
            <span>Subtotal</span><span>${{ total.toFixed(2) }}</span>
          </div>
          <v-divider></v-divider>
     
          <v-divider></v-divider>
          <div class="d-flex justify-space-between mt-4 mb-6 font-weight-medium">
            <span>Total</span><span>${{ total.toFixed(2) }}</span>
          </div>
          <v-btn block :to="{path:'Billing'}" color="black" class="text-white py-4 text-uppercase">Proceed to Checkout</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import { useCartStore } from '../store/cart'
import { authStore } from '../store/authStore'
 
export default {
  data() {
    return { cartItems: [] }
  },
  created() {
    const auth = authStore(),
     cart = useCartStore()
    if (!auth.loggedin) this.$router.push({ name: 'Login' })
    const userId = auth.user?.id
    this.cartItems = userId && Array.isArray(cart.items[userId]) ? cart.items[userId] : []
  },
  computed: {
    total() {
      return this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    }
  },
  methods: {
    remove(id) {
      const cart = useCartStore()
      cart.removeFromCart(id)
      this.cartItems = this.cartItems.filter(i => i.id !== id)
    },
    increaseQty(i) { i.quantity++; },
    decreaseQty(i) { if (i.quantity > 1) { i.quantity--; } },
    
  }
}
</script>
 
<style scoped>
.border { border: 1px solid #e6e6e6; }
th, td { padding: 18px 20px; border-bottom: 1px solid #f0f0f0; text-align: left; }
th { font-weight: 600; background: #f9f9f9; }
.qty-box { display: flex; align-items: center; border: 1px solid #ccc; width: 110px; justify-content: space-between; padding: 2px 6px; }
.underline { text-decoration: underline; cursor: pointer; }
</style>