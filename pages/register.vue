<!-- <template>
    <h1>register</h1>
</template> -->

<template>
    <div class="login">
        <form @submit.prevent="signUp" class="login__form">
            <h1 class="login__title">INSCRIPTION</h1>
            <div class="login__email">
                <label for="email"></label>
                <input class="login__input" type="email" id="email" name="email" v-model="email" placeholder="E-mail"
                    required>
            </div>
            <div class="login__password">
                <label for="password"></label>
                <input class="login__input" type="password" id="password" name="password" v-model="password"
                    placeholder="Mot de passe" required>
            </div>
            <div class="login__password">
                <label for="confirmPassword"></label>
                <input class="login__input" type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
                    placeholder="Confirmation du mot de passe" required>
            </div>

            <div class="login__error" v-if="errorMsg">
                Le mot de passe doit correspondre.
            </div>
            <div  class="login__error" v-if="successMsg">
                {{ successMsg }}
            </div>

            <button class="login__sign" type="submit">Se connecter</button>
            <div class="login__notLogin">
                <p class="login__noTitle">Déjà un compte ?</p>
                <NuxtLink to="/login" class="login__noLogin">
                    <button class="login__noLogin-button">login</button>
                </NuxtLink>
            </div>
        </form>
    </div>
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

</script>

<style>
@import '@/assets/scss/login.scss';</style>