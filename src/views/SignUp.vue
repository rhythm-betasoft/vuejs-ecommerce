<template>
  <v-card class="mx-auto" width="400" elevation="4" style="margin-top: 100px;">
    <v-sheet class="pa-6">
      <h2 class="text-h6 mb-4 text-center">Register</h2>

      <v-form ref="form" @submit.prevent="submitForm">
        <v-text-field v-model="FirstName" :rules="[rules.required]" label="First Name" outlined dense></v-text-field>

        <v-text-field v-model="LastName" :rules="[rules.required]" label="Last Name" outlined dense></v-text-field>

        <v-text-field v-model="Email" :rules="[rules.required, rules.email]" label="Email" outlined dense></v-text-field>

        <v-text-field v-model="Password" :rules="[rules.required, rules.password]" label="Password" type="password"
          outlined dense></v-text-field>

        <v-btn type="submit" block color="primary" class="mt-4">
          Submit
        </v-btn>
      </v-form>
      <router-link to="/Login" class="mt-5" style="display: block; text-align: center; color: #1976d2; cursor: pointer;">
        Already a User? Login
      </router-link>


    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      rules: {
        required: v => !!v || 'This field is required',
        email: v => /.+@.+\..+/.test(v) || 'Email must be valid',
        password: v => (v && v.length >= 6) || 'Minimum 6 characters',
      },
    }
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        alert('Form is valid! Submit logic goes here.')
      }
    }
  }
}
</script>
