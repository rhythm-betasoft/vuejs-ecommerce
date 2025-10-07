<template>
  <v-container>
    <h1 class="text-center">🛒 Your Cart</h1>
    <v-row v-if="cartItems.length > 0" class="mt-5">
      <v-col cols="12">
        <v-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Image</th>
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
                  <v-img :src="item.image" max-width="100px" max-height="100px" />
                </td>
                <td>{{ item.title }}</td>
                <td>${{ item.price.toFixed(2) }}</td>
                <td>
                  <v-text-field v-model="item.quantity" type="number" min="1" dense @input="updateCart(item)"
                    style="width: 80px;" />


                </td>
                <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                <td>
                  <v-btn icon @click="remove(item.id)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p class="text-center text-h6">Your cart is empty 🛍️</p>
      </v-col>
    </v-row>


    <v-row class="mt-5">
      <v-col cols="12" md="6">

        <v-row>
          <v-col>Total</v-col>
          <v-col class="text-right">${{ total.toFixed(2) }}</v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="cartItems.length > 0" class="mt-5">
      <v-col cols="12" class="text-center">
        <v-btn color="cyan  " :to="{ path: '/Billing' }" class="mt-5">
          Proceed to Checkout
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
    },
    updateCart(item) {
      const cart = useCartStore();
      cart.updateItemQuantity(item.id, item.quantity);
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
