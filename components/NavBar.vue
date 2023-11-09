<template>
  <nav class="navbar">
    <div class="navigation">
      <NuxtLink to="/idea" class="navigation__home">
        <div class="navigation__logo">
          <img alt="Logo Boite a Idees" src="@/assets/images/logo.png" class="navigation__img" />
          <div class="navigation__title">
            <button class="navigation__button">
              <p class="navigation__bai">Boîte à Idées</p>
            </button>
            <h2 class="navigation__human">HUMAN</h2>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/idea/add" class="navigation__idea" v-if="showButton">
        <button class="navigation__add">
          <p class="navigation__p">Ajouter une idée</p>
          <img alt="navigation__logoAdd" src="@/assets/images/icon-ajouter.png" />
        </button>
      </NuxtLink>
      <NuxtLink to="/" class="navigation__idea" v-else>
        <button class="navigation__add">
          <p class="navigation__p">Liste des biens</p>
          <img alt="navigation__logoHome" src="@/assets/images/icon-liste.png" />
        </button>
      </NuxtLink>
    </div>
  </nav>
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