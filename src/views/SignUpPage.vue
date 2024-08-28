<template>
  <ion-content>
    <ion-item>
      <ion-input v-model="email" placeholder="Email"></ion-input>
    </ion-item>
    <ion-item>
      <ion-input type="password" v-model="password" placeholder="Password"></ion-input>
    </ion-item>
    <ion-item>
      <ion-select v-model="role" placeholder="Select a role" @ionChange="onRoleChange">
        <ion-select-option value="adm">Admin</ion-select-option>
        <ion-select-option value="teacher">Teacher</ion-select-option>
        <ion-select-option value="aluno">Aluno</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-button @click="signUp">Sign Up</ion-button>
  </ion-content>
</template>

<script>
import { supabase } from '../supabaseClient'

export default {
  data() {
    return {
      email: '',
      password: '',
      role: '', // Store the user role selected
      validRoles: ['adm', 'teacher', 'student'] // Define as roles válidas
    }
  },
  methods: {
    onRoleChange(event) {
      this.role = event.detail.value;
    },
    async signUp() {
      if (!this.role || !this.validRoles.includes(this.role)) {
        console.error('Role is required and must be one of: ' + this.validRoles.join(', '));
        return;
      }

      // Sign up the user and receive their user ID
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            role: this.role // Include the role in user_metadata
          }
        }
      });

      if (error) {
        console.error('Error creating user:', error.message);
      } else {
        console.log('User created successfully!', data);
        console.log('Role selected:', this.role);
      }
    },
  }
}
</script>
