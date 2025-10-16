<template>
    <v-app-bar color="black" text="white">
        <v-btn :to="{ path: '/' }">
            <v-app-bar-title>Shopify</v-app-bar-title>
        </v-btn>

        <!-- <div class="d-flex align-center" style="margin-left: 20px; max-width: 300px;min-width: 200px" margin="20px">
            <v-text-field label="Search Here"></v-text-field>
        </div> -->


        <v-spacer style="height: 5px;"></v-spacer>

        <v-btn :to="{ path: '/Favourites' }">
            <v-icon left style="margin-right: 5px; color:#f1467f">mdi-heart</v-icon>
            Favourites
        </v-btn>

        <v-btn :to="{ path: '/cart' }">
            <v-icon left>mdi-cart</v-icon>
            Cart
        </v-btn>

        <v-btn>
            <v-icon left>mdi-account</v-icon>
            <!-- User -->
            <v-menu activator="parent">
                <v-list>

                    <v-list-item link :to="{ path: '/SignUp' }">
                        <v-list-item-title>
                            Sign Up
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item link :to="{ path: '/Login' }">
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="logout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>

                     <v-list-item :to="{path:'/Orders'}">
                        <v-list-item-title>My Orders</v-list-item-title>
                    </v-list-item>


                </v-list>
            </v-menu>
        </v-btn>


    </v-app-bar>
</template>

<script>
import { authStore } from '../store/authStore';
export default {
    name: "Header",
    data() {
        return {};
    },
    methods: {
        logout() {
            const auth = authStore();
            auth.handleLogout();
            console.log("logged out")
        }
    }
};
</script>

