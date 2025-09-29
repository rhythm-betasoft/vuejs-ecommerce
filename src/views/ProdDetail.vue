<template>
  <v-container class="d-flex align-center justify-center">
    <v-card outlined style="max-width: 500px; margin-top: 25px; background-color:#9abbdb">
      <InnerImageZoom 
        class="my-1" 
        :src="post.image" 
        :zoomSrc="post.image" 
        style="height: 400px; width: 100%;" 
      />
      <v-card-title class="text-center">{{ post.title }}</v-card-title>
      <v-card-title class="text-center">MRP- ${{ post.price }}</v-card-title>
      <v-card-text>{{ post.description }}</v-card-text>
      <v-card-actions>
        <v-btn @click="$router.back()" class="mb-4 ml-auto">Back</v-btn>
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
