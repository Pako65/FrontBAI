<template>
  <nav class="navbar">
    <div class="navigation">
      <div class="navigation__logo">
        <img alt="Logo Boite a Idees" src="@/assets/images/logo.png" class="navigation__img" />
        <div class="navigation__title">
          <button class="navigation__button">
            <p class="navigation__bai">Boîte à Idées</p>
          </button>
          <h2 class="navigation__human">HUMAN</h2>
        </div>
      </div>
      <RouterLink to="/idea/add" class="navigation__idea">
        <button class="navigation__add" v-if="showButton">
          <p class="navigation__p">Ajouter une idée</p>
          <img alt="navigation__logoAdd" src="@/assets/images/icon-ajouter.png" />
        </button>
        <button class="navigation__add" v-else>
          <p class="navigation__p">Liste des idées</p>
          <img src="@/assets/images/icon-liste.png" alt="Liste">
        </button>
      </RouterLink>
    </div>
  </nav>
  <RouterLink to="/">
    <button>ICI</button>
  </RouterLink>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    showButton() {
      return this.$route.path === '/';
    }
  }
}
</script>

<style scoped>
@import '@/assets/scss/navbar.scss';
</style>