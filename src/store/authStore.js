import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import router from "../routes/router";
import axios from "axios";
import Toastify from 'toastify-js';
 
export const authStore = defineStore('auth', {
  state: () => ({
    refreshToken: '',
    firstName: '',
    user: null,
    token: '',
    loggedin: false,
  }),
  actions: {
    // Regular login
    async handleLogin(username, password) {
      try {
        const response = await axios.post(
          'https://dummyjson.com/auth/login',
          { username, password }
        );
       
        const { token, refreshToken, ...userData } = response.data;
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = userData;
        this.loggedin = true;
 
        Toastify({
          text: 'Login Successful',
          duration: 2000,
          close: true,
          gravity: 'top',
          position: 'right',
          style: { background: '#4caf50' }
        }).showToast();
 
        router.push({ name: 'Cart' });
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      }
    },
 
 
    handleGoogleLogin(profile) {
      try {
        const googleToken = profile.getAuthResponse().id_token;
 
        this.token = googleToken;
        this.user = {
          firstName: profile.getGivenName(),
          email: profile.getEmail(),
        };
        this.loggedin = true;
 
        Toastify({
          text: 'Google Login Successful',
          duration: 2000,
          close: true,
          gravity: 'top',
          position: 'right',
          style: { background: '#4caf50' }
        }).showToast();
 
        router.push({ name: 'Cart' });
      } catch (error) {
        console.error("Google Login error:", error);
        toast.error("Google login failed. Please try again.");
      }
    },
 
    handleLogout() {
      this.token = '';
      this.refreshToken = '';
      this.user = null;
      this.loggedin = false;
 
      Toastify({
        text: 'User Logged Out',
        duration: 2000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: { background: '#4caf50' }
      }).showToast();
 
      router.push({ name: 'Login' });
    }
  },
  persist: true
});