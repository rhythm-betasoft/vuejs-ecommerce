<template>
  <v-container>
    <v-row>
      <v-col v-for="item in arr" :key="item.id" cols="12" sm="6" md="3">
        <v-card height="370px" elevation="4" style="max-width: 400px;">
          <router-link :to="{ name: 'ProdDetail', params: { id: item.id } }">
            <v-img class="my-1" :src="item.image" height="200px"></v-img>
          </router-link>

          <v-card-title class="text-h6 font-weight-bold">{{ item.title }}</v-card-title>
          <v-card-text class="text-center" style="font-weight: bold; font-size: 14px;">
            <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 10px;">
              <span>MRP: ${{ item.price }}</span>
              <span>Rated: {{ item.rating.rate }} By {{ item.rating.count }} users</span>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <div class="d-flex justify-center align-center mb-5" style="padding-top: 10px;">
            <v-card-actions>
              <v-btn color="blue" @click="addToCart(item)" style="margin-right: 20px;">Add To Cart</v-btn>
              <v-btn style="background-color: #d45f86; color: white; margin-left: 10px; margin-bottom: 5px;" @click="addToFav(item)">
                Add to Favourite
              </v-btn>
            </v-card-actions>   
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from '../store/cart';
import { favStore } from '../store/fav';

export default {
  data() {
    return {
      arr: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.get('/products').then((res) => {
        this.arr = res.data;
        console.log(this.arr)
      });
    },
    addToCart(item) {
      const cart = useCartStore();
      cart.addToCart(item);
      console.log('Added to cart:', item);
    },
    addToFav(item) {
      const fav = favStore(); 
      fav.addToFav(item);
      console.log('Added to favourite:', item);
    },
    view(id) {
      this.$router.push({ name: 'ProdDetail', params: { id } });
    }
  }
};
</script>
