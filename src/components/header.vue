<template>
    <v-app-bar color="black" text="white">
        <v-btn :to="{ path: '/' }">
            <v-app-bar-title>Shopify</v-app-bar-title>
        </v-btn>
        <v-spacer style="height: 50px;"></v-spacer>
        <v-btn :to="{ path: '/' }">
            <v-icon left>mdi-home</v-icon>
            Home
        </v-btn>
        <v-btn style="margin-right: 550px;">
            <v-icon left>mdi-package-variant</v-icon>
            Products
        </v-btn>

        <v-btn :to="{ path: '/Favourites' }">
            <v-icon left style="margin-right: 5px; color:#ee0e59">mdi-heart</v-icon>
            Favourites
        </v-btn>

        <v-btn :to="{ path: '/cart' }">
            <v-icon left>mdi-cart</v-icon>
            Cart
        </v-btn>

        <v-btn>
            <v-icon left>mdi-account</v-icon>
            User
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
                </v-list>
            </v-menu>
        </v-btn>


    </v-app-bar>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {};
    }
};
</script>
