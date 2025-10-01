<template>
    <v-carousel hide-delimiters class="d-none d-md-block">
        <v-carousel-item src="https://t4.ftcdn.net/jpg/04/65/34/25/360_F_465342506_uR75p5QbO1CaV3wBCZnXRt6AE3ay2llS.jpg"
            cover></v-carousel-item>
        <v-carousel-item src="https://couponswala.com/blog/wp-content/uploads/2022/08/amazon-diwali-sale.png"
            cover></v-carousel-item>

        <v-carousel-item
            src="https://static.vecteezy.com/system/resources/previews/029/238/231/non_2x/happy-diwali-big-sale-promotion-poster-or-banner-design-template-diwali-is-the-festival-of-lights-illustration-vector.jpg"
            cover></v-carousel-item>
    </v-carousel>
    <v-container style="margin-top: 20px;">
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
                            <v-btn icon :style="{ color: item.isFavorited ? 'red' : 'black' }" @click="addToFav(item)">
                                <v-icon>{{ item.isFavorited ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
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
            const fav = favStore();
            this.$api.get('/products').then((res) => {
                res.data.forEach(item => {
                    item.isFavorited = !!fav.arr.find(f => f.id === item.id);
                });
                this.arr = res.data;
                console.log(this.arr)
            });
        }
        ,
        addToCart(item) {
            const cart = useCartStore();
            cart.addToCart(item);
            console.log('Added to cart:', item);
        },
        addToFav(item) {
            const fav = favStore();
            item.isFavorited ? fav.remove(item.id) : fav.addToFav(item);
            item.isFavorited = !item.isFavorited;
        }
        ,
        view(id) {
            this.$router.push({ name: 'ProdDetail', params: { id } });
        }
    }
};
</script>
