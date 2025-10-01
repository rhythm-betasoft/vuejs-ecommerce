<template  >
<v-main class="abc" >
  <v-container class="d-flex align-center justify-center py-8 mt-5 " >
    <v-card 
      outlined 
      class="pa-4 rounded-lg shadow-lg" 
      style="max-width: 1000px; background-color: #ffffff; border-radius: 15px; display: flex;">

      <v-row  class="d-flex">
        
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <InnerImageZoom 
            class="my-4" 
            :src="post.image" 
            :zoomSrc="post.image" 
            style="height: 400px; width: 100%; border-radius: 10px;" 
          />
        </v-col>

        <v-col cols="12" md="6" class="d-flex flex-column justify-center pl-4">
          <v-card-title 
            class="text-center headline font-weight-bold" 
            style="font-size: 1.5rem; color: #333;">
            {{ post.title }}
          </v-card-title>
          <v-card-subtitle class="text-center subheading" 
            style="font-size: 1.2rem; color: #f4a261; font-weight: bold;">
            MRP - ${{ post.price }}
          </v-card-subtitle>
          <v-card-text class="text-justify" style="font-size: 1rem; color: #555; line-height: 1.6;">
            {{ post.description }}
          </v-card-text>
          <v-card-actions class="d-flex justify-center mt-4"><v-btn style="font-weight: bold;"  @click="addToCart(item)">Add To Cart</v-btn></v-card-actions>

          <v-card-actions class="d-flex justify-center mt-4">
            <v-btn 
              @click="$router.back()" 
              class="ma-2" 
              color="primary" 
              style="font-weight: bold;">
              Back
            </v-btn>
          </v-card-actions>
        </v-col>

      </v-row>
      
    </v-card>
  </v-container>
  </v-main>
</template>

<script>
import InnerImageZoom from 'vue-inner-image-zoom';
import { useCartStore } from '../store/cart';
export default {
  components: {
    InnerImageZoom
  },
  data() {
    return {
      post: {}
    };
  },
  mounted() {
    const postId = this.$route.params.id;
    this.fetchProductDetails(postId);
  },
  methods: {
    fetchProductDetails(postId) {
      this.$api.get(`/products/${postId}`)
        .then(({ data }) => {
          this.post = data;
          console.log(this.post.rating.rate)
        })
        .catch(err => {
          console.error('Error fetching product details:', err);
        });
    },
     addToCart() {
    if (this.post && this.post.id) {
      const cart = useCartStore();
      cart.addToCart(this.post);
      console.log('Added to cart:', this.post);
    } else {
      console.error('Invalid item, cannot add to cart');
    }
  },
  }
};
</script>


<style scoped>
.abc{
  background-color: rgb(214, 231, 200);
  height: 100vh;
  widows: 100vw;
}
</style>