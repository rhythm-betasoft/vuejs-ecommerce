<template>
  <v-main class="abc">
    <v-container class="d-flex justify-center align-center">
      <v-card
        style="max-width: 800px; background-color: #ffffff; display: flex; flex-direction: column; min-height: 400px;"
      >
        <v-img
          :src="'https://images.myparkingsign.com/img/lg/K/thank-you-for-visiting-signature-sign-k2-0716.png'"
          alt="Billing Image"
          width="100%"
          height="300px"
        ></v-img>

        <v-card-text class="text-center">
          <h1 style="margin: 20px;">Your Total Amount is: ${{ total.toFixed(2) }}</h1>

          <v-text-field
            v-model="couponCode"
            label="Enter Coupon Code"
            outlined
            class="mb-4"
          ></v-text-field>
          <v-btn color="primary" @click="applyCoupon">Apply Coupon</v-btn>

          <div v-if="discount > 0" class="mt-4">
            <h3>Discount Applied: -${{ discount.toFixed(2) }}</h3>
            <h2>Final Amount: ${{ finalAmount.toFixed(2) }}</h2>
          </div>

          <h4 style="margin: 20px;">Pay via:</h4>

          <v-container>
            <v-btn style="margin-bottom: 20px;" block>Cash On Delivery/UPI</v-btn>
            <v-btn color="success" style="margin-bottom: 20px;" block>Credit Card [upto 30% OFF!!]</v-btn>
            <v-btn style="margin-bottom: 20px;" block>Debit Card</v-btn>
            <v-btn color="success" style="margin-bottom: 20px;" block>Wallets/UPI [upto 15% OFF!!]</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { useCartStore } from '../store/cart.js';

export default {
  data() {
    return {
      couponCode: '',
      discount: 0,
      coupons: {
        SAVE10: 10,
        SAVE20: 20,
      }
    };
  },
  computed: {
    total() {
      const cart = useCartStore();
      return cart.total;
    },
    finalAmount() {
      return this.total - this.discount;
    }
  },
  methods: {
    applyCoupon() {
      const code = this.couponCode.trim().toUpperCase();
      const percent = this.coupons[code];

      if (percent) {
        this.discount = (this.total * percent) / 100;
      } else {
        this.discount = 0;
      }
    }
  }
};
</script>

<style scoped>
.abc {
  background-color: rgb(214, 231, 200);
  height: 100vh;    
  width: 100vw;
}
</style>
