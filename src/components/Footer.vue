

<script>
export default{
    name:"Footer"
}
</script>


<template>
  <v-footer
    color="#141414"
    app
  >
    <span class="white--text">Thank You For Visiting :)</span>
    <v-spacer></v-spacer>
    <div>
        <v-btn icon href="#" style="margin-right: 8px;">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon href="#">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon href="#" class="ml-5" >
              <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </div>
  </v-footer>
</template>
