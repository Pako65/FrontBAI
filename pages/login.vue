
<!-- <template>
  <h1>LOGIN</h1>
</template> -->
<template>
  <div class="login">
    <form @submit.prevent="signIn" class="login__form">
      <h1 class="login__title">LOGIN</h1>
      <div class="login__email">
        <label for="email"></label>
        <input class="login__input" type="email" id="email" name="email" v-model="email" placeholder="email">
      </div>
      <div class="login__password">
        <label for="password"></label>
        <input class="login__input" type="password" id="password" name="password" v-model="password"
          placeholder="password">
      </div>
      <div v-if="errorMsg">{{ errorMsg }}</div>
      <button class="login__sign" type="submit">Se connecter</button>
      <div class="login__notLogin">
        <p class="login__noTitle">Pas de compte ?</p>
        <NuxtLink to="/register" class="login__noLogin">
          <button class="login__noLogin-button">Se connecter</button>
        </NuxtLink>
      </div>
    </form>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
const user = useSupabaseUser();
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
    const jwt = client.realtime.accessToken;
    console.log(jwt)
    localStorage.setItem('userEmail', email.value)

    if (jwt !== null) {
      localStorage.setItem('jwt', jwt)
    } else {
      console.error('Le jeton d\'accès est nul.');
    }
    router.push('/')
  }
}
</script>

<style>
@import '@/assets/scss/login.scss';
</style>