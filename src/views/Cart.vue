<template>
  <v-container>
    <h1 class="text-center">🛒 Your Cart</h1>

    <v-row v-if="cartItems.length > 0">
      <v-col v-for="item in cartItems" :key="item.id" cols="12" sm="6" md="4">
        <v-card class="mx-auto" max-width="400" outlined>
          <v-img :src="item.image" height="200px"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>Price: ${{ item.price }}</v-card-subtitle>
          <v-card-text>
            Quantity: {{ item.quantity }} <br />
            Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" @click="remove(item.id)">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <p class="text-center text-h6">Your cart is empty 🛍️</p>
      </v-col>
    </v-row>

    <v-row v-if="cartItems.length > 0" class="mt-5">
      <v-col cols="12" class="text-center">
        <h3>Total Amount: ${{ total.toFixed(2) }}</h3>
        <v-btn color="success" class="mt-5" :to="{ path: '/Billing' }">
          Proceed To Check out
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>
  </v-container>
</template>

<script>
import { useCartStore } from '../store/cart.js';
import { authStore } from '../store/authStore';

export default {
  data() {
    return {
      cartItems: []
    };
  },
  created() {
    const auth = authStore();
    const cart = useCartStore();

    if (!auth.loggedin) {
      this.$router.push({ name: 'Login' });
    }
    const userId = auth.user?.id;
    if (userId && Array.isArray(cart.items[userId])) {
      this.cartItems = cart.items[userId];
    } else {
      this.cartItems = [];
    }
    console.log('Cart items on created:', this.cartItems);
  },
  methods: {
    remove(id) {
      const cart = useCartStore();
      const auth = authStore();
      const userId = auth.user?.id;

      cart.removeFromCart(id);

      if (userId && Array.isArray(cart.items[userId])) {
        this.cartItems = cart.items[userId];
      } else {
        this.cartItems = [];
      }
    }
  },
  computed: {
    total() {
      const cart = useCartStore();
      return cart.total;
    }
  }
};
</script>
