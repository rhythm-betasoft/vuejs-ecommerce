import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import router from "../routes/router";
import axios from "axios";

export const authStore = defineStore('auth', {
  state: () => ({
    email: '',
    password: '',
    refreshToken: '',
    firstName: '',
    user: null,
    token: '',
    loggedin: false,
  }),
  actions: {
    async handleLogin(username,email, password) {
      try {
        console.log("Attempting login with:", username, password);

        const response = await axios.post(
          'https://dummyjson.com/auth/login',
          { username, password, email }
        );

        const { token, refreshToken, ...userData } = response.data; 

        this.token = token;
        this.refreshToken = refreshToken;
        this.user = userData;
        this.loggedin = true;

        toast.success("Login Successful");
        router.push({ name: 'Cart' });
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      }
    },

    handleLogout() {
      this.token = '';
      this.refreshToken = '';
      this.user = null;
      this.loggedin = false;
      toast.info("Logged out successfully");
      router.push({ name: 'Login' });
    }
  },
  persist: true
});
