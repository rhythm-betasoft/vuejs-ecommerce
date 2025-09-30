<template>
  <v-container class="d-flex align-center justify-center py-8">
    <v-card 
      outlined 
      class="pa-4 rounded-lg shadow-lg" 
      style="max-width: 500px; background-color: #ffffff; border-radius: 15px;">
      <InnerImageZoom 
        class="my-4" 
        :src="post.image" 
        :zoomSrc="post.image" 
        style="height: 400px; width: 100%; border-radius: 10px;" 
      />
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
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn 
          @click="$router.back()" 
          class="ma-2" 
          color="primary" 
          style="font-weight: bold; ">
          Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import InnerImageZoom from 'vue-inner-image-zoom';

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
        })
        .catch(err => {
          console.error('Error fetching product details:', err);
        });
    }
  }
};
</script>

<style>
/* Add custom styles if needed */
</style>
