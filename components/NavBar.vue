<template>
    
    <nav class="navbar">
    <!-- <RouterLink to="/add-idea">Nouvelle Page</RouterLink> -->
    <div class="logo">
      <img alt="Logo Boite a Idees" src="@/assets/images/logo.png" class="logo__img"/>
      <div class="logo__title">
        <button class="logo__button">
          <p>Boîte à Idées</p>
        </button>
        <h2 class="logo__title-h2">HUMAN</h2>
        <!-- <img alt="Vague" src="@/assets/images/separation-v2.svg" class="logo_wave" /> -->
      </div>
    </div>
    <div class="button">
      <RouterLink to="/idea/add">
        <button class="button__add">
          <p class="button__p">Ajouter une idée</p>
          <img alt="icone-ajouter" src="@/assets/images/icon-ajouter.png" />
        </button>
      </RouterLink>
    </div>
  </nav>

    <RouterLink to="/">
        <button>ICI</button>
    </RouterLink>
</template>

<script>

</script>

<style scoped>
@import '@/assets/scss/navbar.scss';
</style>