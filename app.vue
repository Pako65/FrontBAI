<template>
  <div>
    <NavBar/>
    <NuxtPage></NuxtPage>
  </div>
</template>


<script setup lang="ts">
useHead({
  title: 'Boite à idées',
  meta: [
    { name: 'Boite à idées HUMAN', content: 'La boite à idées de Human immobilier' }
  ],
  bodyAttrs: {
    class: 'test'
  },
})
</script>