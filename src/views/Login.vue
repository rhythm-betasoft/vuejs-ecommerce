<template>
  <v-card class="mx-auto" width="400" elevation="4" style="margin-top: 100px;">
    <v-sheet class="pa-6">
      <h2 class="text-h6 mb-4 text-center">Login</h2>

      <v-form @submit.prevent="handle()">
        <v-text-field
          v-model="UserName"
          label="Username"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="UserEmail"
          label="UserEmail"
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="Password"
          label="Password"
          type="password"
          outlined
          dense
        ></v-text-field>

        <v-btn type="submit" block color="primary" class="mt-4">
          Submit
        </v-btn>
      </v-form>
    </v-sheet>
  </v-card>
</template>

<script>
import { authStore } from '../store/authStore'

export default {
  data() {
    return {
      UserName: '',
      UserEmail: '',
      Password: '',
    }
  },
  methods: {
    handle() {
      const store = authStore(); 
      store.handleLogin(this.UserName, this.UserEmail, this.Password);
      console.log("logged in")
    }
  }
}
</script>
