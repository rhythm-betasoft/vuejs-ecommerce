<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" md="9" class="d-flex align-center justify-center d-none"
        style="background-color: #f5f5f5; background-size: cover; background-repeat: no-repeat;">
        <v-img src="https://www.cultureville.co.uk/cdn/shop/collections/IMG_1304.jpg?v=1691194840&width=750"
          height="86.50vh" width="100%" cover></v-img>
      </v-col>
 
      <v-col cols="12" md="3" class="d-flex align-center justify-center">
        <v-card flat class="pa-8 login-card" width="380">
          <div class="text-center mb-6">
            <div class="d-flex align-center justify-center mb-2">
              <v-avatar color="deep-orange lighten-5" class="mr-2">
              </v-avatar>
              <span class="font-weight-medium text-subtitle-1 black--text">Shopify</span>
            </div>
            <h1 class="font-weight-bold mb-1 black--text">Welcome Back</h1>
            <p class="caption grey--text">Please login to your account</p>
          </div>
 
          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="username" label="Username" outlined dense hide-details class="mb-4 "></v-text-field>
 
            <v-text-field v-model="password" label="Password" type="password" outlined dense hide-details
              class="mb-2 "></v-text-field>
 
            <div class="text-right mb-4">
              <a href="#" class="deep-orange--text text-decoration-none text-caption">Forgot Password?</a>
            </div>
 
            <v-btn color="deep-orange accent-4" large block dark class="rounded-lg mb-6 text-capitalize" type="submit">
              Login
            </v-btn>
 
            <div class="divider my-6 d-flex align-center justify-center">
              <div class="divider-line"></div>
              <span class="mx-2 grey--text text-body-2">Or login with</span>
              <div class="divider-line"></div>
            </div>
 
            <v-row dense>
              <v-col cols="6">
                <!-- Google Button to trigger login -->
                <v-btn outlined block class="text-capitalize rounded-lg grey--text" @click="googleLogin">
                  <v-icon left color="red">mdi-google</v-icon>
                  Google
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn outlined block class="text-capitalize rounded-lg grey--text">
                  <v-icon left color="blue darken-3">mdi-facebook</v-icon>
                  Facebook
                </v-btn>
              </v-col>
            </v-row>
 
            <div class="text-center mt-6 grey--text text-caption">
              Don’t have an account?
              <a href="#" class="deep-orange--text text-decoration-none">Signup</a>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import { authStore } from "../store/authStore";
 
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      const store = authStore();
      store.handleLogin(this.username, this.password);
      console.log("logged in");
    },
    googleLogin() {
      const store = authStore();
 
      const auth2 = window.gapi.auth2.getAuthInstance();
     
      auth2.signIn().then(googleUser => {
        const profile = googleUser.getBasicProfile();
        console.log('Google user:', profile);
 
        store.handleGoogleLogin(profile);
      }).catch(error => {
        console.error("Google Login failed: ", error);
        alert('Google login failed. Please try again.');
      });
    },
  },
  mounted() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '438311656417-5epijjk9p5qj43fi5hc6tcnc1kvec6q9.apps.googleusercontent.com',
      }).then(() => {
        console.log('Google API Initialized');
      }).catch(error => {
        console.error('Error initializing Google API', error);
      });
    });
  }
};
</script>