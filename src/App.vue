<template>
  <v-app >
  <Header/>
  <v-main>
<router-view></router-view>
  </v-main>
  <Footer/>
  </v-app>
</template>

<script>
import Header from './components/header.vue';
import Footer from './components/Footer.vue'

export default {
  name: 'Home', 
  components: {
    Header ,
    Footer
  }
};
</script>
