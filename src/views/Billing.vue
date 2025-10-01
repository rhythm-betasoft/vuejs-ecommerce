<template>
  <h1>Billing Page</h1>

  <v-container class="d-flex justify-center align-center">
    <v-card style="max-width: 800px; background-color: #ffffff; display: flex; flex-direction: column; min-height: 400px;">
      <v-img 
        :src="'https://m.media-amazon.com/images/I/71YMhsThAML.jpg'" 

        alt="Billing Image"
        width="100%"
        height="300px" 
      >
      </v-img>

      <v-card-text class="text-center">
        <h1 style="margin: 20px;">Your Total Amount is: ${{ total.toFixed(2) }}</h1>
        <h4 style="margin: 20px;">Pay via:</h4>
        

        <v-container>
          <v-btn style="margin-bottom: 20px;" block>Cash On Delivery/Upi</v-btn>
          <v-btn color="success" style="margin-bottom: 20px;" block>Credit Card  [upto 30% OFF!!]</v-btn>
          <v-btn style="margin-bottom: 20px;" block>Debit Card</v-btn>
          <v-btn color="success" style="margin-bottom: 20px;" block>Wallet's/UPI  [upto 15% OFF!!]</v-btn>
        </v-container>
      </v-card-text>
      
    </v-card>
  </v-container>
</template>


<script>
import { useCartStore } from '../store/cart.js';

export default {
  computed: {
    total() {
      const cart = useCartStore();
      return cart.total;  
    }
  }
};
</script>
