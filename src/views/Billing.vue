<template>
  <v-container class="py-10">
    <h1 class="text-h4 mb-6">Billing</h1>

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
              <th></th>
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
                <div>
                  <div class="text-subtitle-1 font-weight-medium">{{ item.title }}</div>
                  <div class="text-body-2 text--secondary">{{ item.category }}</div>
                </div>
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
            <tr v-if="cartItems.length === 0">
              <td colspan="6" class="text-center py-8">Your cart is empty.</td>
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

          <div class="my-3">
            <div class="d-flex justify-space-between align-center">
              <h3>Shipping</h3>
              <v-btn color="primary" @click="toggle">Add address</v-btn>
            </div>

            <v-expand-transition>
              <div v-if="flag">
                <v-card class="mt-3 pa-4" elevation="2">
                  <v-text-field
                    v-model="address"
                    label="Enter Your Complete Address"
                    outlined
                    dense
                    prepend-inner-icon="mdi-map-marker"
                  />
                  <v-btn color="success" class="mt-2" @click="saveAddress">
                    Save address
                  </v-btn>
                </v-card>
              </div>
            </v-expand-transition>
          </div>

          <v-divider></v-divider>
          <div class="d-flex justify-space-between mt-4 mb-6 font-weight-medium">
            <span>Total</span><span>${{ total.toFixed(2) }}</span>
          </div>

          <div class="d-flex flex-column" style="gap:10px;">
            <v-btn block color="primary" class="white--text" @click="openAllLinks" :disabled="!hasAnyLink">
              Pay Now
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from '../store/cart'
import { authStore } from '../store/authStore'
import { useOrderStore } from '../store/orderStore'

export default {
  data() {
    return {
      stripeLinks: {
        1: 'https://buy.stripe.com/test_7sY00ld5gdk3cU76i0ebu03',
        2: 'https://buy.stripe.com/test_9B628taX83Jt5rFaygebu02',
        3: 'https://buy.stripe.com/test_6oU28taX83Jt3jxdKsebu04',
        4: 'https://buy.stripe.com/test_6oU6oJghs93N9HV9ucebu05',
        5: 'https://buy.stripe.com/test_bJebJ31my0xh2ft49Sebu06',
        6: 'https://buy.stripe.com/test_4gM7sNe9k1Bl5rFfSAebu07',
        7: 'https://buy.stripe.com/test_7sY5kF4yKdk3f2f0XGebu08',
        8: 'https://buy.stripe.com/test_4gM00l0iua7R1bpgWEebu09',
        9: 'https://buy.stripe.com/test_9B65kFaX80xh07l8q8ebu0a',
        10: 'https://buy.stripe.com/test_28E6oJfdo93N7zNbCkebu0b'
      },
      flag: false,
      address: ''
    }
  },
  computed: {
    cart() {
      return useCartStore()
    },
    auth() {
      return authStore()
    },
    userId() {
      return this.auth.user?.id
    },
    cartItems() {
      const uid = this.userId
      return uid && Array.isArray(this.cart.items[uid]) ? this.cart.items[uid] : []
    },
    total() {
      return this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    },
    hasAnyLink() {
      return this.cartItems.some(item => !!this.getStripeLink(item.id))
    }
  },
  methods: {
    getStripeLink(id) {
      return this.stripeLinks[id] || null
    },
    remove(id) {
      this.cart.removeFromCart(id)
    },
    increaseQty(i) {
      i.quantity++
      this.cart.calculateTotal()
    },
    decreaseQty(i) {
      if (i.quantity > 1) {
        i.quantity--
        this.cart.calculateTotal()
      }
    },
    openAllLinks() {
      if (!this.address.trim()) {
        alert('Please enter your shipping address before proceeding.')
        return
      }

      this.cartItems.forEach(item => {
        const link = this.getStripeLink(item.id)
        if (link) window.open(link, '_blank')
      })

      const orders = useOrderStore()
      orders.placeOrder(this.cartItems, this.total, this.address)

      this.cart.items[this.userId] = []
      this.cart.calculateTotal()
      this.address = ''
    },
    toggle() {
      this.flag = !this.flag
    },
    saveAddress() {
      this.flag = false
    }
  }
}
</script>

<style scoped>
.border {
  border: 1px solid #e6e6e6;
}
th, td {
  padding: 18px 20px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
  vertical-align: middle;
}
th {
  font-weight: 600;
  background: #f9f9f9;
}
.qty-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  width: 110px;
  justify-content: space-between;
  padding: 2px 6px;
}
.pa-6 {
  padding: 24px;
}
</style>
