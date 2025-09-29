<template>
  <v-card class="mx-auto" width="400" elevation="4" style="margin-top: 100px;">
    <v-sheet class="pa-6">
      <h2 class="text-h6 mb-4 text-center">Login</h2>

      <v-form ref="form" @submit.prevent="submitForm">
       
        <v-text-field
          v-model="Email"
          :rules="[rules.required, rules.email]"
          label="Email"
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="Password"
          :rules="[rules.required, rules.password]"
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
export default {
  data() {
    return {
    
      Email: '',
      Password: '',
      rules: {
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
