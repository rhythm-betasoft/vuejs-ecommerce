<template>
  <v-container>
    <h2>Your Favorites</h2>

    <div v-if="favorites.length === 0" class="text-center my-5">
      <p>No favorite items yet.</p>
    </div>

    <v-row v-else>
      <v-col v-for="item in favorites" :key="item.id" cols="12" sm="6" md="3">
        <v-card max-width="400px" elevation="4" height="355px">
          <router-link :to="{ name: 'ProdDetail', params: { id: item.id } }">
            <v-img :src="item.image" height="200px" class="my-1"></v-img>
          </router-link>

          <v-card-title class="text-h6 font-weight-bold">{{ item.title }}</v-card-title>

          <v-card-text class="text-center" style="font-weight: bold; font-size: 14px;">
            <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 10px;">
              <span>Price: ${{ item.price }}</span>
              <span>Rated: {{ item.rating.rate }} by {{ item.rating.count }} users</span>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-center" style="padding-top: 10px;">
            <v-btn color="red" @click="removeFromFav(item.id)">Remove from Favorites</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { favStore } from '../store/fav';

export default {
  data() {
    const store = favStore(); 
    return {

      favorites: store.arr
    };
  },
  methods: {
    removeFromFav(id) {
      const store = favStore();
      store.remove(id); 
    }
  }
};
</script>
