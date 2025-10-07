<template>
  <v-main class="abc">
    <v-row class="mx-5">
      <v-col cols="12" md="7">
        <v-card elevation="8" class="pa-6 rounded-lg mt-5">
          <v-img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF48Xs6uxMxNnqf2fDEe52yIwEOrmUouGa5gp5hBdk1Fy7mm0EWQt3T5w&s"
            alt="Billing Image" height="280" class="mb-6 rounded-lg" contain />

          <div class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold mb-2">
              Your Total Amount is: <span class="text-primary">${{ total.toFixed(2) }}</span>
            </h1>
          </div>

          <div class="d-flex flex-column align-center mb-6">
          <v-text-field v-model="couponCode" label="Enter Coupon Code" outlined dense clearable class="mb-4"
            hide-details min-width="300px"></v-text-field>
            <v-card-actions>
           <v-btn
    color="primary"
    rounded
    class="mb-6"
    @click="applyCoupon"
    style="width: 130px; align-self: center;"
  >
    Apply Coupon
  </v-btn>
  </v-card-actions>
          </div>
            <div v-if="discount > 0" class="discount-info mb-6 text-center">
              <p class="text-subtitle-1 mb-1">
                Discount Applied: <span class="text-success">- ${{ discount.toFixed(2) }}</span>
              </p>
              <p class="text-h5 font-weight-bold">
                Final Amount: <span class="text-primary">${{ finalAmount.toFixed(2) }}</span>
              </p>
            </div>
       

          <h4 class="mb-4 font-weight-medium">Choose Payment Method:</h4>

          <v-row dense>
            <v-col cols="12" md="6" class="mb-3">
              <v-btn block color="grey lighten-3" class="text-body-1 font-weight-medium" elevation="1" rounded>
                Cash On Delivery / UPI
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" class="mb-3">
              <v-btn block color="success" dark elevation="2" rounded>
                Credit Card <small class="ml-2 font-italic">[up to 30% OFF!]</small>
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" class="mb-3">
              <v-btn block color="grey lighten-3" class="text-body-1 font-weight-medium" elevation="1" rounded>
                Debit Card
              </v-btn>
            </v-col>

            <v-col cols="12" md="6" class="mb-3">
              <v-btn block color="success" dark elevation="2" rounded>
                Wallets / UPI <small class="ml-2 font-italic">[up to 15% OFF!]</small>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>


      <v-col cols="12" md="4" class="d-none d-md-flex flex-column" style="margin-left: 80px;">

        <div class="text-center mb-4">
          <h4 class="font-weight-bold">You May Also Like</h4>
        </div>

        <v-row dense>
          <v-col v-for="(product, index) in randomProducts.slice(0, 5)" :key="index" cols="12">
            <v-card class="pa-3" elevation="2" rounded style="border-radius: 12px;">
              <v-row no-gutters align="center">
                <v-col cols="4">
                  <router-link :to="{ name: 'ProdDetail', params: { id: product.id } }">
                    <v-img :src="product.image" alt="Product Image" height="100" contain class="rounded"></v-img>
                  </router-link>
                </v-col>

                <v-col cols="8" class="pl-4 d-flex flex-column justify-space-between">
                  <div>
                    <div class="font-weight-medium text-truncate" :title="product.title" style="font-size: 1rem;">
                      {{ product.title }}
                    </div>
                    <div class="grey--text text--darken-1 mt-2" style="font-size: 0.95rem;">
                      ${{ product.price.toFixed(2) }}
                    </div>
                  </div>
                    <v-card-actions>
                  <v-btn small color="primary" class="mt-3 align-self-start" @click="addToCart(product)">
                    Add to Cart
                  </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

      </v-col>


    </v-row>
  </v-main>
</template>

<script>
import axios from 'axios';
import { useCartStore } from '../store/cart.js';

export default {
  name: 'BillingAndProducts',

  data() {
    return {
      couponCode: '',
      discount: 0,
      coupons: {
        SAVE10: 10,
        SAVE20: 20,
      },
      randomProducts: [],
    };
  },

  computed: {
    total() {
      const cart = useCartStore();
      return cart.total;
    },
    finalAmount() {
      return this.total - this.discount;
    },
  },

  methods: {
    async fetchRandomProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products?limit=10');
        this.randomProducts = response.data;
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    },
    applyCoupon() {
      const code = this.couponCode.trim().toUpperCase();
      const percent = this.coupons[code] || 0;
      this.discount = (this.total * percent) / 100;
    },
    addToCart(product) {
      if (product && product.id) {
        const cart = useCartStore();
        cart.addToCart(product);
        console.log('Added to cart:', product);
      } else {
        console.error('Invalid item, cannot add to cart');
      }
    },

  },

  mounted() {
    this.fetchRandomProducts();
  },
};
</script>
