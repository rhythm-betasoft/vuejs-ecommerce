<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>

      <v-col cols="12" md="8" class="d-flex align-center justify-center"
        style="background-color: #f5f5f5; background-size: cover; background-repeat: no-repeat;">
        <v-container max-height="74vh" max-width="100%" flat style="padding: 0;">
          <v-img src="https://www.cultureville.co.uk/cdn/shop/collections/IMG_1304.jpg?v=1691194840&width=750"
            height="100%" width="100%" contain></v-img>
        </v-container>
      </v-col>


      <v-col cols="12" md="4" class="d-flex align-center justify-center">
        <div class="px-6" style="width: 100%; margin-top: 10%; max-width: 500px;">
          <h1 class="text-h4 font-weight-bold mb-2 ">Hello! Welcome Back</h1>
          <p class="text-body-2 mb-6" style="color: #a3a3a3; margin-top: 20px;">
            Log in now to explore all the features and benefits of our platform and see what’s new.
          </p>

          <v-form @submit.prevent="handle">
            <div class="d-flex flex-column" style="gap: 16px;">
              <p class="font-size">UserName</p>
              <v-text-field clearable v-model="UserName" label="Username" prepend-inner-icon="mdi-account"
                variant="solo-filled"></v-text-field>
               <p class="font-size">Password</p>
              <v-text-field clearable v-model="Password" label="Password" type="password" prepend-inner-icon="mdi-lock"
                variant="solo-filled"></v-text-field>

            </div>




            <div class="d-flex justify-space-between align-center mt-2" style="width: 100%; align-items: center;">
              <v-checkbox v-model="rememberMe" label="Remember Me" color="primary"
                style="margin: 0; padding: 0; height: auto; display: flex; align-items: center;"></v-checkbox>

              <p
                style="color: #3b82f6; font-size: 12px; margin: 0 0 0 10px; line-height: 1.5; display: flex; align-items: center;">
                Forgot Password?</p>
            </div>

            <v-container class="d-flex justify-center align-center">
              <v-btn type="submit" color="primary" class="text-white" style="width: 900px;height: 50px;">
                Login
              </v-btn>
            </v-container>


            <div class="text-center mt-4">
              <p style="color: #a3a3a3; font-size: 12px;">or</p>
              <div class="d-flex justify-center gap-3">
                <v-btn icon>
                  <v-icon>mdi-google</v-icon>
                </v-btn>

                <v-btn icon class="mx-4">
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-apple</v-icon>
                </v-btn>
              </div>

            </div>

            <div class="d-flex align-center justify-center" style="font-size: 14px;">

              <v-card-actions>
                <v-btn text style="color: #3b82f6;"> Don't have an account?</v-btn>
              </v-card-actions>
            </div>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authStore } from '../store/authStore'

export default {
  data() {
    return {
      UserName: '',
      Password: '',
    }
  },
  methods: {
    handle() {
      const store = authStore();
      store.handleLogin(this.UserName, this.Password);
      console.log("logged in")
    }
  }
}
</script>
