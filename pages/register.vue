<template>
    <h1>register</h1>
</template>

<!-- <template>
    <form @submit.prevent="signUp">
        <h1>INSCRIPTION</h1>
        <div>
            <label for="email">EMAIL</label>
            <input type="email" id="email" name="email" v-model="email" placeholder="email" required>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password" placeholder="password" required>
        </div>
        <div>
            <label for="confirmPassword">Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
                placeholder="confirmPassword" required>
        </div>

        <div v-if="errorMsg">
            {{ errorMsg }}
        </div>
        <div v-if="successMsg">
            {{ successMsg }}
        </div>
        
        <button type="submit">Sign Up</button>
        <div>
            <p>déjà un compte ?</p> 
            <RouterLink to="/login">
                <button>login</button>
            </RouterLink>
        </div>
    </form>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

const client = useSupabaseClient();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');
const successMsg = ref('');

watchEffect(() => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match';
  } else {
    errorMsg.value = '';
  }
});

const signUp = async () => {
    if (password.value !== confirmPassword.value) {
        errorMsg.value = 'password do not match';
        return;
    }
    const { data, error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
    })
    if (error) {
        const { message } = error;
        errorMsg.value = message;
    } else {
        successMsg.value = 'you are registered! you can login'
    }
}

</script> -->