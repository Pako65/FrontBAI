<!-- <template>
    <h1>index</h1>

    <NuxtLink to="/idea">
        <button style="height: 20px;">PAGE IDEA</button>
    </NuxtLink>
    <NuxtLink to="/idea/add">
        <button style="height: 20px;">PAGE add idea</button>
    </NuxtLink>
</template> -->

<template>
    <div>
        <form @submit.prevent></form>
    </div>

    <div v-if="user">
        <p>Bonjour {{ user.email }}</p>
        <p>user id: {{ user.id }}</p>
    </div>
    <div v-else>
        <p>you are not logged in
            <NuxtLink to="/login">login</NuxtLink> or
            <NuxtLink to="/register">register</NuxtLink>
        </p>
    </div>

    <NuxtLink to="/idea">
        <button style="height: 20px;">PAGE IDEA</button>
    </NuxtLink>
    <NuxtLink to="/idea/add">
        <button style="height: 20px;">PAGE add idea</button>
    </NuxtLink>
    <NuxtLink to="/login">
        <button style="height: 20px;">PAGE login</button>
    </NuxtLink>
    <NuxtLink to="/register">
        <button style="height: 20px;">PAGE register</button>
    </NuxtLink>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['not-auth']
})

const user = useSupabaseUser()

</script>