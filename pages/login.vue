<template>
  <div>
    <form @submit.prevent="signIn">
      <h1>LOGIN</h1>
      <div>
        <label for="email">EMAIL</label>
        <input type="email" id="email" name="email" v-model="email" placeholder="email">
      </div>
      <div>
        <label for="password">PASSWORD</label>
        <input type="password" id="password" name="password" v-model="password" placeholder="password">
      </div>
      <div v-if="errorMsg">{{ errorMsg }}</div>
      <button type="submit">Sign In</button>
    </form>

    <div>
      <p>déjà un compte ?</p>
      <RouterLink to="/register">
        <button>login</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
const client = useSupabaseClient();
const router = useRouter();

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const signIn = async () => {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    errorMsg.value;
  } else {
    router.push('/idea')
  }
}
</script>