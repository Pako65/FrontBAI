<template>
    <h1>index</h1>

    <RouterLink to="/idea">
        <button style="height: 20px;">PAGE IDEA</button>
    </RouterLink>
    <RouterLink to="/idea/add">
        <button style="height: 20px;">PAGE add idea</button>
    </RouterLink>
</template>

<!-- <template>
    <div>
        <form @submit.prevent></form>
    </div>

    <div v-if="user">
        <p>Bonjour {{ user.email }}</p>
        <p>user id: {{ user.id }}</p>
    </div>
    <div v-else>
        <p>you are not logged in
            <RouterLink to="/login">login</RouterLink> or
            <RouterLink to="/register">register</RouterLink>
        </p>
    </div>

    <RouterLink to="/idea">
        <button style="height: 20px;">PAGE IDEA</button>
    </RouterLink>
    <RouterLink to="/idea/add">
        <button style="height: 20px;">PAGE add idea</button>
    </RouterLink>
    <RouterLink to="/login">
        <button style="height: 20px;">PAGE login</button>
    </RouterLink>
    <RouterLink to="/register">
        <button style="height: 20px;">PAGE register</button>
    </RouterLink>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['not-auth']
})

const user = useSupabaseUser()

</script> -->