<template>
  <nav class="navbar">
    <!-- <RouterLink to="/add-idea">Nouvelle Page</RouterLink> -->
    <div class="navigation">
      <img alt="Logo Boite a Idees" src="@/assets/images/logo.png" class="navigation__img" />
      <div class="navigation__title">
        <button class="navigation__bai">
          <p>Boîte à Idées</p>
        </button>
        <h2 class="navigation__title-h2">HUMAN</h2>
        <!-- <img alt="Vague" src="@/assets/images/separation-v2.svg" class="navigation_wave" /> -->
      </div>
      <RouterLink to="/idea/add" class="navigation__button">
        <button class="navigation__add">
          <p class="navigation__p">Ajouter une idée</p>
          <img alt="icone-ajouter" src="@/assets/images/icon-ajouter.png" />
        </button>
      </RouterLink>
    </div>
  </nav>

  <section>
    <div class="titreBody">
      <h1 class="titreBody__titre">Liste des idées</h1>
      <button class="titreBody__button">
        <p>Trier</p>
        <img src="@/assets/images/icon-trier.png" alt="bouton trier">
      </button>
    </div>
  </section>

  <RouterLink to="/">
    <button>ICI</button>
  </RouterLink>
</template>

<script>

</script>

<style scoped>
@import '@/assets/scss/navbar.scss';
</style>